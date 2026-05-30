'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '../onboarding/page-header'

interface CashPaymentScreenProps {
  licensePlate: string
  location: string
  duration: number
  vehicleType: 'car' | 'motorcycle'
  amount: number
  onConfirm: () => void
  onBack: () => void
}

export function CashPaymentScreen({
  licensePlate,
  location,
  duration,
  vehicleType,
  amount,
  onConfirm,
  onBack,
}: CashPaymentScreenProps) {
  const [qrRefreshTime, setQrRefreshTime] = useState(300)

  useEffect(() => {
    const interval = setInterval(() => {
      setQrRefreshTime((prev) => {
        if (prev <= 0) return 300
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const minutes = Math.floor(qrRefreshTime / 60)
  const seconds = qrRefreshTime % 60

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader />

      <div className="flex-1 flex flex-col px-5 py-4 space-y-3">
        <div className="flex flex-col items-center pt-2 pb-2">
          <div className="w-14 h-14 bg-[#FF6B35] rounded-full flex items-center justify-center mb-2">
            <span className="text-2xl">💵</span>
          </div>
          <h1 className="text-xl font-black text-[#004B9E] text-center">Pago en Efectivo</h1>
          <p className="text-xs text-gray-500 font-semibold text-center mt-1">Mostrá este código QR al permisionario</p>
        </div>

        <div className="bg-yellow-50 border-2 border-[#FF6B35]/30 rounded-xl p-3 flex items-start gap-2">
          <span className="text-lg flex-shrink-0">📍</span>
          <div>
            <p className="font-bold text-[#FF6B35] text-xs">Diríjase al permisionario de la cuadra</p>
            <p className="text-xs text-gray-600 mt-0.5">El permisionario confirmará el cobro en su aplicación.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-[#004B9E]/10 p-5 flex flex-col items-center space-y-3">
          <div className="bg-gray-100 rounded-lg p-3 w-full max-w-[200px]">
            <div className="aspect-square bg-gradient-to-br from-[#004B9E] to-[#009EE3] rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-8 gap-0 opacity-20">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="bg-white" style={{ opacity: Math.random() > 0.5 ? 1 : 0 }} />
                ))}
              </div>
              <div className="text-white text-center z-10">
                <p className="text-xs font-bold mb-1">Código QR</p>
                <p className="text-lg font-black font-mono">SEM-{licensePlate.replace(/\s/g, '')}</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs font-semibold text-gray-500">Se renueva en:</p>
            <p className="text-2xl font-black text-[#FF6B35]">{minutes}:{seconds.toString().padStart(2, '0')}</p>
            <p className="text-xs text-gray-400">Válido por 5 minutos</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-[#004B9E]/10 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Patente</span>
            <span className="font-bold text-[#004B9E] text-sm">{licensePlate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Ubicación</span>
            <span className="font-bold text-[#004B9E] text-sm">{location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Duración</span>
            <span className="font-bold text-[#004B9E] text-sm">{duration} min</span>
          </div>
          <div className="border-t border-gray-100 pt-2 flex items-center justify-between bg-[#FF6B35]/5 p-2 rounded-lg">
            <span className="text-sm font-bold text-gray-700">Total</span>
            <span className="text-xl font-black text-[#FF6B35]">${amount.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-3 flex items-start gap-2">
          <span className="text-base flex-shrink-0">ℹ️</span>
          <div>
            <p className="text-xs font-bold text-[#004B9E]">Estado: Pendiente de verificación</p>
            <p className="text-xs text-[#004B9E]/70">El permisionario debe confirmar el cobro para activar tu estacionamiento.</p>
          </div>
        </div>
      </div>

      <div className="px-5 pb-6 space-y-3">
        <Button
          onClick={onConfirm}
          className="w-full bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl"
        >
          El permisionario ya cobró
        </Button>

        <Button
          variant="outline"
          onClick={onBack}
          className="w-full border-2 border-[#004B9E] text-[#004B9E] py-4 rounded-xl font-bold hover:bg-blue-50"
        >
          ← Volver
        </Button>
      </div>
    </div>
  )
}