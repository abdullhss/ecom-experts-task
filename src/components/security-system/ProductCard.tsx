import { useState } from 'react'
import type { CameraProduct } from '../../data/products'
import { ColorSelector } from './ColorSelector'
import { PriceDisplay } from './PriceDisplay'
import { QuantitySelector } from './QuantitySelector'
import { SaveBadge } from './PriceDisplay'

type ProductCardProps = {
  product: CameraProduct
  qty: number
  onQtyChange: (qty: number) => void
}

export function ProductCard({ product, qty, onQtyChange }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.id ?? 'white',
  )
  const isSelected = qty > 0

  return (
    <div
      className={`flex flex-1 items-center gap-[19px] overflow-hidden rounded-[10px] bg-white p-[11px] ${
        isSelected ? 'border-2 border-wyze-purple-70' : ''
      }`}
    >
      <div className="relative h-[137px] w-[101px] shrink-0 overflow-hidden rounded-[5px] bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-[13%] left-0 h-[74%] w-full object-contain"
        />
        {product.savePercent && <SaveBadge percent={product.savePercent} />}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <div className="flex flex-col gap-2 tracking-[0.6px]">
          <h3 className="text-base font-semibold leading-none text-heading">
            {product.name}
          </h3>
          <p className="text-xs leading-[1.3] text-[rgba(31,31,31,0.75)]">
            {product.description}{' '}
            <a href="#" className="text-link underline">
              Learn More
            </a>
          </p>
        </div>

        {product.colors.length > 0 && (
          <ColorSelector
            colors={product.colors}
            selectedId={selectedColor}
            onChange={setSelectedColor}
          />
        )}

        <div className="flex w-full items-end gap-2.5">
          <QuantitySelector value={qty} onChange={onQtyChange} variant="card" />
          <div className="flex flex-1 justify-end">
            <PriceDisplay
              originalPrice={product.originalPrice}
              salePrice={product.salePrice}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
