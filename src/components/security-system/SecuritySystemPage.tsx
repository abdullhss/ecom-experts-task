import { BundleProvider } from '../../context/BundleContext'
import { BuilderPanel, MobileBuilderPanel } from './BuilderPanel'
import { ReviewPanel } from './ReviewPanel'

function SecuritySystemPageContent() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center gap-5 pt-8 md:hidden">
        <h1 className="max-w-[348px] text-center text-[32px] font-bold leading-[1.1] tracking-[-0.064px] text-heading">
          Let&apos;s get started!
        </h1>
        <MobileBuilderPanel />
        <ReviewPanel variant="mobile" />
      </div>

      <div className="mx-auto hidden max-w-[1213px] flex-col gap-[13px] px-6 py-12 md:flex xl:hidden">
        <BuilderPanel />
        <ReviewPanel variant="stacked" />
      </div>

      <div className="mx-auto hidden max-w-[1440px] justify-center gap-[29px] px-[122px] py-[49px] xl:flex">
        <BuilderPanel />
        <ReviewPanel variant="sidebar" />
      </div>
    </div>
  )
}

export function SecuritySystemPage() {
  return (
    <BundleProvider>
      <SecuritySystemPageContent />
    </BundleProvider>
  )
}
