import { useMemo, useState } from 'react'
import { cameras, collapsedSteps } from '../../data/products'
import { CollapsedStep } from './CollapsedStep'
import { ProductCard } from './ProductCard'

export function CameraStep() {
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(cameras.map((c) => [c.id, c.initialQty])),
  )

  const selectedCount = useMemo(
    () => Object.values(quantities).filter((q) => q > 0).length,
    [quantities],
  )

  const updateQty = (id: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [id]: qty }))
  }

  const row1 = cameras.slice(0, 2)
  const row2 = cameras.slice(2, 4)
  const row3 = cameras.slice(4, 5)

  return (
    <div className="flex w-[768px] flex-col gap-[13px]">
      <div className="flex flex-col gap-[5px] rounded-[10px] bg-surface-blue pt-[15px]">
        <p className="px-[15px] text-xs font-medium tracking-[1.6px] text-text-muted uppercase">
          Step 1 of 4
        </p>

        <div className="flex flex-col items-center gap-[15px] border-t-[0.5px] border-heading px-[15px] py-5">
          <div className="flex w-full items-center justify-between">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <img
                src="/images/icon-camera.svg"
                alt=""
                className="size-[26px] shrink-0"
              />
              <h2 className="text-[22px] font-semibold leading-none text-obsidian">
                Choose your cameras
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-wyze-purple">
                {selectedCount} selected
              </span>
              <img
                src="/images/icon-chevron-up.svg"
                alt=""
                className="size-3"
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-end gap-[15px]">
            <div className="flex w-full gap-[15px]">
              {row1.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  qty={quantities[product.id]}
                  onQtyChange={(qty) => updateQty(product.id, qty)}
                />
              ))}
            </div>

            <div className="flex w-full gap-[15px]">
              {row2.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  qty={quantities[product.id]}
                  onQtyChange={(qty) => updateQty(product.id, qty)}
                />
              ))}
            </div>

            {row3.map((product) => (
              <div key={product.id} className="w-[360px]">
                <ProductCard
                  product={product}
                  qty={quantities[product.id]}
                  onQtyChange={(qty) => updateQty(product.id, qty)}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="flex h-[39px] items-center justify-center rounded-[7px] border border-wyze-purple px-6 py-[5px]"
          >
            <span className="text-lg font-semibold leading-6 text-wyze-purple">
              Next: Choose your plan
            </span>
          </button>
        </div>
      </div>

      {collapsedSteps.map((step) => (
        <CollapsedStep
          key={step.step}
          stepLabel={step.label}
          title={step.title}
          icon={step.icon}
        />
      ))}
    </div>
  )
}
