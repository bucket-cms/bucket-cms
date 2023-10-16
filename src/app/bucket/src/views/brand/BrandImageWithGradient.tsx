import { BrandImage } from "."

const BrandImageWithGradient = ({ className }: { className?: string }) => {
  return (
    <div className="sm:h-72 w-full overflow-hidden -mt-16 -mb-4 relative">
      <div className="w-full h-1/3 absolute bottom-0 left-0 bg-gradient-to-t from-[rgba(255,255,255,1)] via-[rgba(255,255,255,0)] to-[rgba(255,255,255,0)] z-10"></div>
      <div className="scale-80 sm:scale-[1.33] relative top-8 sm:top-16">
        <BrandImage className="bottom-2" />
      </div>
    </div>
  )
}

export { BrandImageWithGradient }
