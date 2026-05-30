'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { PageHeader } from '../onboarding/page-header'

interface PaymentConfirmationScreenProps {
  licensePlate: string
  location: string
  duration: number
  vehicleType: 'car' | 'motorcycle'
  paymentMethod: string
  amount: number
  ticketNumber: string
  onExtend?: () => void
  onReport?: () => void
}

export function PaymentConfirmationScreen({
  licensePlate,
  location,
  duration,
  vehicleType,
  paymentMethod,
  amount,
  ticketNumber,
  onExtend,
  onReport,
}: PaymentConfirmationScreenProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration * 60)
  const [expiryTime, setExpiryTime] = useState<string>('')
  const [showOverlay, setShowOverlay] = useState(true)

  useEffect(() => {
    setExpiryTime(new Date(Date.now() + duration * 60000).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }))

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) return 0
        return prev - 1
      })
    }, 1000)

    const overlayTimer = setTimeout(() => {
      setShowOverlay(false)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(overlayTimer)
    }
  }, [duration])

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <PageHeader />

      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-6 flex flex-col items-center space-y-3 mx-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-50"></div>
              <div className="relative w-20 h-20 bg-[#22C55E] rounded-full flex items-center justify-center">
                <span className="text-4xl text-white">✓</span>
              </div>
            </div>
            <h1 className="text-xl font-black text-[#004B9E]">¡Pago aprobado!</h1>
            <p className="text-sm text-gray-600 font-semibold text-center">Tu estacionamiento está activo</p>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col px-5 py-4 space-y-3">
        <div className="bg-green-50 rounded-xl p-4 space-y-3 border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-block bg-[#22C55E] text-white font-bold px-3 py-1 rounded-full text-xs">
                ACTIVO
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl">{vehicleType === 'car' ? '🚗' : '🏍️'}</span>
                <div>
                  <p className="font-bold text-[#004B9E] text-sm">{licensePlate}</p>
                  <p className="text-xs text-gray-500">{location}</p>
                </div>
              </div>
            </div>
            <div className="w-16 h-16 relative">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="45" fill="none" stroke="#22C55E" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - timeRemaining / (duration * 60))}`}
                  transform="rotate(-90 50 50)"
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
                <text x="50" y="50" textAnchor="middle" dy="0.3em" className="font-bold text-xs fill-[#004B9E]">
                  {Math.round((timeRemaining / (duration * 60)) * 100)}%
                </text>
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-green-200">
            <div className="bg-white rounded-lg p-2 text-center">
              <p className="text-xs text-gray-500">Tiempo restante</p>
              <p className="text-lg font-black text-[#004B9E]">{minutes}<span className="text-sm">m</span></p>
            </div>
            <div className="bg-white rounded-lg p-2 text-center">
              <p className="text-xs text-gray-500">Vence a las</p>
              <p className="text-lg font-black text-[#004B9E]">{expiryTime}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-gray-100 p-3 flex items-center gap-3">
          <div className="w-12 h-12 bg-[#004B9E] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-xl">🅿️</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">Ticket N°</p>
            <p className="font-bold text-[#004B9E]">{ticketNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Pago</p>
            {paymentMethod === 'mercadopago' ? (
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7b9fXCQLSSd9ng892qUqZiyDhyMN3C.png"
                alt="Mercado Pago"
                width={32}
                height={32}
                className="w-8 h-8 ml-auto"
              />
            ) : (
              <span className="text-xl">💳</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button onClick={onExtend} className="bg-white border-2 border-[#004B9E] rounded-xl py-3 flex flex-col items-center justify-center space-y-1 hover:bg-blue-50 transition-colors">
            <span className="text-2xl">🔄</span>
            <span className="text-xs font-bold text-[#004B9E]">Extender</span>
          </button>
          <button className="bg-white border-2 border-[#004B9E] rounded-xl py-3 flex flex-col items-center justify-center space-y-1 hover:bg-blue-50 transition-colors">
            <span className="text-2xl">🧾</span>
            <span className="text-xs font-bold text-[#004B9E]">Comprobante</span>
          </button>
          <button className="bg-white border-2 border-[#004B9E] rounded-xl py-3 flex flex-col items-center justify-center space-y-1 hover:bg-blue-50 transition-colors">
            <span className="text-2xl">⬇️</span>
            <span className="text-xs font-bold text-[#004B9E]">Ver recibo</span>
          </button>
          <button className="bg-white border-2 border-[#004B9E] rounded-xl py-3 flex flex-col items-center justify-center space-y-1 hover:bg-blue-50 transition-colors">
            <span className="text-2xl">📤</span>
            <span className="text-xs font-bold text-[#004B9E]">Compartir</span>
          </button>
        </div>

        <button onClick={onReport} className="w-full bg-red-50 rounded-xl p-3 flex items-center gap-2 text-left">
          <span className="text-lg">⚠️</span>
          <div className="flex-1">
            <p className="text-xs font-bold text-red-700">¿Tenés problemas?</p>
            <p className="text-xs text-red-600">Reportá una irregularidad</p>
          </div>
        </button>
      </div>
    </div>
  )
}