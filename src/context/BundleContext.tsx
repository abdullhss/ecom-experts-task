import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  buildReviewLines,
  calculateTotals,
  countSelectedProducts,
  createInitialState,
  getPlanLine,
  getProductQty,
  getReviewLinesForCategory,
  mergePersistedState,
} from '../lib/bundleState'
import { loadBundleState, saveBundleState } from '../lib/storage'
import {
  cardSelectionKey,
  catalog,
  defaultVariantId,
  itemKey,
  type BundleState,
  type CatalogProduct,
  type CatalogStep,
} from '../types/catalog'

type BundleContextValue = {
  activeStepId: string
  steps: CatalogStep[]
  reviewLines: ReturnType<typeof buildReviewLines>
  planLine: ReturnType<typeof getPlanLine>
  totals: ReturnType<typeof calculateTotals>
  savedMessage: string | null
  setActiveStep: (stepId: string) => void
  toggleStep: (stepId: string) => void
  getSelectedCount: (stepId: string) => number
  getActiveVariant: (stepId: string, product: CatalogProduct) => string | null
  getCardQty: (stepId: string, product: CatalogProduct) => number
  setActiveVariant: (
    stepId: string,
    product: CatalogProduct,
    variantId: string,
  ) => void
  setQty: (
    stepId: string,
    product: CatalogProduct,
    variantId: string | null,
    qty: number,
  ) => void
  setReviewQty: (key: string, qty: number) => void
  advanceStep: (stepId: string) => void
  saveForLater: () => void
  getCategoryLines: (stepId: string) => ReturnType<typeof buildReviewLines>
}

const BundleContext = createContext<BundleContextValue | null>(null)

function findStep(stepId: string): CatalogStep {
  const step = catalog.steps.find((s) => s.id === stepId)
  if (!step) throw new Error(`Unknown step: ${stepId}`)
  return step
}

function findProduct(stepId: string, productId: string): CatalogProduct {
  const step = findStep(stepId)
  const product = step.products.find((p) => p.id === productId)
  if (!product) throw new Error(`Unknown product: ${productId}`)
  return product
}

function parseItemKey(key: string): {
  stepId: string
  productId: string
  variantId: string | null
} {
  const parts = key.split(':')
  if (parts.length === 2) {
    return { stepId: parts[0], productId: parts[1], variantId: null }
  }
  return {
    stepId: parts[0],
    productId: parts[1],
    variantId: parts[2],
  }
}

export function BundleProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BundleState>(() => {
    const persisted = loadBundleState()
    return persisted ? mergePersistedState(persisted) : createInitialState()
  })
  const [savedMessage, setSavedMessage] = useState<string | null>(null)

  useEffect(() => {
    saveBundleState(state)
  }, [state])

  const reviewLines = useMemo(
    () => buildReviewLines(state.quantities),
    [state.quantities],
  )
  const planLine = useMemo(
    () => getPlanLine(state.quantities),
    [state.quantities],
  )
  const totals = useMemo(
    () => calculateTotals(state.quantities),
    [state.quantities],
  )

  const setActiveStep = useCallback((stepId: string) => {
    setState((prev) => ({ ...prev, activeStepId: stepId }))
  }, [])

  const toggleStep = useCallback((stepId: string) => {
    setState((prev) => ({
      ...prev,
      activeStepId: prev.activeStepId === stepId ? '' : stepId,
    }))
  }, [])

  const getSelectedCount = useCallback(
    (stepId: string) => countSelectedProducts(findStep(stepId), state.quantities),
    [state.quantities],
  )

  const getActiveVariant = useCallback(
    (stepId: string, product: CatalogProduct) => {
      const key = cardSelectionKey(stepId, product.id)
      return state.selectedVariants[key] ?? defaultVariantId(product)
    },
    [state.selectedVariants],
  )

  const getCardQty = useCallback(
    (stepId: string, product: CatalogProduct) => {
      const variantId =
        product.variants.length > 0
          ? getActiveVariant(stepId, product)
          : null
      return getProductQty(state.quantities, stepId, product, variantId)
    },
    [state.quantities, getActiveVariant],
  )

  const setActiveVariant = useCallback(
    (stepId: string, product: CatalogProduct, variantId: string) => {
      setState((prev) => ({
        ...prev,
        selectedVariants: {
          ...prev.selectedVariants,
          [cardSelectionKey(stepId, product.id)]: variantId,
        },
      }))
    },
    [],
  )

  const setQty = useCallback(
    (
      stepId: string,
      product: CatalogProduct,
      variantId: string | null,
      qty: number,
    ) => {
      const key = itemKey(stepId, product.id, variantId)
      setState((prev) => {
        const nextQuantities = { ...prev.quantities, [key]: Math.max(0, qty) }

        if (findStep(stepId).selectionMode === 'single' && qty > 0) {
          for (const other of findStep(stepId).products) {
            if (other.id === product.id) continue
            const otherKey = itemKey(stepId, other.id, null)
            nextQuantities[otherKey] = 0
          }
        }

        return { ...prev, quantities: nextQuantities }
      })
    },
    [],
  )

  const setReviewQty = useCallback((key: string, qty: number) => {
    const { stepId, productId, variantId } = parseItemKey(key)
    const product = findProduct(stepId, productId)
    setQty(stepId, product, variantId, qty)
  }, [setQty])

  const advanceStep = useCallback((stepId: string) => {
    const index = catalog.steps.findIndex((s) => s.id === stepId)
    const next = catalog.steps[index + 1]
    if (next) {
      setState((prev) => ({ ...prev, activeStepId: next.id }))
    }
  }, [])

  const saveForLater = useCallback(() => {
    saveBundleState(state)
    setSavedMessage('Your system has been saved!')
    window.setTimeout(() => setSavedMessage(null), 3000)
  }, [state])

  const getCategoryLines = useCallback(
    (stepId: string) => getReviewLinesForCategory(reviewLines, stepId),
    [reviewLines],
  )

  const value: BundleContextValue = {
    activeStepId: state.activeStepId,
    steps: catalog.steps,
    reviewLines,
    planLine,
    totals,
    savedMessage,
    setActiveStep,
    toggleStep,
    getSelectedCount,
    getActiveVariant,
    getCardQty,
    setActiveVariant,
    setQty,
    setReviewQty,
    advanceStep,
    saveForLater,
    getCategoryLines,
  }

  return (
    <BundleContext.Provider value={value}>{children}</BundleContext.Provider>
  )
}

export function useBundle() {
  const ctx = useContext(BundleContext)
  if (!ctx) {
    throw new Error('useBundle must be used within BundleProvider')
  }
  return ctx
}
