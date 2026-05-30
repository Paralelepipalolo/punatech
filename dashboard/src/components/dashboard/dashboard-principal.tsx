'use client'

import { ALERTAS, ZONAS, TICKETS, PERMISIONARIOS } from '@/lib/data'

const HOURLY_DATA = [
  { hour: '7', monto: 2800 },
  { hour: '8', monto: 4200 },
  { hour: '9', monto: 5600 },
  { hour: '10', monto: 6100 },
  { hour: '11', monto: 5400 },
  { hour: '12', monto: 3800 },
  { hour: '13', monto: 4900 },
  { hour: '14', monto: 5200 },
  { hour: '15', monto: 4100 },
  { hour: '16', monto: 3600 },
  { hour: '17', monto: 2900 },
  { hour: '18', monto: 2100 },
  { hour: '19', monto: 1700 },
  { hour: '20', monto: 900 },
]

const WEEKLY_DATA = [
  { day: 'Lun', tickets: 145, recaudacion: 48500 },
  { day: 'Mar', tickets: 132, recaudacion: 44200 },
  { day: 'Mié', tickets: 158, recaudacion: 52100 },
  { day: 'Jue', tickets: 141, recaudacion: 46800 },
  { day: 'Vie', tickets: 167, recaudacion: 55300 },
  { day: 'Sáb', tickets: 98, recaudacion: 28700 },
]

