type QuantitySelectorProps = {
  value: number
  onChange: (value: number) => void
  variant?: 'card' | 'review'
  disabled?: boolean
  min?: number
}

function MinusIcon({ color }: { color: string }) {
  return (
    <svg
      width="8"
      height="2"
      viewBox="0 0 8 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="8" height="1.6" rx="0.8" fill={color} />
    </svg>
  )
}

function PlusIcon({ color }: { color: string }) {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M7.333 3.333H4.667V0.667A0.667 0.667 0 0 0 4 0a0.667 0.667 0 0 0-.667.667v2.666H0.667A0.667 0.667 0 0 0 0 4c0 .177.07.347.195.471A0.667 0.667 0 0 0 .667 4.667h2.666v2.666A0.667 0.667 0 0 0 4 8a0.667 0.667 0 0 0 .667-.667V4.667h2.666A0.667 0.667 0 0 0 8 4a0.667 0.667 0 0 0-.667-.667Z"
        fill={color}
      />
    </svg>
  )
}

export function QuantitySelector({
  value,
  onChange,
  variant = 'card',
  disabled = false,
  min = 0,
}: QuantitySelectorProps) {
  const isCard = variant === 'card'
  const minusDisabled = disabled || value <= min

  const minusBtnClass = disabled
    ? 'bg-disabled-bg border border-border cursor-not-allowed'
    : isCard
      ? minusDisabled
        ? 'border-2 border-quantity-bg bg-quantity-bg'
        : 'border-2 border-border-light bg-white'
      : 'bg-white'

  const plusBtnClass = disabled
    ? 'bg-disabled-bg border border-border cursor-not-allowed'
    : isCard
      ? 'bg-quantity-bg'
      : 'bg-white'

  const minusIconColor = disabled
    ? '#CED6DE'
    : isCard && minusDisabled
      ? '#CED6DE'
      : isCard
        ? '#525963'
        : '#575757'

  const plusIconColor = disabled ? '#CED6DE' : isCard ? '#525963' : '#575757'

  return (
    <div
      className={`flex items-center ${isCard ? 'w-20 justify-center gap-2.5 py-1' : 'w-[72px] justify-between py-1'}`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={minusDisabled}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`flex size-5 shrink-0 items-center justify-center rounded-[4px] ${minusBtnClass}`}
      >
        <MinusIcon color={minusIconColor} />
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
        onClick={() => onChange(value + 1)}
        className={`flex size-5 shrink-0 items-center justify-center rounded-[4px] ${plusBtnClass}`}
      >
        <PlusIcon color={plusIconColor} />
      </button>
    </div>
  )
}
