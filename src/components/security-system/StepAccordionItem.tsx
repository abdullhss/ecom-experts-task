import { useBundle } from '../../context/BundleContext'
import type { CatalogStep } from '../../types/catalog'
import { AccordionChevron, AccordionContent } from './AccordionContent'
import { ProductCard } from './ProductCard'

type StepAccordionItemProps = {
  step: CatalogStep
}

export function StepAccordionItem({ step }: StepAccordionItemProps) {
  const {
    activeStepId,
    toggleStep,
    getSelectedCount,
    advanceStep,
  } = useBundle()

  const isOpen = activeStepId === step.id
  const selectedCount = getSelectedCount(step.id)

  const cardLayoutForStep = (
    breakpoint: 'desktop' | 'tablet',
  ): 'horizontal' | 'vertical' | 'list' => {
    if (step.layout === 'list') return 'list'
    return breakpoint === 'tablet' ? 'vertical' : 'horizontal'
  }

  return (
    <div
      className={`flex w-full flex-col gap-[5px] transition-[background-color,padding] duration-300 ease-in-out motion-reduce:transition-none ${
        isOpen ? 'rounded-[10px] bg-surface-blue pt-[15px]' : 'bg-transparent pt-0'
      }`}
    >
      <p className="px-[15px] text-[10px] font-medium tracking-[1.6px] text-text-muted uppercase md:text-xs">
        {step.label}
      </p>

      <div className="border-y-[0.5px] border-heading">
        <button
          type="button"
          className="flex w-full items-center gap-[3px] px-[15px] py-5 text-left"
          onClick={() => toggleStep(step.id)}
          aria-expanded={isOpen}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <img
              src={step.icon}
              alt=""
              className="size-5 shrink-0 md:size-[30px] xl:size-[26px]"
            />
            <h2 className="min-w-0 flex-1 text-lg font-semibold leading-none text-obsidian md:text-[28px] xl:text-[22px]">
              {step.title}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <span
              className={`overflow-hidden text-sm font-medium text-wyze-purple transition-[opacity,max-width] duration-300 ease-in-out motion-reduce:transition-none ${
                isOpen && selectedCount > 0
                  ? 'max-w-[120px] opacity-100'
                  : 'max-w-0 opacity-0'
              } max-md:hidden md:inline xl:inline`}
            >
              {selectedCount} selected
            </span>
            <AccordionChevron isOpen={isOpen} />
          </div>
        </button>

        <AccordionContent
          isOpen={isOpen}
          innerClassName="flex flex-col items-center gap-[15px] border-t-[0.5px] border-heading px-[15px] py-5 max-md:hidden md:flex"
        >
          {step.layout === 'grid' ? (
            <>
              <div className="hidden w-full flex-col items-end gap-[15px] xl:flex">
                <div className="flex w-full gap-[15px]">
                  {step.products.slice(0, 2).map((product) => (
                    <ProductCard
                      key={product.id}
                      step={step}
                      product={product}
                      layout={cardLayoutForStep('desktop')}
                    />
                  ))}
                </div>
                <div className="flex w-full gap-[15px]">
                  {step.products.slice(2, 4).map((product) => (
                    <ProductCard
                      key={product.id}
                      step={step}
                      product={product}
                      layout={cardLayoutForStep('desktop')}
                    />
                  ))}
                </div>
                <div className="w-[360px]">
                  <ProductCard
                    step={step}
                    product={step.products[4]}
                    layout={cardLayoutForStep('desktop')}
                  />
                </div>
              </div>

              <div className="flex w-full gap-[15px] overflow-x-auto xl:hidden">
                {step.products.map((product) => (
                  <div key={product.id} className="min-w-[180px] flex-1">
                    <ProductCard
                      step={step}
                      product={product}
                      layout={cardLayoutForStep('tablet')}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex w-full flex-col gap-3">
              {step.products.map((product) => (
                <ProductCard
                  key={product.id}
                  step={step}
                  product={product}
                  layout="list"
                />
              ))}
            </div>
          )}

          {step.nextLabel && (
            <button
              type="button"
              onClick={() => advanceStep(step.id)}
              className="flex h-[39px] items-center justify-center rounded-[7px] border border-wyze-purple px-6 py-[5px]"
            >
              <span className="text-lg font-semibold leading-6 text-wyze-purple xl:hidden">
                {step.nextLabelTablet ?? step.nextLabel}
              </span>
              <span className="hidden text-lg font-semibold leading-6 text-wyze-purple xl:inline">
                {step.nextLabel}
              </span>
            </button>
          )}
        </AccordionContent>
      </div>
    </div>
  )
}
