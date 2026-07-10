type SaveBadgeProps = {
  percent: number
}

export function SaveBadge({ percent }: SaveBadgeProps) {
  return (
    <div className="absolute top-0 left-0 rounded-[10px] bg-wyze-purple px-1.5 py-0.5">
      <span className="text-xs font-semibold text-white">Save {percent}%</span>
    </div>
  )
}

type PriceDisplayProps = {
  originalPrice: number
  salePrice: number
  layout?: 'stacked' | 'inline'
  isMonthly?: boolean
}

export function PriceDisplay({
  originalPrice,
  salePrice,
  layout = 'stacked',
  isMonthly = false,
}: PriceDisplayProps) {
  const hasDiscount = originalPrice !== salePrice
  const suffix = isMonthly ? '/mo' : ''

  if (layout === 'inline') {
    return (
      <div className="flex items-center justify-end gap-2.5 whitespace-nowrap text-right">
        {hasDiscount && (
          <span className="text-base leading-4 text-strike line-through">
            ${originalPrice.toFixed(2)}
            {suffix}
          </span>
        )}
        <span className="text-base font-semibold leading-4 text-wyze-purple">
          {salePrice === 0 ? 'FREE' : `$${salePrice.toFixed(2)}${suffix}`}
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-end gap-[3px] text-right">
      {hasDiscount && (
        <span className="text-base leading-none text-price-red line-through">
          ${originalPrice.toFixed(2)}
          {suffix}
        </span>
      )}
      <span className="text-base leading-none text-gray-70">
        {salePrice === 0 ? 'FREE' : `$${salePrice.toFixed(2)}${suffix}`}
      </span>
    </div>
  )
}
