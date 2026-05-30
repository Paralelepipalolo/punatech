'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '../onboarding/page-header'

interface ParkingSelectScreenProps {
  onNext: (data: any) => void
}

export interface ParkingSession {
  vehicle: string
  location: string
  address: string
  duration: number
  paymentMethod: string
  zoneStatus: 'enabled' | 'disabled' | 'off-hours'
  price: number
}

const VEHICLES = [
  { patente: 'ABC123', type: 'car', tariff: 700 },
  { patente: 'XYZ789', type: 'motorcycle', tariff: 300 }
]

const PAYMENT_METHODS = [
  { id: 'mercadopago', name: 'Mercado Pago', icon: '💳', color: '#009EE3', description: 'Crédito, débito y transferencia' },
  { id: 'otros', name: 'Otros medios digitales', icon: '🏦', color: '#8B5CF6', description: 'Débito y crédito' },
  { id: 'cash', name: 'Efectivo', icon: '💵', color: '#22C55E', description: 'Con permisionario de la cuadra', warning: true }
]

export function ParkingSelectScreen({ onNext }: ParkingSelectScreenProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<string>(VEHICLES[0].patente)
  const [selectedPayment, setSelectedPayment] = useState<string>('mercadopago')
  const [duration, setDuration] = useState<number>(60)
  
  const vehicle = VEHICLES.find(v => v.patente === selectedVehicle)
  const price = vehicle ? (vehicle.tariff * duration) / 60 : 0

  const isZoneEnabled = true
  const canProceed = isZoneEnabled && selectedVehicle && selectedPayment

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader />
      
      <div className="flex-1 flex flex-col px-5 py-4 space-y-4 overflow-y-auto pb-4">
        <div>
          <label className="text-sm font-bold text-[#004B9E] block mb-2">Selecciona vehículo</label>
          <div className="space-y-2">
            {VEHICLES.map((v) => (
              <button
                key={v.patente}
                onClick={() => setSelectedVehicle(v.patente)}
                className={`w-full p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  selectedVehicle === v.patente
                    ? 'bg-[#004B9E]/5 border-[#004B9E]'
                    : 'bg-white border-gray-200 hover:border-[#004B9E]/40'
                }`}
              >
                <span className="text-xl">{v.type === 'car' ? '🚗' : '🏍️'}</span>
                <div className="flex-1 text-left">
                  <p className="font-bold text-[#004B9E] text-sm">{v.patente}</p>
                  <p className="text-xs text-gray-500">${v.tariff}/h</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedVehicle === v.patente ? 'bg-[#004B9E] border-[#004B9E]' : 'border-gray-300'
                }`}>
                  {selectedVehicle === v.patente && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </button>
            ))}
            <button className="w-full p-3 border-2 border-dashed border-[#004B9E] text-[#004B9E] font-bold text-sm rounded-xl hover:bg-[#004B9E]/5 transition-all">
              + Agregar nueva patente
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-[#004B9E] block mb-2">Estás estacionando en:</label>
          <div className="bg-white rounded-xl p-4 border-2 border-[#004B9E] space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-xl">📍</span>
              <div className="flex-1">
                <p className="font-bold text-[#004B9E]">Caseros 400-500</p>
                <p className="text-xs text-gray-500">Microcentro · Salta Capital</p>
              </div>
              <button className="text-[#004B9E] hover:bg-blue-50 p-1.5 rounded-lg">✏️</button>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 rounded p-2 flex items-center gap-2">
              <span className="text-sm">✓</span>
              <p className="text-xs font-semibold text-green-700">Cobro habilitado ahora</p>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-[#004B9E] block mb-2">Selecciona la duración</label>
          <div className="bg-blue-50 rounded-xl p-4 border-2 border-[#004B9E]/10 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <button 
                onClick={() => {
                  if (duration <= 60) return
                  if (duration <= 120) setDuration(60)
                  else setDuration(duration - 15)
                }}
                disabled={duration <= 60}
                className="px-4 py-2 bg-white border-2 border-[#004B9E] text-[#004B9E] rounded-xl font-bold hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              >
                {duration <= 120 ? '−1h' : '−15'}
              </button>
              <div className="text-center flex-1">
                <p className="text-2xl font-black text-[#004B9E]">{Math.floor(duration / 60)}h {duration % 60}m</p>
                <p className="text-sm text-gray-600 font-semibold">${price.toFixed(2)}</p>
              </div>
              <button 
                onClick={() => setDuration(duration <= 60 ? 120 : duration + 15)}
                className="px-4 py-2 bg-white border-2 border-[#004B9E] text-[#004B9E] rounded-xl font-bold hover:bg-blue-50 text-sm"
              >
                {duration <= 60 ? '+1h' : '+15'}
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center">Mínimo 1 hora · Fraccionamiento de 15 minutos desde la 2da hora</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-[#004B9E] block mb-2">Elegí el medio de pago</label>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                  selectedPayment === method.id
                    ? 'bg-[#004B9E]/5 border-[#004B9E]'
                    : 'bg-white border-gray-200 hover:border-[#004B9E]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                    selectedPayment === method.id ? 'bg-white shadow-sm' : 'bg-gray-100'
                  }`}>
                    {method.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#004B9E] text-sm">{method.name}</p>
                    <p className="text-xs text-gray-500">{method.description}</p>
                    {method.warning && (
                      <p className="text-xs text-orange-600 font-semibold">⚠️ Registro digital obligatorio</p>
                    )}
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedPayment === method.id ? 'bg-[#004B9E] border-[#004B9E]' : 'border-gray-300'
                  }`}>
                    {selectedPayment === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl border-2 border-[#004B9E]/10 p-3 flex gap-2 text-sm text-[#004B9E]">
          <span className="text-base">🛡️</span>
          <p><span className="font-bold">Tu pago está protegido</span> y el estacionamiento es seguro.</p>
        </div>
      </div>

      <div className="px-5 pb-6">
        <Button
          onClick={() => onNext({
            selectedVehicle,
            location: 'Caseros 400-500',
            duration,
            paymentMethod: selectedPayment,
            amount: price,
          })}
          disabled={!canProceed}
          className="w-full bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl disabled:opacity-50"
        >
          Continuar al pago →
        </Button>
      </div>
    </div>
  )
}