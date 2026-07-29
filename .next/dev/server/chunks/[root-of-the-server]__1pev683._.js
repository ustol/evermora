module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/lib/supabase-admin.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdminClient",
    ()=>createAdminClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$111$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@supabase+supabase-js@2.111.0/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
function createAdminClient() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set for admin client");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$111$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, serviceRoleKey);
}
}),
"[project]/src/app/api/verify-gift-purchase/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OPTIONS",
    ()=>OPTIONS,
    "POST",
    ()=>POST
]);
// Called by the client immediately after Paystack's popup reports success.
// Trusts nothing from that report — independently re-verifies with Paystack
// using the secret key before marking anything paid.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase-admin.ts [app-route] (ecmascript)");
;
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info, x-supabase-api-version"
};
async function verifyPaystackTransaction(reference, secretKey) {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
        headers: {
            Authorization: `Bearer ${secretKey}`
        }
    });
    if (response.status === 404) {
        return null;
    }
    const body = await response.json();
    if (body?.message === "Transaction reference not found") {
        return null;
    }
    if (!response.ok || !body?.status) {
        throw new Error(body?.message ?? `Paystack verify failed (${response.status})`);
    }
    return {
        status: body.data.status,
        amountMinorUnits: body.data.amount,
        currency: body.data.currency
    };
}
function getClerkSubFromRequest(req) {
    const auth = req.headers.get("Authorization");
    if (!auth?.startsWith("Bearer ")) return null;
    const token = auth.slice("Bearer ".length);
    const payloadSegment = token.split(".")[1];
    if (!payloadSegment) return null;
    try {
        const base64 = payloadSegment.replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, "=");
        const claims = JSON.parse(atob(padded));
        return typeof claims.sub === "string" ? claims.sub : null;
    } catch  {
        return null;
    }
}
async function POST(req) {
    try {
        const body = await req.json();
        const { purchaseId } = body;
        if (!purchaseId || typeof purchaseId !== "string") {
            return Response.json({
                error: "purchaseId is required"
            }, {
                status: 400
            });
        }
        const clerkSub = getClerkSubFromRequest(req);
        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!secretKey) throw new Error("PAYSTACK_SECRET_KEY is not configured");
        const supabaseAdmin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAdminClient"])();
        const { data: purchase, error } = await supabaseAdmin.from("gift_purchases").select("id, paystack_reference, amount, currency, status, purchaser_profile_id, profiles(clerk_user_id)").eq("id", purchaseId).maybeSingle();
        if (error) throw error;
        if (!purchase) {
            return Response.json({
                error: "Purchase not found"
            }, {
                status: 404,
                headers: corsHeaders
            });
        }
        if (purchase.purchaser_profile_id) {
            const ownerClerkId = purchase.profiles?.clerk_user_id;
            const isOwner = !!clerkSub && ownerClerkId === clerkSub;
            let isAdmin = false;
            if (!isOwner && clerkSub) {
                const { data: callerProfile } = await supabaseAdmin.from("profiles").select("role").eq("clerk_user_id", clerkSub).maybeSingle();
                isAdmin = callerProfile?.role === "admin";
            }
            if (!isOwner && !isAdmin) {
                return Response.json({
                    error: "Not your purchase"
                }, {
                    status: 403,
                    headers: corsHeaders
                });
            }
        }
        if (purchase.status === "paid") {
            return Response.json({
                ok: true,
                reason: "already_paid"
            }, {
                status: 200,
                headers: corsHeaders
            });
        }
        const verified = await verifyPaystackTransaction(purchase.paystack_reference, secretKey);
        if (!verified) {
            await supabaseAdmin.from("gift_purchases").update({
                status: "pending"
            }).eq("id", purchase.id);
            return Response.json({
                ok: false,
                reason: "pending"
            }, {
                status: 200,
                headers: corsHeaders
            });
        }
        const expectedAmountMinorUnits = Math.round(Number(purchase.amount) * 100);
        const isGenuinelyPaid = verified.status === "success" && verified.amountMinorUnits === expectedAmountMinorUnits && verified.currency === purchase.currency;
        if (isGenuinelyPaid) {
            const { error: updateError } = await supabaseAdmin.from("gift_purchases").update({
                status: "paid",
                paid_at: new Date().toISOString()
            }).eq("id", purchase.id);
            if (updateError) throw updateError;
            return Response.json({
                ok: true
            }, {
                status: 200,
                headers: corsHeaders
            });
        }
        if (verified.status === "failed" || verified.status === "abandoned") {
            await supabaseAdmin.from("gift_purchases").update({
                status: "failed"
            }).eq("id", purchase.id);
        }
        return Response.json({
            ok: false,
            reason: "verification_mismatch"
        }, {
            status: 422,
            headers: corsHeaders
        });
    } catch (err) {
        console.error("[verify-gift-purchase]", err);
        return Response.json({
            error: "Internal error"
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
}
async function OPTIONS() {
    return new Response(null, {
        headers: corsHeaders
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1pev683._.js.map