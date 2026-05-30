'use client'

import { useState } from 'react'
import { TARIFAS, FERIADOS, ZONAS } from '@/lib/data'

export function TarifasPanel() {
  const [tab, setTab] = useState<'tarifas' | 'horarios' | 'feriados'>('tarifas')

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Tarifas y configuración</h2>
        <p className="text-sm text-muted-foreground">Gestión de tarifas, horarios y feriados</p>
      </div>

      <div className="flex gap-1 bg-muted rounded-lg p-1">
        {(['tarifas', 'horarios', 'feriados'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${
              tab === t ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t === 'tarifas' ? 'Tarifas' : t === 'horarios' ? 'Horarios' : 'Feriados'}
          </button>
        ))}
      </div>

      {tab === 'tarifas' && (
        <div className="space-y-3">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 bg-muted px-3 py-2">
              <span className="text-xs font-bold">Vehículo</span>
              <span className="text-xs font-bold">Turno</span>
              <span className="text-xs font-bold">Precio/h</span>
              <span className="text-xs font-bold">Fracción</span>
            </div>
            {TARIFAS.map((tarifa) => (
              <div key={tarifa.id} className="grid grid-cols-4 px-3 py-2.5 border-t border-border items-center">
                <span className="text-xs font-medium">{tarifa.tipoVehiculo === 'auto' ? '🚗 Auto' : '🏍️ Moto'}</span>
                <span className="text-xs capitalize">{tarifa.turno}</span>
                <span className="text-xs font-bold">${tarifa.precioHora}</span>
                <span className="text-xs">{tarifa.fraccion} min</span>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <h4 className="font-bold text-sm">Editar tarifa</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Tipo vehículo</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background">
                  <option value="auto">Auto</option>
                  <option value="moto">Moto</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Turno</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background">
                  <option value="diurno">Diurno</option>
                  <option value="nocturno">Nocturno</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Precio por hora ($)</label>
                <input className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background" defaultValue="700" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Fracción (min)</label>
                <input className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background" defaultValue="15" />
              </div>
            </div>
            <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary/90">
              Guardar cambios
            </button>
          </div>
        </div>
      )}

      {tab === 'horarios' && (
        <div className="space-y-3">
          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <h4 className="font-bold text-sm">Turno diurno</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Lunes a Viernes</label>
                <div className="px-3 py-2 bg-muted rounded-lg text-sm font-medium">07:00 – 21:00</div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Sábados</label>
                <div className="px-3 py-2 bg-muted rounded-lg text-sm font-medium">07:00 – 14:00</div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800 font-medium">No se cobra turno diurno en feriados ni domingos</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <h4 className="font-bold text-sm">Turno nocturno</h4>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Todos los días</label>
              <div className="px-3 py-2 bg-muted rounded-lg text-sm font-medium">22:00 – 05:00</div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <h4 className="font-bold text-sm">Tolerancia</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Tolerancia inicial</label>
                <div className="px-3 py-2 bg-muted rounded-lg text-sm font-medium">5 minutos</div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Fracción después de 2da hora</label>
                <div className="px-3 py-2 bg-muted rounded-lg text-sm font-medium">15 minutos</div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-sm mb-3">Zonas habilitadas</h4>
            <div className="space-y-1.5">
              {ZONAS.map((zona) => (
                <div key={zona.id} className="flex items-center justify-between py-1.5">
                  <span className="text-xs font-medium">{zona.name}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-medium ${
                      zona.occupancy === 'disabled'
                        ? 'bg-red-100 text-red-700'
                        : zona.isNocturnal
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {zona.occupancy === 'disabled' ? 'Deshabilitada' : zona.isNocturnal ? 'Nocturna' : 'Habilitada'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'feriados' && (
        <div className="space-y-3">
          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <h4 className="font-bold text-sm">Agregar feriado</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Fecha</label>
                <input type="date" className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Nombre</label>
                <input className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background" placeholder="Nombre del feriado" />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Tipo</label>
              <select className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background">
                <option value="nacional">Nacional</option>
                <option value="provincial">Provincial</option>
                <option value="municipal">Municipal</option>
              </select>
            </div>
            <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary/90">
              Agregar feriado
            </button>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 bg-muted px-3 py-2">
              <span className="text-xs font-bold">Fecha</span>
              <span className="text-xs font-bold">Nombre</span>
              <span className="text-xs font-bold">Tipo</span>
            </div>
            {FERIADOS.map((feriado) => (
              <div key={feriado.id} className="grid grid-cols-3 px-3 py-2.5 border-t border-border items-center">
                <span className="text-xs font-medium">{feriado.fecha}</span>
                <span className="text-xs">{feriado.nombre}</span>
                <span className="text-xs capitalize">{feriado.tipo}</span>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800 font-medium">En los días feriados se desactiva automáticamente el cobro del turno diurno. El turno nocturno opera normalmente.</p>
          </div>
        </div>
      )}
    </div>
  )
}