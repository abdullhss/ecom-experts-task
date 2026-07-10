import { useBundle } from '../../context/BundleContext'
import { ProductCard } from './ProductCard'
import { StepAccordionItem } from './StepAccordionItem'
import { AccordionChevron, AccordionContent } from './AccordionContent'

export function BuilderPanel() {
  const { steps } = useBundle()

  return (
    <div className="flex w-full max-w-[1213px] flex-col gap-[13px] xl:max-w-[768px]">
      {steps.map((step) => (
        <StepAccordionItem key={step.id} step={step} />
      ))}
    </div>
  )
}

export function MobileBuilderPanel() {
  const { steps, activeStepId, toggleStep, getSelectedCount, advanceStep } =
    useBundle()

  return (
    <div className="flex w-full max-w-[390px] flex-col">
      {steps.map((step) => {
        const isOpen = activeStepId === step.id
        const selectedCount = getSelectedCount(step.id)

        return (
          <div
            key={step.id}
            className="flex flex-col gap-[5px] pt-[5px] first:pt-0"
          >
            <p className="px-[15px] text-[10px] font-medium tracking-[1.6px] text-text-muted uppercase">
              {step.label}
            </p>
            <button
              type="button"
              className="flex w-full items-center border-y-[0.5px] border-heading px-[15px] py-5"
              onClick={() => toggleStep(step.id)}
              aria-expanded={isOpen}
            >
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <img src={step.icon} alt="" className="size-5 shrink-0" />
                <span className="text-left text-lg font-semibold leading-none text-obsidian">
                  {step.title}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {selectedCount > 0 && (
                  <span className="text-sm font-medium text-wyze-purple">
                    {selectedCount} selected
                  </span>
                )}
                <AccordionChevron isOpen={isOpen} />
              </div>
            </button>

            <AccordionContent
              isOpen={isOpen}
              innerClassName="flex flex-col gap-3 px-[15px] pb-5"
            >
              {step.products.map((product) => (
                <ProductCard
                  key={product.id}
                  step={step}
                  product={product}
                  layout="list"
                />
              ))}
              {step.nextLabel && (
                <button
                  type="button"
                  onClick={() => advanceStep(step.id)}
                  className="flex h-[39px] w-full items-center justify-center rounded-[7px] border border-wyze-purple"
                >
                  <span className="text-lg font-semibold text-wyze-purple">
                    {step.nextLabel}
                  </span>
                </button>
              )}
            </AccordionContent>
          </div>
        )
      })}
    </div>
  )
}
