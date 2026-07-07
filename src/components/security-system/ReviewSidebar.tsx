import {
  reviewAccessories,
  reviewCameras,
  reviewSensors,
} from '../../data/products'
import { ReviewSection } from './ReviewSection'

export function ReviewSidebar() {
  return (
    <aside className="w-[399px] shrink-0">
      <div className="flex flex-col gap-[5px] rounded-[10px] bg-surface-blue pt-[15px]">
        <p className="px-[15px] text-xs font-medium tracking-[1.6px] text-text-muted uppercase">
          Review
        </p>

        <div className="flex w-[390px] flex-col gap-2.5 px-5 pt-5 pb-[31px]">
          <div className="flex flex-col gap-[5px] tracking-[0.6px]">
            <h2 className="text-[22px] font-semibold leading-none text-heading">
              Your security system
            </h2>
            <p className="text-sm leading-[1.3] text-[rgba(31,31,31,0.75)]">
              Review your personalized protection system designed to keep what
              matters most safe.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <ReviewSection title="Cameras" items={reviewCameras} />
            <ReviewSection title="Sensors" items={reviewSensors} />
            <ReviewSection title="accessories" items={reviewAccessories} />

            <div className="flex flex-col gap-2 border-t border-border pt-[15px]">
              <p className="text-xs tracking-[0.36px] text-label uppercase">
                plan
              </p>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-[3px]">
                  <img
                    src="/images/icon-plan.svg"
                    alt=""
                    className="h-[23.7px] w-5"
                  />
                  <p className="text-base leading-none">
                    <span className="font-bold text-black">Cam </span>
                    <span className="font-bold text-wyze-purple">Unlimited</span>
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm leading-4 text-strike line-through">
                    $12.99/mo
                  </span>
                  <span className="text-sm font-semibold leading-4 text-wyze-purple">
                    $9.99/mo
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-[15px]">
              <div className="flex items-center gap-4">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex size-[41px] shrink-0 items-center justify-center overflow-hidden rounded-[5px] bg-white">
                    <img
                      src="/images/icon-delivery.svg"
                      alt=""
                      className="size-[29px]"
                    />
                  </div>
                  <p className="text-sm font-medium text-obsidian">
                    Fast Shipping
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end">
                  <span className="text-sm leading-4 text-strike line-through">
                    $5.99
                  </span>
                  <span className="text-sm font-semibold text-wyze-purple">
                    FREE
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <img
                src="/images/satisfaction-badge.png"
                alt="100% Wyze Satisfaction Guaranteed"
                className="size-[78px] object-cover"
              />
              <div className="flex flex-col items-end justify-center gap-2">
                <span className="rounded-[3px] bg-wyze-purple px-2 py-[5px] text-xs font-medium tracking-[-0.6px] text-white">
                  as low as $19.19/mo
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg leading-5 text-strike line-through">
                    $238.81
                  </span>
                  <span className="text-2xl font-bold leading-8 text-wyze-purple">
                    $187.89
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 pt-2.5">
              <p className="text-center text-xs font-semibold tracking-[-0.056px] text-wyze-green">
                Congrats! You&apos;re saving $50.92 on your security bundle!
              </p>
              <button
                type="button"
                className="w-full rounded bg-wyze-purple px-4 py-[13px] text-[17px] font-bold text-white"
              >
                Checkout
              </button>
            </div>

            <button
              type="button"
              className="text-center text-sm text-text-muted italic underline"
            >
              Save my system for later
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
