'use client'

import { PERMISIONARIO_DATA } from '@/components/data'
import { useState } from 'react'

type Section = 'main' | 'notifications' | 'incidencia'

export function PerfilScreen() {
  const [section, setSection] = useState<Section>('main')
  const [notifications, setNotifications] = useState(true)
  const [incidenciaType, setIncidenciaType] = useState('')
  const [incidenciaDesc, setIncidenciaDesc] = useState('')

  if (section === 'notifications') {
    return (
      <div className="flex flex-col min-h-full bg-white">
        <div className="bg-[#004B9E] px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSection('main')} className="text-white text-lg">←</button>
          <h1 className="text-white font-bold text-base">Notificaciones</h1>
        </div>
        <div className="flex-1 px-6 py-4 space-y-3">
          <div className="bg-white rounded-xl border-2 border-gray-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔔</span>
              <div>
                <p className="font-bold text-[#004B9E] text-sm">Vencimientos</p>
                <p className="text-xs text-gray-500">Alerta cuando un vehículo está por vencer</p>
              </div>
            </div>
            <button onClick={() => setNotifications(!notifications)} className={`w-12 h-7 rounded-full transition-all relative ${notifications ? 'bg-[#009EE3]' : 'bg-gray-300'}`}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${notifications ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🚫</span>
              <div>
                <p className="font-bold text-[#004B9E] text-sm">Sin ticket</p>
                <p className="text-xs text-gray-500">Vehículos sin pago en la cuadra</p>
              </div>
            </div>
            <button className="w-12 h-7 rounded-full transition-all relative bg-[#009EE3]">
              <div className="w-5 h-5 bg-white rounded-full absolute top-1 right-1" />
            </button>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">💰</span>
              <div>
                <p className="font-bold text-[#004B9E] text-sm">Cobros digitales</p>
                <p className="text-xs text-gray-500">Notificar pagos digitales recibidos</p>
              </div>
            </div>
            <button className="w-12 h-7 rounded-full transition-all relative bg-[#009EE3]">
              <div className="w-5 h-5 bg-white rounded-full absolute top-1 right-1" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (section === 'incidencia') {
    return (
      <div className="flex flex-col min-h-full bg-white">
        <div className="bg-[#004B9E] px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSection('main')} className="text-white text-lg">←</button>
          <h1 className="text-white font-bold text-base">Reportar incidencia</h1>
        </div>
        <div className="flex-1 px-6 py-4 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#004B9E]">Tipo de incidencia</label>
            <select value={incidenciaType} onChange={(e) => setIncidenciaType(e.target.value)} className="w-full py-3 px-4 border-2 border-[#004B9E]/30 rounded-lg focus:border-[#004B9E] focus:outline-none text-sm">
              <option value="">Seleccionar...</option>
              <option value="abandonado">Vehículo abandonado</option>
              <option value="conflicto">Conflicto con conductor</option>
              <option value="duplicado">Cobro duplicado</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#004B9E]">Descripción</label>
            <textarea value={incidenciaDesc} onChange={(e) => setIncidenciaDesc(e.target.value)} placeholder="Contanos qué pasó..." className="w-full py-3 px-4 border-2 border-[#004B9E]/30 rounded-lg focus:border-[#004B9E] focus:outline-none text-sm min-h-[120px] resize-none" />
          </div>
          <button
            onClick={() => { setIncidenciaType(''); setIncidenciaDesc(''); setSection('main') }}
            disabled={!incidenciaType || !incidenciaDesc}
            className="w-full bg-[#FF6B35] hover:bg-[#FF5520] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-all"
          >
            Enviar reporte
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <div className="bg-gradient-to-b from-[#004B9E] to-[#003D7F] px-6 py-6 text-white text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-[#009EE3] mx-auto flex items-center justify-center text-2xl font-black border-3 border-white/30">
          {PERMISIONARIO_DATA.nombre[0]}{PERMISIONARIO_DATA.apellido[0]}
        </div>
        <h2 className="text-lg font-bold">{PERMISIONARIO_DATA.nombre} {PERMISIONARIO_DATA.apellido}</h2>
        <p className="text-white/70 text-xs">Legajo {PERMISIONARIO_DATA.legajo} · {PERMISIONARIO_DATA.cuadra}</p>
        <span className="inline-block bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">{PERMISIONARIO_DATA.estado}</span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-2">
        <button onClick={() => setSection('notifications')} className="w-full bg-white rounded-xl p-4 flex items-center gap-3 border-2 border-gray-100 hover:border-[#004B9E]/30 transition-all text-left">
          <span className="text-2xl">🔔</span>
          <div className="flex-1">
            <p className="font-bold text-[#004B9E] text-sm">Notificaciones</p>
            <p className="text-xs text-gray-500">Configurar alertas y avisos</p>
          </div>
          <span className="text-gray-300">›</span>
        </button>

        <button onClick={() => setSection('incidencia')} className="w-full bg-white rounded-xl p-4 flex items-center gap-3 border-2 border-gray-100 hover:border-[#004B9E]/30 transition-all text-left">
          <span className="text-2xl">⚠️</span>
          <div className="flex-1">
            <p className="font-bold text-[#004B9E] text-sm">Reportar incidencia</p>
            <p className="text-xs text-gray-500">Vehículos abandonados, conflictos, etc.</p>
          </div>
          <span className="text-gray-300">›</span>
        </button>

        <div className="bg-white rounded-xl p-4 border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <div className="flex-1">
              <p className="font-bold text-[#004B9E] text-sm">Datos del permisionario</p>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <p className="text-xs text-gray-500">Nombre</p>
              <p className="text-xs font-bold text-[#004B9E]">{PERMISIONARIO_DATA.nombre} {PERMISIONARIO_DATA.apellido}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-gray-500">Legajo</p>
              <p className="text-xs font-bold text-[#004B9E]">{PERMISIONARIO_DATA.legajo}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-gray-500">Cuadra asignada</p>
              <p className="text-xs font-bold text-[#004B9E]">{PERMISIONARIO_DATA.cuadra}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-gray-500">Zona</p>
              <p className="text-xs font-bold text-[#004B9E]">{PERMISIONARIO_DATA.zona}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-gray-500">Estado</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">{PERMISIONARIO_DATA.estado}</span>
            </div>
          </div>
        </div>

        <button className="w-full mt-4 bg-red-100 hover:bg-red-200 text-red-600 font-bold py-3 rounded-xl text-sm transition-all">
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}