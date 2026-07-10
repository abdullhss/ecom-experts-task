import type { ReactNode } from 'react'

type AccordionContentProps = {
  isOpen: boolean
  children: ReactNode
  className?: string
  innerClassName?: string
}

export function AccordionContent({
  isOpen,
  children,
  className = '',
  innerClassName = '',
}: AccordionContentProps) {
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      } ${className}`}
      aria-hidden={!isOpen}
    >
      <div className="overflow-hidden">
        <div
          className={`transition-[opacity,transform] duration-300 ease-in-out motion-reduce:transition-none ${
            isOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-1 opacity-0'
          } ${innerClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

type AccordionChevronProps = {
  isOpen: boolean
  className?: string
}

export function AccordionChevron({ isOpen, className = '' }: AccordionChevronProps) {
  return (
    <img
      src="/images/icon-chevron-up.svg"
      alt=""
      className={`size-3 shrink-0 transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
        isOpen ? 'rotate-0' : 'rotate-180'
      } ${className}`}
    />
  )
}
