import type { CatalogProduct } from '../types/catalog'

export function getLinePrice(
  product: CatalogProduct,
  qty: number,
): { original: number; sale: number } {
  if (qty <= 0) {
    return { original: 0, sale: 0 }
  }

  const tier = product.linePricing?.[String(qty)]
  if (tier) {
    return tier
  }

  return {
    original: product.unitOriginalPrice * qty,
    sale: product.unitSalePrice * qty,
  }
}

export function formatMoney(amount: number, isMonthly = false): string {
  const formatted = `$${amount.toFixed(2)}`
  return isMonthly ? `${formatted}/mo` : formatted
}
