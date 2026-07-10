import { useBundle } from '../../context/BundleContext'
import type { CatalogProduct, CatalogStep } from '../../types/catalog'
import { ColorSelector } from './ColorSelector'
import { PriceDisplay, SaveBadge } from './PriceDisplay'
import { QuantitySelector } from './QuantitySelector'

type ProductCardProps = {
  step: CatalogStep
  product: CatalogProduct
  layout: 'horizontal' | 'vertical' | 'list'
}

export function ProductCard({ step, product, layout }: ProductCardProps) {
  const {
    getActiveVariant,
    getCardQty,
    setActiveVariant,
    setQty,
  } = useBundle()

  const activeVariantId = getActiveVariant(step.id, product)
  const qty = getCardQty(step.id, product)
  const isSelected = qty > 0
  const isSingleSelect = step.selectionMode === 'single'

  const handleQtyChange = (nextQty: number) => {
    if (isSingleSelect) {
      setQty(step.id, product, null, nextQty > 0 ? 1 : 0)
      return
    }
    setQty(step.id, product, activeVariantId, nextQty)
  }

  const unitOriginal = product.unitOriginalPrice
  const unitSale = product.unitSalePrice

  const content = (
    <>
      <div
        className={
          layout === 'vertical'
            ? 'relative aspect-[214/124] w-full overflow-hidden rounded-[5px] bg-white'
            : layout === 'list'
              ? 'relative size-[72px] shrink-0 overflow-hidden rounded-[5px] bg-white'
              : 'relative h-[137px] w-[101px] shrink-0 overflow-hidden rounded-[5px] bg-white'
        }
      >
        <img
          src={product.image}
          alt={product.name}
          className={
            layout === 'vertical'
              ? 'absolute top-[-2%] left-[17%] h-[112%] w-[65%] object-contain'
              : layout === 'list'
                ? 'absolute inset-0 m-auto max-h-full max-w-full object-contain'
                : 'absolute top-[13%] left-0 h-[74%] w-full object-contain'
          }
        />
        {product.savePercent && <SaveBadge percent={product.savePercent} />}
      </div>

      <div
        className={`flex min-w-0 flex-col gap-2.5 ${layout === 'vertical' || layout === 'list' ? 'w-full' : 'flex-1'}`}
      >
        <div className="flex flex-col gap-2 tracking-[0.6px]">
          <h3
            className={`font-semibold leading-none text-heading ${layout === 'vertical' ? 'text-lg' : layout === 'list' ? 'text-base' : 'text-base'}`}
          >
            {product.name}
          </h3>
          <p
            className={`leading-[1.3] text-[rgba(31,31,31,0.75)] ${layout === 'vertical' ? 'text-sm' : 'text-xs'}`}
          >
            {product.description}{' '}
            <a href="#" className="text-link underline" onClick={(e) => e.preventDefault()}>
              Learn More
            </a>
          </p>
        </div>

        {product.variants.length > 0 && activeVariantId && (
          <ColorSelector
            colors={product.variants}
            selectedId={activeVariantId}
            onChange={(id) => setActiveVariant(step.id, product, id)}
          />
        )}

        <div className="flex w-full items-end gap-2.5">
          <QuantitySelector
            value={isSingleSelect ? (qty > 0 ? 1 : 0) : qty}
            onChange={handleQtyChange}
            variant="card"
            disabled={product.stepperDisabled}
            min={product.required ? 1 : 0}
          />
          <div className="flex flex-1 justify-end">
            <PriceDisplay
              originalPrice={unitOriginal}
              salePrice={unitSale}
              layout={layout === 'vertical' ? 'inline' : 'stacked'}
              isMonthly={product.isMonthly}
            />
          </div>
        </div>
      </div>
    </>
  )

  const borderClass = isSelected ? 'border-2 border-wyze-purple-70' : ''

  if (layout === 'vertical') {
    return (
      <div
        className={`flex min-w-0 flex-1 flex-col items-center gap-[19px] overflow-hidden rounded-[10px] bg-white px-[11px] py-[15px] ${borderClass}`}
      >
        {content}
      </div>
    )
  }

  if (layout === 'list') {
    return (
      <div
        className={`flex w-full items-center gap-4 overflow-hidden rounded-[10px] bg-white p-[11px] ${borderClass}`}
      >
        {content}
      </div>
    )
  }

  return (
    <div
      className={`flex flex-1 items-center gap-[19px] overflow-hidden rounded-[10px] bg-white p-[11px] ${borderClass}`}
    >
      {content}
    </div>
  )
}
