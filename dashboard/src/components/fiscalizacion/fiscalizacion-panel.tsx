'use client'

import { useState } from 'react'

import { TICKETS, INFRACCIONES, ZONAS } from '@/lib/data'

export function FiscalizacionPanel() {
  const [view, setView] = useState<'search' | 'infraccion'>('search')
  const [searchPlate, setSearchPlate] = useState('')
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)

  const filteredTickets = TICKETS.filter(
    (t) => searchPlate === '' || t.patente.toLowerCase().includes(searchPlate.toLowerCase())
  )

  if (view === 'infraccion') {
    return (
      <div className="space-y-4">
        <button onClick={() => setView('search')} className="text-sm text-primary font-medium hover:underline">
          ← Volver a búsqueda
        </button>

        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <h3 className="font-bold text-sm">Generar infracción</h3>

          <div>
            <label className="text-xs text-muted-foreground block mb-1">Patente del vehículo</label>
            <input className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background" placeholder="AC 123 BC" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Ubicación</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background">
              <option>Seleccionar ubicación</option>
              {ZONAS.filter((z) => z.occupancy !== 'disabled').map((z) => (
                <option key={z.id} value={z.id}>{z.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Tipo de infracción</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background">
              <option value="sin_ticket">Sin ticket vigente</option>
              <option value="exceso_tiempo">Exceso de tiempo</option>
              <option value="zona_no_habilitada">Zona no habilitada</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Foto (opcional)</label>
            <div className="w-full h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-xs text-muted-foreground">
              Tocar para subir foto
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Observaciones</label>
            <textarea className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background" rows={2} placeholder="Notas adicionales..." />
          </div>

          <button className="w-full py-3 bg-destructive text-white rounded-xl font-bold text-sm hover:bg-red-600">
            Labrar infracción
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Fiscalización</h2>
        <p className="text-sm text-muted-foreground">Búsqueda de vehículos y generación de infracciones</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-3">
        <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-background">
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por patente..."
            value={searchPlate}
            onChange={(e) => setSearchPlate(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none"
          />
        </div>
      </div>

      {searchPlate && (
        <div className="bg-card border border-border rounded-xl p-4">
          <h4 className="font-bold text-sm mb-3">Resultados de búsqueda</h4>
          {filteredTickets.length > 0 ? (
            <div className="space-y-2">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium">{ticket.patente}</p>
                    <p className="text-xs text-muted-foreground">{ticket.ubicacion} · {ticket.duracion} min</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-medium ${
                        ticket.estado === 'activo'
                          ? 'bg-green-100 text-green-700'
                          : ticket.estado === 'pendiente'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {ticket.estado.charAt(0).toUpperCase() + ticket.estado.slice(1)}
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">${ticket.monto} · {ticket.medioPago}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No se encontraron tickets para esa patente</p>
          )}
        </div>
      )}

      <button
        onClick={() => setView('infraccion')}
        className="w-full py-3 bg-destructive text-white rounded-xl font-bold text-sm hover:bg-red-600"
      >
        + Generar infracción
      </button>

      <div className="bg-card border border-border rounded-xl p-4">
        <h4 className="font-bold text-sm mb-3">Infracciones recientes</h4>
        <div className="space-y-2">
          {INFRACCIONES.map((inf) => (
            <div key={inf.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium">{inf.patente}</p>
                <p className="text-xs text-muted-foreground">{inf.ubicacion}</p>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs px-2 py-0.5 rounded font-medium ${
                    inf.estado === 'confirmada'
                      ? 'bg-red-100 text-red-700'
                      : inf.estado === 'pendiente'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {inf.estado.charAt(0).toUpperCase() + inf.estado.slice(1)}
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">${inf.monto.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}