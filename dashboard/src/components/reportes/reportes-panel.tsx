'use client'

import { useState } from 'react'
import { TICKETS, PERMISIONARIOS, ZONAS } from '@/lib/data'

type ReportTab = 'recaudacion' | 'tickets' | 'auditoria'

export function ReportesPanel() {
  const [tab, setTab] = useState<ReportTab>('recaudacion')
  const [fechaDesde] = useState('2026-05-29')
  const [fechaHasta] = useState('2026-05-29')

  const totalRecaudacion = TICKETS.reduce((sum, t) => sum + t.monto, 0)
  const digitalTotal = TICKETS.filter((t) => t.medioPago === 'digital').reduce((sum, t) => sum + t.monto, 0)
  const efectivoTotal = TICKETS.filter((t) => t.medioPago === 'efectivo').reduce((sum, t) => sum + t.monto, 0)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Reportes y auditoría</h2>
        <p className="text-sm text-muted-foreground">Recaudación, trazabilidad y exportación</p>
      </div>

      <div className="flex gap-1 bg-muted rounded-lg p-1">
        {(['recaudacion', 'tickets', 'auditoria'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${
              tab === t ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t === 'recaudacion' ? 'Recaudación' : t === 'tickets' ? 'Tickets' : 'Auditoría'}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-xs text-muted-foreground block mb-1">Desde</label>
          <input type="date" defaultValue={fechaDesde} className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background" />
        </div>
        <div className="flex-1">
          <label className="text-xs text-muted-foreground block mb-1">Hasta</label>
          <input type="date" defaultValue={fechaHasta} className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background" />
        </div>
      </div>

      {tab === 'recaudacion' && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-lg font-black text-primary">${totalRecaudacion.toLocaleString()}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground">Digital</p>
              <p className="text-lg font-black text-green-600">${digitalTotal.toLocaleString()}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground">Efectivo</p>
              <p className="text-lg font-black text-accent">${efectivoTotal.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-sm mb-3">Recaudación por permisionario</h4>
            <div className="space-y-2">
              {PERMISIONARIOS.filter((p) => p.activo).map((p) => {
                const total = p.cobrosDigitales * 700 + p.cobrosEfectivo * 700
                return (
                  <div key={p.id} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                    <div>
                      <p className="text-xs font-medium">{p.nombre} {p.apellido}</p>
                      <p className="text-xs text-muted-foreground">{p.cuadra}</p>
                    </div>
                    <p className="text-sm font-bold">${total.toLocaleString()}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-sm mb-3">Recaudación por zona</h4>
            <div className="space-y-2">
              {ZONAS.filter((z) => z.occupancy !== 'disabled').map((zona) => {
                const zonaTickets = TICKETS.filter((t) => t.zonaId === zona.id)
                const zonaTotal = zonaTickets.reduce((sum, t) => sum + t.monto, 0)
                return (
                  <div key={zona.id} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                    <p className="text-xs font-medium">{zona.name}</p>
                    <p className="text-xs font-bold">${zonaTotal.toLocaleString()}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <button className="w-full py-3 border-2 border-primary text-primary rounded-xl font-bold text-sm hover:bg-primary/5">
            Exportar a Excel
          </button>
        </div>
      )}

      {tab === 'tickets' && (
        <div className="space-y-3">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-5 bg-muted px-3 py-2">
              <span className="text-xs font-bold">ID</span>
              <span className="text-xs font-bold">Patente</span>
              <span className="text-xs font-bold">Zona</span>
              <span className="text-xs font-bold">Monto</span>
              <span className="text-xs font-bold">Estado</span>
            </div>
            {TICKETS.map((ticket) => {
              const zona = ZONAS.find((z) => z.id === ticket.zonaId)
              return (
                <div key={ticket.id} className="grid grid-cols-5 px-3 py-2 border-t border-border items-center">
                  <span className="text-xs font-mono">{ticket.id}</span>
                  <span className="text-xs">{ticket.patente}</span>
                  <span className="text-xs">{zona?.name || ticket.zonaId}</span>
                  <span className="text-xs font-bold">${ticket.monto}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                      ticket.estado === 'activo'
                        ? 'bg-green-100 text-green-700'
                        : ticket.estado === 'pendiente'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {ticket.estado}
                  </span>
                </div>
              )
            })}
          </div>

          <button className="w-full py-3 border-2 border-primary text-primary rounded-xl font-bold text-sm hover:bg-primary/5">
            Exportar a Excel
          </button>
        </div>
      )}

      {tab === 'auditoria' && (
        <div className="space-y-3">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-5 bg-muted px-3 py-2">
              <span className="text-xs font-bold">Ticket</span>
              <span className="text-xs font-bold">Permisionario</span>
              <span className="text-xs font-bold">Medio</span>
              <span className="text-xs font-bold">Hora</span>
              <span className="text-xs font-bold">Monto</span>
            </div>
            {TICKETS.map((ticket) => {
              const perm = PERMISIONARIOS.find((p) => p.id === ticket.permisionarioId)
              return (
                <div key={ticket.id} className="grid grid-cols-5 px-3 py-2 border-t border-border items-center">
                  <span className="text-xs font-mono">{ticket.id}</span>
                  <span className="text-xs">{perm ? `${perm.nombre} ${perm.apellido}` : '—'}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                      ticket.medioPago === 'digital' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {ticket.medioPago}
                  </span>
                  <span className="text-xs">{new Date(ticket.timestamp).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="text-xs font-bold">${ticket.monto}</span>
                </div>
              )
            })}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800 font-medium">
              Cada ticket tiene registro completo: quién cobró, cuándo, dónde, monto y medio de pago.
              La trazabilidad total permite auditorías y control de cobros indebidos.
            </p>
          </div>

          <button className="w-full py-3 border-2 border-primary text-primary rounded-xl font-bold text-sm hover:bg-primary/5">
            Exportar a PDF
          </button>
        </div>
      )}
    </div>
  )
}