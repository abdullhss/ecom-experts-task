import catalogJson from '../data/catalog.json'

export type ProductVariant = {
  id: string
  label: string
  image: string
}

export type LinePricing = Record<string, { original: number; sale: number }>

export type CatalogProduct = {
  id: string
  name: string
  description: string
  image: string
  savePercent?: number
  unitOriginalPrice: number
  unitSalePrice: number
  linePricing?: LinePricing
  isMonthly?: boolean
  isFree?: boolean
  required?: boolean
  stepperDisabled?: boolean
  variants: ProductVariant[]
  initialQuantities: Record<string, number>
}

export type CatalogStep = {
  id: string
  step: number
  label: string
  title: string
  icon: string
  nextLabel: string | null
  nextLabelTablet?: string
  layout: 'grid' | 'list'
  selectionMode?: 'single'
  products: CatalogProduct[]
}

export type ReviewCategory = {
  stepId: string
  label: string
}

export type Catalog = {
  financing: { monthlyAsLowAs: number }
  shipping: {
    id: string
    name: string
    icon: string
    originalPrice: number
    salePrice: number
  }
  satisfactionBadge: string
  steps: CatalogStep[]
  reviewCategories: ReviewCategory[]
}

export const catalog = catalogJson as Catalog

export type QuantityMap = Record<string, number>
export type VariantSelectionMap = Record<string, string>

export type BundleState = {
  activeStepId: string
  quantities: QuantityMap
  selectedVariants: VariantSelectionMap
}

export type ReviewLine = {
  key: string
  stepId: string
  productId: string
  variantId: string | null
  name: string
  image: string
  qty: number
  lineOriginal: number
  lineSale: number
  isFree: boolean
  isMonthly: boolean
  stepperDisabled: boolean
}

export function itemKey(
  stepId: string,
  productId: string,
  variantId: string | null,
): string {
  return variantId
    ? `${stepId}:${productId}:${variantId}`
    : `${stepId}:${productId}`
}

export function cardSelectionKey(stepId: string, productId: string): string {
  return `${stepId}:${productId}`
}

export function defaultVariantId(product: CatalogProduct): string | null {
  if (product.variants.length === 0) return null
  return product.variants[0].id
}

export function variantLabel(
  product: CatalogProduct,
  variantId: string | null,
): string | null {
  if (!variantId) return null
  return product.variants.find((v) => v.id === variantId)?.label ?? null
}
