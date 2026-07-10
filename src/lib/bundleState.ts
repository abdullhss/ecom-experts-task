import {
  cardSelectionKey,
  catalog,
  defaultVariantId,
  itemKey,
  type BundleState,
  type CatalogProduct,
  type CatalogStep,
  type QuantityMap,
  type ReviewLine,
  type VariantSelectionMap,
} from '../types/catalog'
import { getLinePrice } from '../lib/pricing'

export function createInitialState(): BundleState {
  const quantities: QuantityMap = {}
  const selectedVariants: VariantSelectionMap = {}

  for (const step of catalog.steps) {
    for (const product of step.products) {
      const selectionKey = cardSelectionKey(step.id, product.id)
      const firstVariant = defaultVariantId(product)
      if (firstVariant) {
        selectedVariants[selectionKey] = firstVariant
      }

      for (const [variantId, qty] of Object.entries(product.initialQuantities)) {
        const resolvedVariant =
          variantId === 'default' ? firstVariant : variantId
        const key = itemKey(step.id, product.id, resolvedVariant)
        quantities[key] = qty
      }
    }
  }

  return {
    activeStepId: catalog.steps[0].id,
    quantities,
    selectedVariants,
  }
}

export function mergePersistedState(
  persisted: BundleState,
): BundleState {
  const initial = createInitialState()
  return {
    activeStepId: persisted.activeStepId ?? initial.activeStepId,
    quantities: { ...initial.quantities, ...persisted.quantities },
    selectedVariants: {
      ...initial.selectedVariants,
      ...persisted.selectedVariants,
    },
  }
}

export function getProductQty(
  quantities: QuantityMap,
  stepId: string,
  product: CatalogProduct,
  variantId: string | null,
): number {
  return quantities[itemKey(stepId, product.id, variantId)] ?? 0
}

export function getProductTotalQty(
  quantities: QuantityMap,
  stepId: string,
  product: CatalogProduct,
): number {
  if (product.variants.length === 0) {
    return getProductQty(quantities, stepId, product, null)
  }

  return product.variants.reduce(
    (sum, variant) =>
      sum + getProductQty(quantities, stepId, product, variant.id),
    0,
  )
}

export function countSelectedProducts(
  step: CatalogStep,
  quantities: QuantityMap,
): number {
  if (step.selectionMode === 'single') {
    return step.products.some(
      (product) => getProductTotalQty(quantities, step.id, product) > 0,
    )
      ? 1
      : 0
  }

  return step.products.filter(
    (product) => getProductTotalQty(quantities, step.id, product) > 0,
  ).length
}

export function buildReviewLines(quantities: QuantityMap): ReviewLine[] {
  const lines: ReviewLine[] = []

  for (const step of catalog.steps) {
    for (const product of step.products) {
      if (product.variants.length === 0) {
        const qty = getProductQty(quantities, step.id, product, null)
        if (qty > 0) {
          lines.push(createReviewLine(step.id, product, null, qty))
        }
        continue
      }

      for (const variant of product.variants) {
        const qty = getProductQty(quantities, step.id, product, variant.id)
        if (qty > 0) {
          lines.push(createReviewLine(step.id, product, variant.id, qty))
        }
      }
    }
  }

  return lines
}

function createReviewLine(
  stepId: string,
  product: CatalogProduct,
  variantId: string | null,
  qty: number,
): ReviewLine {
  const variant = variantId
    ? product.variants.find((v) => v.id === variantId)
    : null
  const { original, sale } = getLinePrice(product, qty)

  return {
    key: itemKey(stepId, product.id, variantId),
    stepId,
    productId: product.id,
    variantId,
    name: variant ? `${product.name}` : product.name,
    image: variant?.image ?? product.image,
    qty,
    lineOriginal: original,
    lineSale: sale,
    isFree: product.isFree ?? false,
    isMonthly: product.isMonthly ?? false,
    stepperDisabled: product.stepperDisabled ?? false,
  }
}

export function getPlanLine(quantities: QuantityMap): ReviewLine | null {
  const planStep = catalog.steps.find((s) => s.id === 'plan')
  if (!planStep) return null

  const selected = planStep.products.find(
    (product) => getProductTotalQty(quantities, planStep.id, product) > 0,
  )
  if (!selected) return null

  const qty = 1
  const { original, sale } = getLinePrice(selected, qty)
  return {
    key: itemKey(planStep.id, selected.id, null),
    stepId: planStep.id,
    productId: selected.id,
    variantId: null,
    name: selected.name,
    image: selected.image,
    qty,
    lineOriginal: original,
    lineSale: sale,
    isFree: false,
    isMonthly: selected.isMonthly ?? false,
    stepperDisabled: true,
  }
}

export type BundleTotals = {
  original: number
  sale: number
  savings: number
}

export function calculateTotals(quantities: QuantityMap): BundleTotals {
  let original = 0
  let sale = 0

  for (const line of buildReviewLines(quantities)) {
    if (line.isMonthly) continue
    original += line.lineOriginal
    sale += line.lineSale
  }

  const plan = getPlanLine(quantities)
  if (plan) {
    original += plan.lineOriginal
    sale += plan.lineSale
  }

  original += catalog.shipping.originalPrice
  sale += catalog.shipping.salePrice

  return {
    original,
    sale,
    savings: original - sale,
  }
}

export function getReviewLinesForCategory(
  lines: ReviewLine[],
  stepId: string,
): ReviewLine[] {
  return lines.filter((line) => line.stepId === stepId && line.stepId !== 'plan')
}
