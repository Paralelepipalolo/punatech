'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { PageHeader } from '../onboarding/page-header'

interface PaymentReviewScreenProps {
  licensePlate: string
  location: string
  duration: number
  vehicleType: 'car' | 'motorcycle'
  paymentMethod: string
  amount: number
  onConfirm: () => void
  onBack: () => void
}

export function PaymentReviewScreen({
  licensePlate,
  location,
  duration,
  vehicleType,
  paymentMethod,
  amount,
  onConfirm,
  onBack,
}: PaymentReviewScreenProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const startTime = new Date()
  const endTime = new Date(startTime.getTime() + duration * 60000)
  const formattedStart = startTime.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
  const formattedEnd = endTime.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })

  const handleConfirm = async () => {
    setIsProcessing(true)
    setTimeout(() => {
      onConfirm()
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader />

      <div className="flex-1 flex flex-col px-5 py-4 space-y-3 overflow-y-auto pb-4">
        <div className="bg-white rounded-xl border-2 border-[#004B9E]/10 p-4 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="text-base">📍</span>
            <h3 className="font-bold text-[#004B9E] text-sm">Resumen</h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">{vehicleType === 'car' ? '🚗' : '🏍️'}</span>
                <span className="text-xs text-gray-600">Patente</span>
              </div>
              <span className="font-bold text-[#004B9E] text-sm">{licensePlate}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">📍 Ubicación</span>
              <span className="font-bold text-[#004B9E] text-sm">{location}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">⏱️ Duración</span>
              <div className="text-right">
                <span className="font-bold text-[#004B9E] text-sm">{duration} min</span>
                <p className="text-xs text-gray-400">{formattedStart} – {formattedEnd}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">🚙 Tipo</span>
              <span className="font-bold text-[#004B9E] text-sm">{vehicleType === 'car' ? 'Auto' : 'Moto'}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#FF6B35]/5 rounded-xl border-2 border-[#FF6B35]/20 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#004B9E]">Total a pagar</span>
            <span className="text-2xl font-black text-[#FF6B35]">${amount.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-[#004B9E]/10 p-4">
          <div className="flex items-center gap-3">
            {paymentMethod === 'mercadopago' ? (
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7b9fXCQLSSd9ng892qUqZiyDhyMN3C.png"
                alt="Mercado Pago"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            ) : (
              <span className="text-2xl">💳</span>
            )}
            <div className="flex-1">
              <p className="font-bold text-[#004B9E] text-sm">Pago con {paymentMethod === 'mercadopago' ? 'Mercado Pago' : 'Tarjeta'}</p>
              <p className="text-xs text-gray-500">Débito, crédito o transferencia</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-2">
          <span className="text-base">🛡️</span>
          <p className="text-xs font-semibold text-[#004B9E]">Tus datos y pagos están protegidos</p>
        </div>
      </div>

      <div className="px-5 pb-6 space-y-3">
        <Button
          onClick={handleConfirm}
          disabled={isProcessing}
          className="w-full bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Procesando...
            </>
          ) : (
            <>Pagar ${amount.toFixed(2)}</>
          )}
        </Button>

        <Button
          variant="outline"
          onClick={onBack}
          disabled={isProcessing}
          className="w-full border-2 border-[#004B9E] text-[#004B9E] py-4 rounded-xl font-bold hover:bg-blue-50"
        >
          ← Volver
        </Button>
      </div>
    </div>
  )
}