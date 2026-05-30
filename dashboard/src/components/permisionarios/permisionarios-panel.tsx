'use client'

import { useState } from 'react'
import { PERMISIONARIOS, ZONAS } from '@/lib/data'

export function PermisionariosPanel() {
  const [view, setView] = useState<'list' | 'detail' | 'add'>('list')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selected = PERMISIONARIOS.find((p) => p.id === selectedId)

  if (view === 'detail' && selected) {
    return (
      <div className="space-y-4">
        <button onClick={() => { setView('list'); setSelectedId(null) }} className="text-sm text-primary font-medium hover:underline">
          ← Volver a lista
        </button>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
              {selected.nombre[0]}{selected.apellido[0]}
            </div>
            <div>
              <h3 className="font-bold">{selected.nombre} {selected.apellido}</h3>
              <p className="text-xs text-muted-foreground">Legajo: {selected.legajo}</p>
            </div>
            <span
              className={`ml-auto text-xs px-2 py-1 rounded-full font-medium ${
                selected.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {selected.activo ? 'Activo' : 'Inactivo'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <DetailField label="Cuadra asignada" value={selected.cuadra} />
            <DetailField label="Cobros hoy" value={String(selected.cobrosHoy)} />
            <DetailField label="Cobros digitales" value={String(selected.cobrosDigitales)} />
            <DetailField label="Cobros efectivo" value={String(selected.cobrosEfectivo)} />
            <DetailField label="Último cobro" value={selected.ultimoCobro} />
            <DetailField label="Ausencias" value={String(selected.ausencias)} />
            <DetailField label="Incidencias" value={String(selected.incidencias)} />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <h4 className="font-bold text-sm mb-3">Actividad de hoy</h4>
          <div className="space-y-2">
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-xs text-muted-foreground">Cobros digitales</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${(selected.cobrosDigitales / Math.max(selected.cobrosHoy, 1)) * 100}%` }} />
                </div>
                <span className="text-xs font-medium">{selected.cobrosDigitales}</span>
              </div>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-xs text-muted-foreground">Cobros efectivo</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${(selected.cobrosEfectivo / Math.max(selected.cobrosHoy, 1)) * 100}%` }} />
                </div>
                <span className="text-xs font-medium">{selected.cobrosEfectivo}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary/90">
            Editar permisionario
          </button>
          <button className="flex-1 py-3 border-2 border-destructive text-destructive rounded-xl font-bold text-sm hover:bg-red-50">
            {selected.activo ? 'Desactivar' : 'Reactivar'}
          </button>
        </div>
      </div>
    )
  }

  if (view === 'add') {
    return (
      <div className="space-y-4">
        <button onClick={() => setView('list')} className="text-sm text-primary font-medium hover:underline">
          ← Volver a lista
        </button>

        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <h3 className="font-bold text-sm">Nuevo permisionario</h3>

          <div>
            <label className="text-xs text-muted-foreground block mb-1">Nombre</label>
            <input className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background" placeholder="Nombre" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Apellido</label>
            <input className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background" placeholder="Apellido" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Legajo</label>
            <input className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background" placeholder="SEM-XXXX" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Cuadra asignada</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background">
              <option>Seleccionar cuadra</option>
              {ZONAS.filter((z) => z.occupancy !== 'disabled').map((z) => (
                <option key={z.id} value={z.id}>{z.name}</option>
              ))}
            </select>
          </div>

          <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary/90">
            Crear permisionario
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Permisionarios</h2>
          <p className="text-sm text-muted-foreground">Gestión y monitoreo de permisionarios</p>
        </div>
        <button
          onClick={() => setView('add')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/90"
        >
          + Nuevo
        </button>
      </div>

      <div className="space-y-2">
        {PERMISIONARIOS.map((p) => (
          <button
            key={p.id}
            onClick={() => { setSelectedId(p.id); setView('detail') }}
            className="w-full bg-card border border-border rounded-xl p-3 flex items-center gap-3 hover:border-primary/30 transition-colors text-left"
          >
            <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
              {p.nombre[0]}{p.apellido[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm">{p.nombre} {p.apellido}</p>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                    p.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {p.activo ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{p.legajo} · {p.cuadra}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold">{p.cobrosHoy}</p>
              <p className="text-xs text-muted-foreground">cobros</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted rounded-lg p-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}