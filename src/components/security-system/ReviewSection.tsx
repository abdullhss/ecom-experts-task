import type { ReviewItem } from '../../data/products'
import { QuantitySelector } from './QuantitySelector'

type ReviewLineItemProps = {
  item: ReviewItem
}

export function ReviewLineItem({ item }: ReviewLineItemProps) {
  return (
    <div className="flex w-full items-start gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="relative size-[41px] shrink-0 overflow-hidden rounded-[5px] bg-white">
          <img
            src={item.image}
            alt=""
            className="absolute inset-0 m-auto max-h-full max-w-full object-contain"
          />
        </div>
        <p className="min-w-0 flex-1 text-sm font-medium tracking-[0.07px] text-obsidian">
          {item.name}
        </p>
        <QuantitySelector
          value={item.qty}
          variant="review"
          disabled={item.disabled}
        />
      </div>
      <div className="flex shrink-0 flex-col items-end">
        {item.originalPrice !== undefined && item.originalPrice > 0 && (
          <span className="text-sm leading-4 text-strike line-through">
            ${item.originalPrice.toFixed(2)}
          </span>
        )}
        <span className="text-sm font-semibold leading-4 text-wyze-purple">
          {item.isFree ? 'FREE' : `$${item.price.toFixed(2)}`}
        </span>
      </div>
    </div>
  )
}

type ReviewSectionProps = {
  title: string
  items: ReviewItem[]
}

export function ReviewSection({ title, items }: ReviewSectionProps) {
  return (
    <div className="flex w-full flex-col gap-2 border-t border-border pt-[15px]">
      <p className="text-xs font-normal tracking-[0.36px] text-label uppercase">
        {title}
      </p>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <ReviewLineItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
