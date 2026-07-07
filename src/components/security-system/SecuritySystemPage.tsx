import { CameraStep } from './CameraStep'
import { ReviewSidebar } from './ReviewSidebar'

export function SecuritySystemPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex max-w-[1440px] justify-center gap-[29px] px-[122px] py-[49px]">
        <CameraStep />
        <ReviewSidebar />
      </div>
    </div>
  )
}
