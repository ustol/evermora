// Public endpoint — Paystack calls this directly, with no app auth
// session. The x-paystack-signature check below is the only authentication.
// This is the reliability backstop for verify-gift-purchase: if a buyer
// closes the tab right after paying, this is what still records the sale.
import { createAdminClient } from "@/lib/supabase-admin"
import type { NextRequest } from "next/server"

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

async function verifyWebhookSignature(
  rawBody: string,
  signatureHeader: string,
  secretKey: string
): Promise<boolean> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secretKey),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"]
  )
  const digest = await crypto.subtle.sign("HMAC", key, enc.encode(rawBody))
  const computedHex = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")

  if (computedHex.length !== signatureHeader.length) return false
  let diff = 0
  for (let i = 0; i < computedHex.length; i++) {
    diff |= computedHex.charCodeAt(i) ^ signatureHeader.charCodeAt(i)
  }
  return diff === 0
}

/** Idempotent — safe if verify-gift-purchase already marked this paid. */
async function finalizeGiftPurchaseByReference(
  supabaseAdmin: ReturnType<typeof createAdminClient>,
  reference: string,
  secretKey: string
): Promise<void> {
  const { data: purchase, error } = await supabaseAdmin
    .from("gift_purchases")
    .select("id, amount, currency, status")
    .eq("paystack_reference", reference)
    .maybeSingle()

  if (error) throw error
  if (!purchase || purchase.status === "paid") return

  const verified = await verifyPaystackTransaction(reference, secretKey)
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
    return
  }

  if (verified.status === "failed" || verified.status === "abandoned") {
    await supabaseAdmin
      .from("gift_purchases")
      .update({ status: "failed" })
      .eq("id", purchase.id)
  }
}

export async function POST(req: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY
  if (!secretKey) {
    console.error("[paystack-webhook] PAYSTACK_SECRET_KEY is not configured")
    return new Response("Server misconfigured", { status: 500 })
  }

  const rawBody = await req.text()
  const signature = req.headers.get("x-paystack-signature")
  const isValid = signature
    ? await verifyWebhookSignature(rawBody, signature, secretKey)
    : false

  if (!isValid) {
    return new Response("Invalid signature", { status: 401 })
  }

  let event: { event?: string; data?: { reference?: string } }
  try {
    event = JSON.parse(rawBody)
  } catch {
    return new Response("Invalid payload", { status: 400 })
  }

  if (event.event === "charge.success" && event.data?.reference) {
    const supabaseAdmin = createAdminClient()

    try {
      await finalizeGiftPurchaseByReference(supabaseAdmin, event.data.reference, secretKey)
    } catch (err) {
      console.error("[paystack-webhook] finalize failed", err)
      return new Response("Internal error", { status: 500 })
    }
  }

  return new Response("OK", { status: 200 })
}
