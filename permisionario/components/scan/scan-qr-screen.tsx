'use client'

import { useState } from 'react'

interface ScanQrScreenProps {
  onComplete: () => void
  onBack: () => void
}

const QR_DATA = {
  patente: 'MNO678',
  ubicacion: 'Caseros 400-500',
  duracion: '60 min',
  monto: 700,
  vehicleType: 'auto' as const,
  timestamp: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
}

export function ScanQrScreen({ onComplete, onBack }: ScanQrScreenProps) {
  const [step, setStep] = useState<'scanning' | 'confirming' | 'success'>('scanning')
  const [cashReceived, setCashReceived] = useState('')

  const handleScan = () => {
    setStep('confirming')
  }

  const handleConfirm = () => {
    setStep('success')
    setTimeout(() => {
      onComplete()
    }, 3000)
  }

  if (step === 'scanning') {
    return (
      <div className="flex flex-col min-h-screen bg-black">
        <div className="bg-[#004B9E] px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="text-white text-lg">←</button>
          <h1 className="text-white font-bold text-base">Escanear QR</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 space-y-6">
          <div className="relative w-64 h-64 border-4 border-white rounded-2xl">
            <div className="absolute inset-4 border-2 border-dashed border-white/40 rounded-xl flex items-center justify-center">
              <div className="w-48 h-48 bg-white/10 rounded-lg flex items-center justify-center">
                <p className="text-white/60 text-center text-sm">Apuntá la cámara<br />al código QR del conductor</p>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#009EE3] rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#009EE3] rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#009EE3] rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#009EE3] rounded-br-xl" />
          </div>

          <button
            onClick={handleScan}
            className="w-full max-w-xs bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl text-base shadow-lg transition-all"
          >
            Simular escaneo QR
          </button>

          <p className="text-white/50 text-xs text-center">
            El conductor muestra su QR en la app SEM Salta<br />y el permisionario lo escanea
          </p>
        </div>
      </div>
    )
  }

  if (step === 'confirming') {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <div className="bg-[#004B9E] px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="text-white text-lg">←</button>
          <h1 className="text-white font-bold text-base">Confirmar cobro</h1>
        </div>

        <div className="flex-1 px-6 py-6 space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 space-y-3 border-2 border-[#004B9E]/20">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{QR_DATA.vehicleType === 'auto' ? '🚗' : '🏍️'}</span>
              <div>
                <p className="font-black text-lg text-[#004B9E]">{QR_DATA.patente}</p>
                <p className="text-xs text-gray-600">{QR_DATA.ubicacion}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-2">
                <p className="text-[10px] text-gray-500">Duración</p>
                <p className="text-sm font-bold text-[#004B9E]">{QR_DATA.duracion}</p>
              </div>
              <div className="bg-white rounded-lg p-2">
                <p className="text-[10px] text-gray-500">Hora</p>
                <p className="text-sm font-bold text-[#004B9E]">{QR_DATA.timestamp}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#FF6B35]/10 rounded-xl p-4 text-center border-2 border-[#FF6B35]/30">
            <p className="text-xs text-gray-600">Monto a cobrar</p>
            <p className="text-4xl font-black text-[#FF6B35]">${QR_DATA.monto}</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#004B9E]">Monto recibido en efectivo</label>
            <input
              type="number"
              placeholder="$700"
              value={cashReceived}
              onChange={(e) => setCashReceived(e.target.value)}
              className="w-full py-3 px-4 border-2 border-[#004B9E]/30 rounded-lg focus:border-[#004B9E] focus:outline-none text-lg font-bold text-center"
            />
          </div>

          {cashReceived && Number(cashReceived) >= QR_DATA.monto && (
            <div className="bg-green-50 rounded-lg p-3 text-center border-2 border-green-200">
              <p className="text-xs text-green-600 font-medium">Cambio a entregar</p>
              <p className="text-xl font-black text-green-700">${Number(cashReceived) - QR_DATA.monto}</p>
            </div>
          )}

          <button
            onClick={handleConfirm}
            disabled={!cashReceived || Number(cashReceived) < QR_DATA.monto}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-base shadow-lg transition-all"
          >
            Confirmar cobro
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white items-center justify-center px-6">
      <div className="flex flex-col items-center space-y-4 bg-white rounded-3xl shadow-2xl px-10 py-8">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-50"></div>
          <div className="relative w-24 h-24 bg-[#22C55E] rounded-full flex items-center justify-center">
            <span className="text-5xl text-white">✓</span>
          </div>
        </div>
        <h1 className="text-2xl font-black text-[#009EE3]">¡Cobro registrado!</h1>
        <p className="text-gray-600 font-semibold">Ticket digital emitido al conductor</p>
        <p className="text-xs text-gray-400">{QR_DATA.patente} · ${QR_DATA.monto} · {QR_DATA.duracion}</p>
      </div>
    </div>
  )
}