import { useBundle } from '../../context/BundleContext'
import { catalog, type ReviewLine } from '../../types/catalog'
import { QuantitySelector } from './QuantitySelector'

type ReviewLineItemProps = {
  line: ReviewLine
  size?: 'sm' | 'md' | 'lg'
  priceLayout?: 'stacked' | 'inline'
}

export function ReviewLineItem({
  line,
  size = 'md',
  priceLayout = 'stacked',
}: ReviewLineItemProps) {
  const { setReviewQty } = useBundle()

  const nameSize =
    size === 'lg'
      ? 'text-lg tracking-[0.09px]'
      : size === 'sm'
        ? 'text-xs tracking-[0.06px]'
        : 'text-sm tracking-[0.07px]'
  const priceSize = size === 'lg' ? 'text-base' : size === 'sm' ? 'text-xs' : 'text-sm'
  const suffix = line.isMonthly ? '/mo' : ''

  const priceBlock =
    priceLayout === 'inline' ? (
      <div
        className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap ${priceSize}`}
      >
        {line.lineOriginal > 0 && line.lineOriginal !== line.lineSale && (
          <span className="font-medium leading-4 text-strike line-through">
            ${line.lineOriginal.toFixed(2)}
            {suffix}
          </span>
        )}
        <span className="font-semibold leading-4 text-wyze-purple">
          {line.isFree ? 'FREE' : `$${line.lineSale.toFixed(2)}${suffix}`}
        </span>
      </div>
    ) : (
      <div className="flex shrink-0 flex-col items-end">
        {line.lineOriginal > 0 && line.lineOriginal !== line.lineSale && (
          <span className={`${priceSize} leading-4 text-strike line-through`}>
            ${line.lineOriginal.toFixed(2)}
            {suffix}
          </span>
        )}
        <span className={`${priceSize} font-semibold leading-4 text-wyze-purple`}>
          {line.isFree ? 'FREE' : `$${line.lineSale.toFixed(2)}${suffix}`}
        </span>
      </div>
    )

  return (
    <div className="flex w-full items-center gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="relative size-[41px] shrink-0 overflow-hidden rounded-[5px] bg-white">
          <img
            src={line.image}
            alt=""
            className="absolute inset-0 m-auto max-h-full max-w-full object-contain"
          />
        </div>
        <p className={`min-w-0 flex-1 font-medium text-obsidian ${nameSize}`}>
          {line.name}
        </p>
        <QuantitySelector
          value={line.qty}
          variant="review"
          disabled={line.stepperDisabled}
          min={line.stepperDisabled ? line.qty : 0}
          onChange={(qty) => setReviewQty(line.key, qty)}
        />
      </div>
      {priceBlock}
    </div>
  )
}

type ReviewSectionProps = {
  title: string
  lines: ReviewLine[]
  size?: 'sm' | 'md' | 'lg'
  priceLayout?: 'stacked' | 'inline'
}

export function ReviewSection({
  title,
  lines,
  size = 'md',
  priceLayout = 'stacked',
}: ReviewSectionProps) {
  if (lines.length === 0) return null

  return (
    <div className="flex w-full flex-col gap-2 border-t border-border pt-[15px]">
      <p className="text-xs font-normal tracking-[0.36px] text-label uppercase">
        {title}
      </p>
      <div className="flex flex-col gap-3">
        {lines.map((line) => (
          <ReviewLineItem
            key={line.key}
            line={line}
            size={size}
            priceLayout={priceLayout}
          />
        ))}
      </div>
    </div>
  )
}

export function PlanReviewRow({
  size = 'md',
}: {
  size?: 'sm' | 'md' | 'lg'
}) {
  const { planLine } = useBundle()
  if (!planLine) return null

  const planLabel = size === 'sm' ? 'Home monitoring plan' : 'plan'
  const priceSize = size === 'lg' ? 'text-base' : size === 'sm' ? 'text-xs' : 'text-sm'
  const planNameSize = size === 'sm' ? 'text-sm' : 'text-base'
  const iconClass = size === 'sm' ? 'h-[17px] w-3.5' : 'h-[23.7px] w-5'

  const planName = planLine.name.replace(/^Cam /, '')

  return (
    <div className="flex flex-col gap-2 border-t border-border pt-[15px]">
      <p className="text-xs tracking-[0.36px] text-label uppercase">{planLabel}</p>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-[3px]">
          <img src={planLine.image} alt="" className={iconClass} />
          <p className={`leading-none ${planNameSize}`}>
            {planLine.name.startsWith('Cam ') ? (
              <>
                <span className="font-bold text-black">Cam </span>
                <span className="font-bold text-wyze-purple">{planName}</span>
              </>
            ) : (
              <span className="font-bold text-black">{planLine.name}</span>
            )}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className={`${priceSize} leading-4 text-strike line-through`}>
            ${planLine.lineOriginal.toFixed(2)}/mo
          </span>
          <span className={`${priceSize} font-semibold leading-4 text-wyze-purple`}>
            ${planLine.lineSale.toFixed(2)}/mo
          </span>
        </div>
      </div>
    </div>
  )
}

export function ShippingReviewRow({
  size = 'md',
}: {
  size?: 'sm' | 'md' | 'lg'
}) {
  const shipping = catalog.shipping
  const priceSize = size === 'lg' ? 'text-base' : size === 'sm' ? 'text-xs' : 'text-sm'
  const nameSize = size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <div className="border-t border-border pt-[15px]">
      <div className="flex items-center gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex size-[41px] shrink-0 items-center justify-center overflow-hidden rounded-[5px] bg-white">
            <img src={shipping.icon} alt="" className="size-[29px]" />
          </div>
          <p className={`font-medium text-obsidian ${nameSize}`}>{shipping.name}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end">
          <span className={`${priceSize} leading-4 text-strike line-through`}>
            ${shipping.originalPrice.toFixed(2)}
          </span>
          <span className={`${priceSize} font-semibold text-wyze-purple`}>FREE</span>
        </div>
      </div>
    </div>
  )
}
