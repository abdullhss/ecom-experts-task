import { useBundle } from '../../context/BundleContext'
import { catalog } from '../../types/catalog'
import {
  PlanReviewRow,
  ReviewSection,
  ShippingReviewRow,
} from './ReviewSection'

type ReviewPanelProps = {
  variant?: 'sidebar' | 'stacked' | 'mobile'
}

export function ReviewPanel({ variant = 'sidebar' }: ReviewPanelProps) {
  const {
    getCategoryLines,
    totals,
    saveForLater,
    savedMessage,
  } = useBundle()

  const isStacked = variant === 'stacked'
  const isMobile = variant === 'mobile'

  const itemSize = isStacked ? 'lg' : isMobile ? 'sm' : 'md'
  const priceLayout = isStacked ? 'inline' : 'stacked'
  const headingSize = isStacked
    ? 'text-[28px]'
    : isMobile
      ? 'text-[22px]'
      : 'text-[22px]'
  const descSize = isStacked ? 'text-base' : isMobile ? 'text-xs' : 'text-sm'
  const labelClass = isMobile ? 'text-[10px]' : 'text-xs'

  const header = (
    <div className="flex flex-col gap-[5px] tracking-[0.6px]">
      <h2 className={`font-semibold leading-none text-heading ${headingSize}`}>
        Your security system
      </h2>
      <p className={`leading-[1.3] text-[rgba(31,31,31,0.75)] ${descSize}`}>
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>
    </div>
  )

  const reviewItems = (
    <div className="flex flex-col gap-2.5">
      {catalog.reviewCategories.map((category) => (
        <ReviewSection
          key={category.stepId}
          title={category.label}
          lines={getCategoryLines(category.stepId)}
          size={itemSize}
          priceLayout={priceLayout}
        />
      ))}
      <PlanReviewRow size={itemSize} />
      <ShippingReviewRow size={itemSize} />
    </div>
  )

  const checkout = (
    <CheckoutBlock
      totals={totals}
      onSave={saveForLater}
      savedMessage={savedMessage}
      alignEnd={isStacked}
    />
  )

  if (isStacked) {
    return (
      <section className="w-full rounded-[10px] bg-surface-blue pt-[15px]">
        <p
          className={`px-[15px] font-medium tracking-[1.6px] text-text-muted uppercase ${labelClass}`}
        >
          Review
        </p>
        <div className="flex flex-col gap-10 px-5 pt-5 pb-[31px] md:flex-row md:items-start md:justify-center md:gap-[52px]">
          <div className="flex w-full max-w-[552px] flex-col gap-2.5">
            {header}
            {reviewItems}
          </div>
          <div className="flex w-full max-w-[350px] shrink-0 flex-col md:self-start">
            {checkout}
          </div>
        </div>
      </section>
    )
  }

  return (
    <aside className="w-full shrink-0 max-md:max-w-[390px] xl:max-w-[399px]">
      <div className="flex flex-col gap-[5px] bg-surface-blue pt-[15px] max-md:rounded-none md:rounded-[10px]">
        <p
          className={`px-[15px] font-medium tracking-[1.6px] text-text-muted uppercase ${labelClass}`}
        >
          Review
        </p>
        <div className="flex w-full flex-col gap-2.5 px-5 pt-5 pb-[31px]">
          {header}
          {reviewItems}
          {checkout}
        </div>
      </div>
    </aside>
  )
}

function CheckoutBlock({
  totals,
  onSave,
  savedMessage,
  alignEnd,
}: {
  totals: { original: number; sale: number; savings: number }
  onSave: () => void
  savedMessage: string | null
  alignEnd?: boolean
}) {
  return (
    <div className={`flex flex-col gap-2 ${alignEnd ? 'md:items-end' : ''}`}>
      <div className="flex items-center justify-between">
        <img
          src={catalog.satisfactionBadge}
          alt="100% Wyze Satisfaction Guaranteed"
          className="size-[78px] object-cover"
        />
        <div className="flex flex-col items-end justify-center gap-2">
          <span className="rounded-[3px] bg-wyze-purple px-2 py-[5px] text-xs font-medium tracking-[-0.6px] text-white">
            as low as ${catalog.financing.monthlyAsLowAs.toFixed(2)}/mo
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-lg leading-5 text-strike line-through">
              ${totals.original.toFixed(2)}
            </span>
            <span className="text-2xl font-bold leading-8 text-wyze-purple">
              ${totals.sale.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 pt-2.5">
        {totals.savings > 0 && (
          <p className="text-center text-xs font-semibold tracking-[-0.056px] text-wyze-green">
            Congrats! You&apos;re saving ${totals.savings.toFixed(2)} on your
            security bundle!
          </p>
        )}
        <button
          type="button"
          className="w-full rounded bg-wyze-purple px-4 py-[13px] text-[17px] font-bold text-white"
          onClick={() => window.alert('Checkout is a placeholder in this prototype.')}
        >
          Checkout
        </button>
      </div>

      <button
        type="button"
        className="text-center text-sm text-text-muted italic underline"
        onClick={onSave}
      >
        Save my system for later
      </button>
      {savedMessage && (
        <p className="text-center text-xs font-medium text-wyze-green" role="status">
          {savedMessage}
        </p>
      )}
    </div>
  )
}
