type QuantitySelectorProps = {
  value: number
  onChange?: (value: number) => void
  variant?: 'card' | 'review'
  disabled?: boolean
}

export function QuantitySelector({
  value,
  onChange,
  variant = 'card',
  disabled = false,
}: QuantitySelectorProps) {
  const isCard = variant === 'card'
  const minusIcon = disabled
    ? '/images/icon-minus-disabled.svg'
    : isCard
      ? '/images/icon-minus-disabled.svg'
      : '/images/icon-minus-dark.svg'
  const plusIcon = disabled
    ? '/images/icon-add-disabled.svg'
    : isCard
      ? '/images/icon-add-card.svg'
      : '/images/icon-add.svg'

  const minusBtnClass = disabled
    ? 'bg-disabled-bg border border-border'
    : isCard
      ? value > 0
        ? 'bg-white border-2 border-border-light'
        : 'bg-white border-2 border-border-light'
      : 'bg-white'

  const plusBtnClass = disabled
    ? 'bg-disabled-bg border border-border'
    : isCard
      ? 'bg-quantity-bg'
      : 'bg-white'

  return (
    <div
      className={`flex items-center ${isCard ? 'gap-2.5 py-1 w-20 justify-center' : 'justify-between py-1 w-[72px]'}`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || value <= 0}
        onClick={() => onChange?.(Math.max(0, value - 1))}
        className={`flex size-5 items-center justify-center rounded ${minusBtnClass} ${!disabled && !isCard ? '' : ''}`}
      >
        <img src={minusIcon} alt="" className="h-2.5 w-2" />
      </button>
      <span
        className={`font-medium text-obsidian ${isCard ? 'text-base leading-5' : 'text-sm leading-4'}`}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled}
        onClick={() => onChange?.(value + 1)}
        className={`flex size-5 items-center justify-center rounded ${plusBtnClass}`}
      >
        <img src={plusIcon} alt="" className="size-2" />
      </button>
    </div>
  )
}
