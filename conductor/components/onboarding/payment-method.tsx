'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { PageHeader } from './page-header'

interface PaymentMethodProps {
  onNext: () => void
  onBack: () => void
}

const PAYMENT_METHODS = [
  { id: 'mercadopago', name: 'Mercado Pago', icon: '💳', color: '#009EE3', description: 'Crédito, débito y transferencia' },
  { id: 'otros', name: 'Otros medios digitales', icon: '🏦', color: '#8B5CF6', description: 'Débito y crédito' },
  { id: 'cash', name: 'Efectivo', icon: '💵', color: '#22C55E', description: 'Con permisionario de la cuadra', warning: true }
]

export function PaymentMethod({ onNext, onBack }: PaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState('mercadopago')

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader step={3} totalSteps={3} />
      
      <div className="flex-1 flex flex-col px-5 py-6 space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-[#004B9E] mb-1">Medio de Pago</h2>
          <p className="text-sm text-gray-500">Elegí cómo vas a pagar</p>
        </div>

        <div className="space-y-2">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                selectedMethod === method.id
                  ? 'bg-[#004B9E]/5 border-[#004B9E]'
                  : 'bg-white border-gray-200 hover:border-[#004B9E]/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${
                  selectedMethod === method.id ? 'bg-white shadow-sm' : 'bg-gray-100'
                }`}>
                  {method.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#004B9E] text-sm">{method.name}</p>
                  <p className="text-xs text-gray-500 truncate">{method.description}</p>
                  {method.warning && (
                    <p className="text-xs text-orange-600 font-semibold mt-0.5">Registro digital obligatorio</p>
                  )}
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedMethod === method.id ? 'bg-[#004B9E] border-[#004B9E]' : 'border-gray-300'
                }`}>
                  {selectedMethod === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-6 space-y-3">
        <Button
          onClick={onNext}
          className="w-full bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl"
        >
          Siguiente
        </Button>

        <Button
          variant="outline"
          onClick={onBack}
          className="w-full border-2 border-[#004B9E] text-[#004B9E] py-4 rounded-xl font-bold hover:bg-blue-50"
        >
          Volver
        </Button>
      </div>
    </div>
  )
}