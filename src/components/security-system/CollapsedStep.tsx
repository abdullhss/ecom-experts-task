type CollapsedStepProps = {
  stepLabel: string
  title: string
  icon: string
}

export function CollapsedStep({ stepLabel, title, icon }: CollapsedStepProps) {
  return (
    <div className="flex w-full flex-col gap-[5px]">
      <p className="px-[15px] text-[10px] font-medium tracking-[1.6px] text-text-muted uppercase">
        {stepLabel}
      </p>
      <div className="flex items-center gap-[3px] border-y-[0.5px] border-heading px-[15px] py-5">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <img src={icon} alt="" className="size-[26px] shrink-0" />
          <h2 className="min-w-0 flex-1 text-[22px] font-semibold leading-none text-obsidian">
            {title}
          </h2>
        </div>
        <img
          src="/images/icon-chevron-down.svg"
          alt=""
          className="size-3 shrink-0"
        />
      </div>
    </div>
  )
}
