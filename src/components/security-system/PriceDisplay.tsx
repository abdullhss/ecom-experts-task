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
  size?: 'sm' | 'md'
  align?: 'left' | 'right'
}

export function PriceDisplay({
  originalPrice,
  salePrice,
  size = 'md',
  align = 'right',
}: PriceDisplayProps) {
  const hasDiscount = originalPrice !== salePrice
  const alignClass = align === 'right' ? 'items-end text-right' : 'items-start'

  if (size === 'sm') {
    return (
      <div className={`flex flex-col ${alignClass}`}>
        {hasDiscount && (
          <span className="text-sm leading-4 text-strike line-through">
            ${originalPrice.toFixed(2)}
          </span>
        )}
        <span className="text-sm font-semibold leading-4 text-wyze-purple">
          {salePrice === 0 ? 'FREE' : `$${salePrice.toFixed(2)}`}
        </span>
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-[3px] ${alignClass}`}>
      {hasDiscount && (
        <span className="text-base leading-none text-price-red line-through">
          ${originalPrice.toFixed(2)}
        </span>
      )}
      <span className="text-base leading-none text-gray-70">
        ${salePrice.toFixed(2)}
      </span>
    </div>
  )
}
