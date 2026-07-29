// Called by the client immediately after Paystack's popup reports success.
// Trusts nothing from that report — independently re-verifies with Paystack
// using the secret key before marking anything paid.
import { createAdminClient } from "@/lib/supabase-admin"
import type { NextRequest } from "next/server"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, content-type, apikey, x-client-info, x-supabase-api-version",
}

interface PaystackVerifyResult {
  status: string
  amountMinorUnits: number
  currency: string
}

async function verifyPaystackTransaction(
  reference: string,
  secretKey: string
): Promise<PaystackVerifyResult | null> {
  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    { headers: { Authorization: `Bearer ${secretKey}` } }
  )

  if (response.status === 404) {
    return null
  }

  const body = await response.json()

  if (body?.message === "Transaction reference not found") {
    return null
  }

  if (!response.ok || !body?.status) {
    throw new Error(body?.message ?? `Paystack verify failed (${response.status})`)
  }

  return {
    status: body.data.status as string,
    amountMinorUnits: body.data.amount as number,
    currency: body.data.currency as string,
  }
}

function getClerkSubFromRequest(req: NextRequest): string | null {
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { purchaseId } = body
    if (!purchaseId || typeof purchaseId !== "string") {
      return Response.json({ error: "purchaseId is required" }, { status: 400 })
    }

    const clerkSub = getClerkSubFromRequest(req)

    const secretKey = process.env.PAYSTACK_SECRET_KEY
    if (!secretKey) throw new Error("PAYSTACK_SECRET_KEY is not configured")

    const supabaseAdmin = createAdminClient()

    const { data: purchase, error } = await supabaseAdmin
      .from("gift_purchases")
      .select(
        "id, paystack_reference, amount, currency, status, purchaser_profile_id, profiles(clerk_user_id)"
      )
      .eq("id", purchaseId)
      .maybeSingle()

    if (error) throw error
    if (!purchase) {
      return Response.json({ error: "Purchase not found" }, { status: 404, headers: corsHeaders })
    }

    if (purchase.purchaser_profile_id) {
      const ownerClerkId = (purchase as { profiles?: { clerk_user_id?: string } })
        .profiles?.clerk_user_id
      const isOwner = !!clerkSub && ownerClerkId === clerkSub

      let isAdmin = false
      if (!isOwner && clerkSub) {
        const { data: callerProfile } = await supabaseAdmin
          .from("profiles")
          .select("role")
          .eq("clerk_user_id", clerkSub)
          .maybeSingle()
        isAdmin = callerProfile?.role === "admin"
      }

      if (!isOwner && !isAdmin) {
        return Response.json({ error: "Not your purchase" }, { status: 403, headers: corsHeaders })
      }
    }

    if (purchase.status === "paid") {
      return Response.json({ ok: true, reason: "already_paid" }, { status: 200, headers: corsHeaders })
    }

    const verified = await verifyPaystackTransaction(purchase.paystack_reference, secretKey)

    if (!verified) {
      await supabaseAdmin
        .from("gift_purchases")
        .update({ status: "pending" })
        .eq("id", purchase.id)
      return Response.json({ ok: false, reason: "pending" }, { status: 200, headers: corsHeaders })
    }

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
      return Response.json({ ok: true }, { status: 200, headers: corsHeaders })
    }

    if (verified.status === "failed" || verified.status === "abandoned") {
      await supabaseAdmin
        .from("gift_purchases")
        .update({ status: "failed" })
        .eq("id", purchase.id)
    }

    return Response.json({ ok: false, reason: "verification_mismatch" }, { status: 422, headers: corsHeaders })
  } catch (err) {
    console.error("[verify-gift-purchase]", err)
    return Response.json({ error: "Internal error" }, { status: 500, headers: corsHeaders })
  }
}

export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders })
}
