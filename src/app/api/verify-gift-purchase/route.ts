import { createAdminClient } from "@/lib/supabase-admin"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { resolveProfileForUser } from "@/lib/profile-resolver"
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

function getSupabaseUserFromToken(supabase: ReturnType<typeof createAdminClient>, req: NextRequest) {
  const auth = req.headers.get("Authorization")
  if (!auth?.startsWith("Bearer ")) return Promise.resolve(null)
  const token = auth.slice("Bearer ".length)
  return supabase.auth.getUser(token).then(({ data }) => data.user ?? null).catch(() => null)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { purchaseId } = body
    if (!purchaseId || typeof purchaseId !== "string") {
      return Response.json({ error: "purchaseId is required" }, { status: 400 })
    }

    const supabaseAdmin = createAdminClient()
    const scopedSupabase = await createServerSupabaseClient()
    const { data: { user: cookieUser } } = await scopedSupabase.auth.getUser()
    const tokenUser = await getSupabaseUserFromToken(supabaseAdmin, req)
    const authUser = tokenUser ?? cookieUser

    const secretKey = process.env.PAYSTACK_SECRET_KEY
    if (!secretKey) throw new Error("PAYSTACK_SECRET_KEY is not configured")

    const { data: purchase, error } = await supabaseAdmin
      .from("gift_purchases")
      .select("id, paystack_reference, amount, currency, status, purchaser_profile_id")
      .eq("id", purchaseId)
      .maybeSingle()

    if (error) throw error
    if (!purchase) {
      return Response.json({ error: "Purchase not found" }, { status: 404, headers: corsHeaders })
    }

    if (purchase.purchaser_profile_id) {
      let isOwner = false
      const callerProfile = authUser
        ? await resolveProfileForUser(supabaseAdmin, authUser)
        : null
      isOwner = callerProfile?.id === purchase.purchaser_profile_id

      const isAdmin = callerProfile?.role === "admin"

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
