/**
 * @paystack/inline-js ships no type declarations (checked: no .d.ts in the
 * package, no @types/paystack__inline-js). Minimal ambient types for just
 * the surface this app actually uses, based on the package's own README.
 */
declare module "@paystack/inline-js" {
  interface PaystackTransactionOptions {
    key: string
    amount: number
    currency?: string
    email: string
    firstName?: string
    lastName?: string
    reference?: string
    metadata?: Record<string, unknown>
    onSuccess?: (transaction: { id: number; reference: string; message: string }) => void
    onCancel?: () => void
    onError?: (error: { message: string }) => void
  }

  export default class PaystackPop {
    constructor()
    newTransaction(options: PaystackTransactionOptions): void
  }
}
