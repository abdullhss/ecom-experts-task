import type { ColorOption } from '../../data/products'

type ColorSelectorProps = {
  colors: ColorOption[]
  selectedId: string
  onChange?: (id: string) => void
}

export function ColorSelector({
  colors,
  selectedId,
  onChange,
}: ColorSelectorProps) {
  if (colors.length === 0) return null

  return (
    <div className="flex items-end gap-1.5">
      {colors.map((color) => {
        const isSelected = color.id === selectedId
        return (
          <button
            key={color.id}
            type="button"
            onClick={() => onChange?.(color.id)}
            className={`flex h-[26px] items-center justify-center rounded-[2px] border-[0.5px] px-[3px] py-px ${
              isSelected
                ? 'border-wyze-green bg-wyze-green-bg'
                : 'border-[#ccc] bg-white'
            } ${color.label === 'Grey' ? 'w-[63px] px-[5px]' : 'w-[65px]'}`}
          >
            <img
              src={color.image}
              alt=""
              className="size-[22px] shrink-0 rounded-[5px] object-cover"
            />
            <span className="text-[10px] font-medium tracking-[0.6px] text-heading whitespace-nowrap">
              {color.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
