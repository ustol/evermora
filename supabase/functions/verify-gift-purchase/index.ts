// Called by the client immediately after Paystack's popup reports success.
// Trusts nothing from that report — independently re-verifies with Paystack
// using the secret key before marking anything paid. verify_jwt defaults to
// true for this function (see supabase/config.toml), so only a signed-in
// Evermora user can reach this code at all.
//
// Deliberately self-contained (no shared/imported module with
// paystack-webhook) — the Supabase Dashboard's browser-based function
// editor isn't confirmed to support cross-function relative imports, and
// this project may be deployed that way rather than via the CLI.
import { createClient } from "npm:@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type, apikey",
}

interface PaystackVerifyResult {
  status: string
  amountMinorUnits: number
  currency: string
}

async function verifyPaystackTransaction(
  reference: string,
  secretKey: string
): Promise<PaystackVerifyResult> {
  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    { headers: { Authorization: `Bearer ${secretKey}` } }
  )

  const body = await response.json()
  if (!response.ok || !body?.status) {
    throw new Error(body?.message ?? `Paystack verify failed (${response.status})`)
  }

  return {
    status: body.data.status as string,
    amountMinorUnits: body.data.amount as number,
    currency: body.data.currency as string,
  }
}

function getClerkSubFromRequest(req: Request): string | null {
  const auth = req.headers.get("Authorization")
  if (!auth?.startsWith("Bearer ")) return null

  const token = auth.slice("Bearer ".length)
  const payloadSegment = token.split(".")[1]
  if (!payloadSegment) return null

  try {
    const base64 = payloadSegment.replace(/-/g, "+").replace(/_/g, "/")
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=")
    const claims = JSON.parse(atob(padded))
    return typeof claims.sub === "string" ? claims.sub : null
  } catch {
    return null
  }
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders })
  }

  try {
    const { purchaseId } = await req.json()
    if (!purchaseId || typeof purchaseId !== "string") {
      return json({ error: "purchaseId is required" }, 400)
    }

    const clerkSub = getClerkSubFromRequest(req)
    if (!clerkSub) {
      return json({ error: "Not signed in" }, 401)
    }

    const secretKey = Deno.env.get("PAYSTACK_SECRET_KEY")
    if (!secretKey) throw new Error("PAYSTACK_SECRET_KEY is not configured")

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    const { data: purchase, error } = await supabaseAdmin
      .from("gift_purchases")
      .select("id, paystack_reference, amount, currency, status, profiles!inner(clerk_user_id)")
      .eq("id", purchaseId)
      .maybeSingle()

    if (error) throw error
    if (!purchase) {
      return json({ error: "Purchase not found" }, 404)
    }

    const ownerClerkId = (purchase as { profiles?: { clerk_user_id?: string } })
      .profiles?.clerk_user_id
    if (ownerClerkId !== clerkSub) {
      return json({ error: "Not your purchase" }, 403)
    }

    if (purchase.status === "paid") {
      return json({ ok: true, reason: "already_paid" }, 200)
    }

    const verified = await verifyPaystackTransaction(purchase.paystack_reference, secretKey)
    const expectedAmountMinorUnits = Math.round(Number(purchase.amount) * 100)
    const isGenuinelyPaid =
      verified.status === "success" &&
      verified.amountMinorUnits === expectedAmountMinorUnits &&
      verified.currency === purchase.currency

    if (isGenuinelyPaid) {
      const { error: updateError } = await supabaseAdmin
        .from("gift_purchases")
        .update({ status: "paid", paid_at: new Date().toISOString() })
        .eq("id", purchase.id)
      if (updateError) throw updateError
      return json({ ok: true }, 200)
    }

    if (verified.status === "failed" || verified.status === "abandoned") {
      await supabaseAdmin
        .from("gift_purchases")
        .update({ status: "failed" })
        .eq("id", purchase.id)
    }

    return json({ ok: false, reason: "verification_mismatch" }, 422)
  } catch (err) {
    console.error("[verify-gift-purchase]", err)
    return json({ error: "Internal error" }, 500)
  }
})
