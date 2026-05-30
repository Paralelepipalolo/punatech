'use client'

import { PaymentReviewScreen } from '@/components/parking/payment-review-screen'
import { PaymentConfirmationScreen } from '@/components/parking/payment-confirmation-screen'
import { CashPaymentScreen } from '@/components/parking/cash-payment-screen'
import { useState } from 'react'

export default function Layer3Preview() {
  const [view, setView] = useState<'review' | 'confirmation' | 'cash'>('review')

  return (
    <div className="w-full min-h-screen">
      {view === 'review' && (
        <PaymentReviewScreen
          licensePlate="ABC123"
          location="Caseros 400-500"
          duration={60}
          vehicleType="car"
          paymentMethod="mercadopago"
          amount={700}
          onConfirm={() => setView('confirmation')}
          onBack={() => {}}
        />
      )}

      {view === 'confirmation' && (
        <PaymentConfirmationScreen
          licensePlate="ABC123"
          location="Caseros 400-500"
          duration={60}
          vehicleType="car"
          paymentMethod="mercadopago"
          amount={700}
          ticketNumber="SEM-00481"
          onExtend={() => alert('Extender tiempo')}
          onReport={() => alert('Reportar problema')}
        />
      )}

      {view === 'cash' && (
        <CashPaymentScreen
          licensePlate="ABC123"
          location="Caseros 400-500"
          duration={60}
          vehicleType="car"
          amount={700}
          onConfirm={() => setView('confirmation')}
          onBack={() => setView('review')}
        />
      )}

      {/* Navigation para demo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-2 justify-center flex-wrap">
        <button
          onClick={() => setView('review')}
          className={`px-4 py-2 rounded font-bold ${view === 'review' ? 'bg-[#004B9E] text-white' : 'bg-gray-200'}`}
        >
          Revisión
        </button>
        <button
          onClick={() => setView('confirmation')}
          className={`px-4 py-2 rounded font-bold ${view === 'confirmation' ? 'bg-[#004B9E] text-white' : 'bg-gray-200'}`}
        >
          Confirmación
        </button>
        <button
          onClick={() => setView('cash')}
          className={`px-4 py-2 rounded font-bold ${view === 'cash' ? 'bg-[#004B9E] text-white' : 'bg-gray-200'}`}
        >
          Efectivo
        </button>
      </div>
    </div>
  )
}
