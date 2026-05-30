'use client'

import { useState, useEffect } from 'react'
import {
  ZONE_COLORS,
  ZONE_LABELS,
  getCurrentShift,
  isHoliday,
  type ZoneOccupancy,
} from './sem-zones'

interface SemMapProps {
  onParkHere?: (streetName: string) => void
}

const SHIFT_INFO: Record<string, { label: string; hours: string; icon: string; color: string }> = {
  diurno: { label: 'Turno Diurno', hours: 'L-V 7–21 · S 7–14', icon: '☀️', color: 'bg-[#009EE3]' },
  nocturno: { label: 'Turno Nocturno', hours: '22–05 hs', icon: '🌙', color: 'bg-[#1E3A5F]' },
  ninguno: { label: 'Fuera de horario', hours: 'Sin cobro', icon: '⏸️', color: 'bg-gray-500' },
}

export function SemMap({ onParkHere }: SemMapProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showLegend, setShowLegend] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })

  const MIN_ZOOM = 1
  const MAX_ZOOM = 4
  const ZOOM_STEP = 0.5

  const handleZoomIn = () => setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM))
  const handleZoomOut = () => {
    setZoom((z) => {
      const newZoom = Math.max(z - ZOOM_STEP, MIN_ZOOM)
      if (newZoom <= MIN_ZOOM) {
        setPan({ x: 0, y: 0 })
      }
      return newZoom
    })
  }
  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1) return
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    setPanStart({ ...pan })
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y
    setPan({ x: panStart.x + dx, y: panStart.y + dy })
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const currentShift = getCurrentShift(currentTime)
  const holiday = isHoliday(currentTime)
  const isDiurnalHoliday = holiday && currentShift === 'diurno'
  const shift = SHIFT_INFO[currentShift] ?? SHIFT_INFO.ninguno

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col flex-1 bg-white">
      <div className="bg-[#004B9E] px-4 py-2 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#009EE3] flex items-center justify-center">
          <span className="text-white font-black text-xs">SEM</span>
        </div>
        <div>
          <p className="text-white font-bold text-sm">Mapa SEM</p>
          <p className="text-white/70 text-[10px]">Microcentro de Salta</p>
        </div>
      </div>

      {isDiurnalHoliday && (
        <div className="bg-red-600 text-white px-4 py-3 text-center text-sm font-bold flex items-center justify-center gap-2">
          <span>🚫</span>
          Cobro diurno no habilitado — Feriado
        </div>
      )}

      <div className={`${shift.color} px-4 py-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{shift.icon}</span>
            <div>
              <p className="text-white font-bold text-sm">{shift.label}</p>
              <p className="text-white/80 text-xs">{shift.hours}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-xs">{currentTime.toLocaleDateString('es-AR')}</p>
            <p className="text-white text-lg font-black">{formatTime(currentTime)}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-[#004B9E]" style={{ minHeight: '300px' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
        >
          <img
            src="/mapa.jpeg"
            alt="Mapa SEM Salta - Microcentro"
            className="max-w-full max-h-full object-contain select-none"
            draggable={false}
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            }}
          />
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={handleZoomIn}
            disabled={zoom >= MAX_ZOOM}
            className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-[#004B9E] font-black text-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            disabled={zoom <= MIN_ZOOM}
            className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-[#004B9E] font-black text-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            −
          </button>
          <button
            onClick={handleReset}
            className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-[#004B9E] font-bold text-[10px] hover:bg-gray-50 transition-all"
          >
            {`${Math.round(zoom * 100)}%`}
          </button>
        </div>
      </div>

      <div className="px-4 py-3 space-y-3">
        {showLegend && (
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-[#004B9E]">Leyenda</p>
              <button
                onClick={() => setShowLegend(false)}
                className="text-gray-400 hover:text-gray-600 text-xs"
              >
                Ocultar
              </button>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {(Object.keys(ZONE_COLORS) as ZoneOccupancy[]).map((key) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: ZONE_COLORS[key] }}
                  />
                  <p className="text-[11px] text-gray-700">{ZONE_LABELS[key]}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!showLegend && (
          <button
            onClick={() => setShowLegend(true)}
            className="w-full text-center text-xs text-[#004B9E] font-medium py-1"
          >
            Mostrar leyenda
          </button>
        )}
      </div>
    </div>
  )
}