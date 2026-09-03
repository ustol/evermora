export function formatMoney(amount: number, currency: string | null) {
  if (!currency) return amount.toLocaleString()

  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${currency} ${amount.toLocaleString()}`
  }
}
