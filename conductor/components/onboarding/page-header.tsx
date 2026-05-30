'use client'

import Image from 'next/image'

interface PageHeaderProps {
  step?: number
  totalSteps?: number
}

export function PageHeader({ step, totalSteps }: PageHeaderProps) {
  return (
    <div className="w-full bg-[#004B9E] px-4 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-2Gkg9yfFwvpj436cyJD2M9I8I3GiKT.jpg"
            alt="SEM Salta"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">SEM SALTA</p>
          <p className="text-white/70 text-xs leading-tight">Estacionamiento Digital</p>
        </div>
      </div>
      
      {step && totalSteps && (
        <div className="text-white/70 text-xs font-medium">
          {step}/{totalSteps}
        </div>
      )}
    </div>
  )
}