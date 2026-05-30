'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface WelcomeScreenProps {
  onNext: () => void
  onGuest: () => void
}

export function WelcomeScreen({ onNext, onGuest }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#004B9E]">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-5">
        <div className="w-28 h-28 flex items-center justify-center bg-white rounded-full shadow-2xl">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-2Gkg9yfFwvpj436cyJD2M9I8I3GiKT.jpg"
            alt="SEM Salta Logo"
            width={120}
            height={120}
            className="w-24 h-24 object-contain"
          />
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-3xl font-black text-white">SEM Salta</h1>
          <p className="text-lg font-bold text-white/90">Estacionamiento Digital</p>
        </div>

        <div className="text-center space-y-2 text-white mt-2">
          <p className="text-sm leading-relaxed max-w-xs font-medium text-white/80">
            Estaciona fácil, paga rápido y controla tu tiempo desde tu celular
          </p>
        </div>
      </div>

      <div className="px-6 pb-8 space-y-3">
        <Button
          onClick={onNext}
          className="w-full bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl text-base"
        >
          Registrarme
        </Button>
        <button
          onClick={onGuest}
          className="w-full text-white/80 hover:text-white font-medium text-sm underline underline-offset-4 py-2"
        >
          Continuar como invitado
        </button>
        <p className="text-center text-white/50 text-xs">
          Sin registro, ingresá tu patente y estacioná al instante
        </p>
      </div>
    </div>
  )
}