export function DashboardPrincipal() {
  const totalRecaudacion = TICKETS.filter((t) => t.estado !== 'infraccion').reduce((sum, t) => sum + t.monto, 0)
  const ticketsActivos = TICKETS.filter((t) => t.estado === 'activo').length
  const cobrosDigitales = TICKETS.filter((t) => t.medioPago === 'digital').length
  const cobrosEfectivo = TICKETS.filter((t) => t.medioPago === 'efectivo').length
  const totalVehiculos = ZONAS.reduce((sum, z) => sum + z.vehiclesParked, 0)
  const permisionariosActivos = PERMISIONARIOS.filter((p) => p.activo).length
  const autos = TICKETS.filter((t) => t.tipoVehiculo === 'auto').length
  const motos = TICKETS.filter((t) => t.tipoVehiculo === 'moto').length
  const digitalPct = cobrosDigitales + cobrosEfectivo > 0 ? Math.round((cobrosDigitales / (cobrosDigitales + cobrosEfectivo)) * 100) : 0

  const maxHourly = Math.max(...HOURLY_DATA.map((d) => d.monto))
  const maxWeeklyTickets = Math.max(...WEEKLY_DATA.map((d) => d.tickets))
  const maxWeeklyRecaudacion = Math.max(...WEEKLY_DATA.map((d) => d.recaudacion))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Vista general del SEM en tiempo real</p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground">En vivo</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="Recaudación hoy" value={`$${totalRecaudacion.toLocaleString()}`} subtext="+12% vs ayer" color="primary" />
        <MetricCard label="Tickets activos" value={String(ticketsActivos)} subtext="5 pendientes" color="success" />
        <MetricCard label="Vehículos estacionados" value={String(totalVehiculos)} subtext="115 plazas totales" color="accent" />
        <MetricCard label="Permisionarios activos" value={`${permisionariosActivos}/${PERMISIONARIOS.length}`} subtext="2 sin asignar" color="primary" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MetricSmall label="Digital" value={`${cobrosDigitales}`} total={cobrosDigitales + cobrosEfectivo} color="#004B9E" />
        <MetricSmall label="Efectivo" value={`${cobrosEfectivo}`} total={cobrosDigitales + cobrosEfectivo} color="#FF6B35" />
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm">Recaudación por hora</h3>
          <span className="text-xs text-muted-foreground">Hoy</span>
        </div>
        <svg viewBox="0 0 350 170" className="w-full h-auto">
          {(() => {
            const padLeft = 40
            const padBottom = 20
            const padTop = 25
            const padRight = 10
            const chartW = 350 - padLeft - padRight
            const chartH = 170 - padBottom - padTop
            const barW = chartW / HOURLY_DATA.length
            const maxVal = Math.max(...HOURLY_DATA.map((d) => d.monto))
            const niceMax = Math.ceil(maxVal / 1000) * 1000

            const gridLines = [0, 0.25, 0.5, 0.75, 1].map((pct) => {
              const val = Math.round(niceMax * pct)
              const y = padTop + chartH * (1 - pct)
              return { val, y }
            })

            return (
              <>
                {gridLines.map((g) => (
                  <g key={g.val}>
                    <line x1={padLeft} y1={g.y} x2={padLeft + chartW} y2={g.y} stroke="currentColor" strokeOpacity={0.08} />
                    <text x={padLeft - 6} y={g.y + 4} textAnchor="end" className="fill-muted-foreground text-[9px]">
                      ${g.val >= 1000 ? `${g.val / 1000}k` : g.val}
                    </text>
                  </g>
                ))}
                {HOURLY_DATA.map((d, i) => {
                  const barH = (d.monto / niceMax) * chartH
                  const x = padLeft + i * barW + barW * 0.15
                  const y = padTop + chartH - barH
                  const w = barW * 0.7
                  return (
                    <g key={d.hour}>
                      <rect x={x} y={y} width={w} height={barH} rx={2} fill="#004B9E" className="hover:fill-[#003D7F] transition-colors cursor-pointer" />
                      <text x={x + w / 2} y={y - 5} textAnchor="middle" className="fill-foreground text-[8px] font-bold">
                        ${d.monto >= 1000 ? `${(d.monto / 1000).toFixed(1)}k` : d.monto}
                      </text>
                    </g>
                  )
                })}
                {HOURLY_DATA.map((d, i) => {
                  const x = padLeft + i * barW + barW / 2
                  return (
                    <text key={d.hour} x={x} y={padTop + chartH + 14} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                      {d.hour}
                    </text>
                  )
                })}
              </>
            )
          })()}
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm">Medio de pago</h3>
            <span className="text-xs font-medium text-[#004B9E]">{digitalPct}% digital</span>
          </div>
          <div className="flex items-center justify-center">
            <DonutChart
              segments={[
                { value: cobrosDigitales, color: '#004B9E', label: 'Digital' },
                { value: cobrosEfectivo, color: '#FF6B35', label: 'Efectivo' },
              ]}
              size={140}
              strokeWidth={28}
            />
          </div>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#004B9E]" />
              <span className="text-xs text-muted-foreground">Digital ({cobrosDigitales})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF6B35]" />
              <span className="text-xs text-muted-foreground">Efectivo ({cobrosEfectivo})</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm">Tipo de vehículo</h3>
          </div>
          <div className="flex items-center justify-center">
            <DonutChart
              segments={[
                { value: autos, color: '#004B9E', label: 'Auto' },
                { value: motos, color: '#22C55E', label: 'Moto' },
              ]}
              size={140}
              strokeWidth={28}
            />
          </div>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#004B9E]" />
              <span className="text-xs text-muted-foreground">Auto ({autos})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
              <span className="text-xs text-muted-foreground">Moto ({motos})</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm">Tendencia semanal</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#004B9E]" />
              <span className="text-[10px] text-muted-foreground">Tickets</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF6B35]" />
              <span className="text-[10px] text-muted-foreground">Recaudación</span>
            </div>
          </div>
        </div>
        <svg viewBox="0 0 320 120" className="w-full h-auto">
          {(() => {
            const padX = 10
            const padY = 10
            const w = 300
            const h = 100
            const lineTickets = WEEKLY_DATA.map((d, i) => ({
              x: padX + (i / (WEEKLY_DATA.length - 1)) * w,
              y: padY + h - (d.tickets / maxWeeklyTickets) * h,
            }))
            const lineRecaudacion = WEEKLY_DATA.map((d, i) => ({
              x: padX + (i / (WEEKLY_DATA.length - 1)) * w,
              y: padY + h - (d.recaudacion / maxWeeklyRecaudacion) * h,
            }))
            const linePath = (points: { x: number; y: number }[]) =>
              points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
            const areaPath = (points: { x: number; y: number }[]) =>
              `${linePath(points)} L ${points[points.length - 1].x} ${padY + h} L ${points[0].x} ${padY + h} Z`

            return (
              <>
                {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
                  <line key={pct} x1={padX} y1={padY + h * (1 - pct)} x2={padX + w} y2={padY + h * (1 - pct)} stroke="currentColor" strokeOpacity={0.06} />
                ))}
                <path d={areaPath(lineRecaudacion)} fill="#FF6B35" fillOpacity={0.08} />
                <path d={linePath(lineRecaudacion)} fill="none" stroke="#FF6B35" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                {lineRecaudacion.map((p, i) => (
                  <circle key={`r${i}`} cx={p.x} cy={p.y} r={3} fill="#FF6B35" />
                ))}
                <path d={areaPath(lineTickets)} fill="#004B9E" fillOpacity={0.08} />
                <path d={linePath(lineTickets)} fill="none" stroke="#004B9E" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                {lineTickets.map((p, i) => (
                  <circle key={`t${i}`} cx={p.x} cy={p.y} r={3} fill="#004B9E" />
                ))}
                {WEEKLY_DATA.map((d, i) => (
                  <text key={d.day} x={padX + (i / (WEEKLY_DATA.length - 1)) * w} y={padY + h + 12} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                    {d.day}
                  </text>
                ))}
              </>
            )
          })()}
        </svg>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="font-bold text-sm mb-3">Cobros por permisionario</h3>
        <div className="space-y-3">
          {PERMISIONARIOS.filter((p) => p.activo).sort((a, b) => b.cobrosHoy - a.cobrosHoy).map((p) => {
            const digitalPct = p.cobrosHoy > 0 ? Math.round((p.cobrosDigitales / p.cobrosHoy) * 100) : 0
            return (
              <div key={p.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{p.nombre} {p.apellido}</span>
                  <span className="text-xs text-muted-foreground">{p.cobrosHoy} cobros</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden bg-muted">
                  <div className="bg-[#004B9E]" style={{ width: `${digitalPct}%` }} />
                  <div className="bg-[#FF6B35]" style={{ width: `${100 - digitalPct}%` }} />
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-[#004B9E]">Digital: {p.cobrosDigitales}</span>
                  <span className="text-[10px] text-[#FF6B35]">Efectivo: {p.cobrosEfectivo}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="font-bold text-sm mb-3">Ocupación por cuadras</h3>
        <div className="space-y-2">
          {ZONAS.filter((z) => z.occupancy !== 'disabled').map((zona) => {
            const pct = Math.round((zona.vehiclesParked / zona.capacity) * 100)
            const color = zona.occupancy === 'low' ? '#22C55E' : zona.occupancy === 'high' ? '#FACC15' : '#1E3A5F'
            return (
              <div key={zona.id} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-xs font-medium">{zona.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{zona.vehiclesParked}/{zona.capacity}</span>
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(100, pct)}%`, backgroundColor: color }} />
                  </div>
                  <span className="text-xs font-medium w-8 text-right">{pct}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="font-bold text-sm mb-3">Estado de tickets</h3>
        <div className="grid grid-cols-3 gap-3">
          {(() => {
            const statuses = [
              { label: 'Activos', count: TICKETS.filter((t) => t.estado === 'activo').length, color: '#22C55E' },
              { label: 'Pendientes', count: TICKETS.filter((t) => t.estado === 'pendiente').length, color: '#FACC15' },
              { label: 'Finalizados', count: TICKETS.filter((t) => t.estado === 'finalizado').length, color: '#94A3B8' },
            ]
            return statuses.map((s) => (
              <div key={s.label} className="text-center">
                <div className="relative w-20 h-20 mx-auto">
                  <DonutChart
                    segments={[
                      { value: s.count, color: s.color, label: s.label },
                      { value: TICKETS.length - s.count, color: '#E5E7EB', label: '' },
                    ]}
                    size={80}
                    strokeWidth={16}
                  />
                </div>
                <p className="text-lg font-black mt-1">{s.count}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))
          })()}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="font-bold text-sm mb-3">Alertas recientes</h3>
        <div className="space-y-2">
          {ALERTAS.map((alerta) => (
            <div
              key={alerta.id}
              className={`flex items-start gap-2 p-2 rounded-lg border ${
                alerta.severidad === 'alta' ? 'bg-red-50 border-red-200' : alerta.severidad === 'media' ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${alerta.severidad === 'alta' ? 'bg-red-500' : alerta.severidad === 'media' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium">{alerta.mensaje}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{alerta.timestamp} · {alerta.tipo.replace(/_/g, ' ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="font-bold text-sm mb-3">Cobros en tiempo real</h3>
        <div className="space-y-2">
          {TICKETS.filter((t) => t.estado === 'activo' || t.estado === 'pendiente').slice(0, 5).map((ticket) => (
            <div key={ticket.id} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-xs">{ticket.tipoVehiculo === 'auto' ? '🚗' : '🏍️'}</span>
                <div>
                  <p className="text-xs font-medium">{ticket.patente}</p>
                  <p className="text-xs text-muted-foreground">{ticket.ubicacion}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold">${ticket.monto}</p>
                <span className={`text-xs px-1.5 py-0.5 rounded ${ticket.medioPago === 'digital' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {ticket.medioPago === 'digital' ? 'Digital' : 'Efectivo'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, subtext, color }: { label: string; value: string; subtext?: string; color: string }) {
  const textClass = color === 'primary' ? 'text-primary' : color === 'success' ? 'text-green-600' : color === 'accent' ? 'text-accent' : 'text-foreground'
  return (
    <div className="bg-card border border-border rounded-xl p-3">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-xl font-black ${textClass}`}>{value}</p>
      {subtext && <p className="text-[10px] text-muted-foreground mt-0.5">{subtext}</p>}
    </div>
  )
}

function MetricSmall({ label, value, total, color }: { label: string; value: string; total: number; color: string }) {
  const pct = total > 0 ? Math.round((Number(value) / total) * 100) : 0
  return (
    <div className="bg-card border border-border rounded-xl p-3">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-lg font-bold">{value}</p>
      <div className="w-full h-1.5 bg-muted rounded-full mt-1.5">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <p className="text-xs text-muted-foreground mt-1">{pct}% del total</p>
    </div>
  )
}

function DonutChart({ segments, size, strokeWidth }: { segments: { value: number; color: string; label: string }[]; size: number; strokeWidth: number }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0)
  if (total === 0) return <div style={{ width: size, height: size }} />
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((seg, i) => {
        const segLen = total > 0 ? (seg.value / total) * circumference : 0
        const el = (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${segLen} ${circumference - segLen}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        )
        offset += segLen
        return el
      })}
      <text x={size / 2} y={size / 2} textAnchor="middle" dy="0.35em" className="fill-foreground font-bold" fontSize={size * 0.14}>
        {total}
      </text>
    </svg>
  )
}