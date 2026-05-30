'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '../onboarding/page-header'

interface GuestScreenProps {
  onContinue: (plate: string, type: 'car' | 'motorcycle') => void
}

export function GuestScreen({ onContinue }: GuestScreenProps) {
  const [plate, setPlate] = useState('')
  const [vehicleType, setVehicleType] = useState<'car' | 'motorcycle'>('car')

  const canContinue = plate.trim().length >= 5

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader />

      <div className="flex-1 flex flex-col px-5 py-4 space-y-5">
        <div className="text-center space-y-2">
          <div className="text-4xl">👤</div>
          <h1 className="text-xl font-black text-[#004B9E]">Modo invitado</h1>
          <p className="text-sm text-gray-500">Ingresá tu patente y estacioná al instante, sin necesidad de registro</p>
        </div>

        <div className="bg-blue-50 rounded-xl border-2 border-[#004B9E]/10 p-3 flex gap-2 text-sm text-[#004B9E]">
          <span className="text-base">ℹ️</span>
          <p>En modo invitado no se guarda historial ni datos de pago. Podés registrarte en cualquier momento desde Perfil.</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-bold text-[#004B9E] block mb-2">Patente del vehículo</label>
            <input
              type="text"
              value={plate}
              onChange={(e) => setPlate(e.target.value.toUpperCase())}
              placeholder="Ej: ABC123 o AB 123 CD"
              className="w-full px-4 py-3 border-2 border-[#004B9E]/30 rounded-xl text-base font-bold text-center tracking-widest focus:border-[#004B9E] focus:outline-none"
              maxLength={10}
            />
          </div>

          <div>
            <label className="text-sm font-bold text-[#004B9E] block mb-2">Tipo de vehículo</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setVehicleType('car')}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  vehicleType === 'car'
                    ? 'bg-[#004B9E]/5 border-[#004B9E]'
                    : 'bg-white border-gray-200 hover:border-[#004B9E]/40'
                }`}
              >
                <span className="text-3xl">🚗</span>
                <span className="font-bold text-sm">Automóvil</span>
                <span className="text-xs text-gray-500">$700/h</span>
              </button>
              <button
                onClick={() => setVehicleType('motorcycle')}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  vehicleType === 'motorcycle'
                    ? 'bg-[#004B9E]/5 border-[#004B9E]'
                    : 'bg-white border-gray-200 hover:border-[#004B9E]/40'
                }`}
              >
                <span className="text-3xl">🏍️</span>
                <span className="font-bold text-sm">Motocicleta</span>
                <span className="text-xs text-gray-500">$300/h</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-6">
        <Button
          onClick={() => onContinue(plate.trim(), vehicleType)}
          disabled={!canContinue}
          className="w-full bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl disabled:opacity-40"
        >
          Estacionar como invitado
        </Button>
      </div>
    </div>
  )
}