'use client'

import { MOCK_ACTIVE_PARKINGS, MOCK_ALERTS, PERMISIONARIO_DATA } from '@/components/data'

interface MyBlockScreenProps {
  onScanQr: () => void
}

export function MyBlockScreen({ onScanQr }: MyBlockScreenProps) {
  const now = new Date()
  const shiftLabel = now.getHours() >= 7 && now.getHours() < 21 ? 'Turno Diurno' : now.getHours() >= 22 || now.getHours() < 5 ? 'Turno Nocturno' : 'Fuera de horario'
  const shiftHours = now.getHours() >= 7 && now.getHours() < 21 ? 'L-V 7–21 · S 7–14' : '22–05 hs'

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <div className="bg-gradient-to-r from-[#004B9E] to-[#009EE3] px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-lg">Hola, {PERMISIONARIO_DATA.nombre}</p>
            <p className="text-white/80 text-xs">{shiftLabel} · {shiftHours}</p>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-xs">{now.toLocaleDateString('es-AR')}</p>
            <p className="text-white text-lg font-black">{now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
        <div className="mt-3 bg-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
          <span className="text-sm">📍</span>
          <p className="text-white text-xs font-medium">{PERMISIONARIO_DATA.cuadra} · {PERMISIONARIO_DATA.zona}</p>
          <span className="ml-auto bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">ACTIVO</span>
        </div>
      </div>

      {MOCK_ALERTS.length > 0 && (
        <div className="px-4 py-2 space-y-1.5">
          {MOCK_ALERTS.map((alert) => (
            <div key={alert.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${alert.type === 'no_ticket' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
              <span>{alert.type === 'no_ticket' ? '🚫' : '⏰'}</span>
              <p className="flex-1">{alert.message}</p>
              <p className="text-[10px] opacity-60">{alert.time}</p>
            </div>
          ))}
        </div>
      )}

      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-[#004B9E]">Estacionamientos activos</h2>
          <span className="text-xs font-semibold text-[#009EE3]">{MOCK_ACTIVE_PARKINGS.length} vehículos</span>
        </div>

        <div className="space-y-2">
          {MOCK_ACTIVE_PARKINGS.map((parking) => (
            <div key={parking.id} className={`bg-white rounded-xl p-3 border-2 ${parking.timeRemaining === '3 min' ? 'border-red-300 bg-red-50/30' : 'border-gray-100'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{parking.vehicleType === 'auto' ? '🚗' : '🏍️'}</span>
                  <div>
                    <p className="font-bold text-[#004B9E] text-sm">{parking.patente}</p>
                    <p className="text-[10px] text-gray-500">{parking.startTime} – {parking.endTime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className={`text-xs font-bold ${parking.timeRemaining === '3 min' || parking.timeRemaining === '8 min' ? 'text-red-600' : 'text-[#004B9E]'}`}>
                      ⏱ {parking.timeRemaining}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${parking.paymentMethod === 'digital' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {parking.paymentMethod === 'digital' ? 'Digital' : 'Efectivo'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${parking.status === 'verificado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {parking.status === 'verificado' ? '✓ Verificado' : '⏳ Pendiente'}
                </span>
                <p className="text-xs font-bold text-[#FF6B35]">${parking.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3">
        <button
          onClick={onScanQr}
          className="w-full bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl text-base flex items-center justify-center gap-2 shadow-lg transition-all"
        >
          <span className="text-xl">📷</span>
          Escanear QR
        </button>
      </div>
    </div>
  )
}