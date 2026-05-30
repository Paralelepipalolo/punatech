'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const TOUR_SLIDES = [
  { icon: '📍', title: 'Inicia Estacionamiento', description: 'Seleccioná tu ubicación en el mapa y elegí el vehículo.' },
  { icon: '⏱️', title: 'Selecciona Tiempo', description: 'Elegí la duración y el medio de pago digital.' },
  { icon: '✅', title: 'Paga y Controla', description: 'Recibí tu comprobante digital al instante.' },
]

export function OnboardingTour({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="px-5 py-4 flex items-center justify-between">
        <p className="text-xs font-bold text-[#004B9E]">{current + 1}/{TOUR_SLIDES.length}</p>
      </div>

      <div className="flex-1 flex flex-col px-5 py-4">
        <div className="bg-white rounded-xl shadow-lg p-5 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#004B9E]/10 flex items-center justify-center mx-auto">
            <span className="text-4xl">{TOUR_SLIDES[current].icon}</span>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-[#004B9E]">{TOUR_SLIDES[current].title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{TOUR_SLIDES[current].description}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {TOUR_SLIDES.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                i === current ? 'w-6 h-2 bg-[#004B9E]' : i < current ? 'w-2 h-2 bg-[#22C55E]' : 'w-2 h-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {TOUR_SLIDES.map((slide, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`p-2 rounded-lg text-center transition-all ${
                i === current ? 'bg-[#004B9E]/10 border-2 border-[#004B9E]' : 'bg-gray-50 border-2 border-transparent'
              }`}
            >
              <span className="text-lg block">{slide.icon}</span>
              <p className="text-xs font-semibold mt-1 text-[#004B9E]">{slide.title.split(' ')[0]}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-6 space-y-3">
        {current < TOUR_SLIDES.length - 1 ? (
          <Button
            onClick={() => setCurrent(current + 1)}
            className="w-full bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl"
          >
            Siguiente
          </Button>
        ) : (
          <Button
            onClick={onComplete}
            className="w-full bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl"
          >
            Comenzar
          </Button>
        )}
      </div>
    </div>
  )
}