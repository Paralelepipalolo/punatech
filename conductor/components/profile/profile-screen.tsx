'use client'

import { useState } from 'react'
import type { RegisterData } from '@/components/onboarding/register-form'
import type { Vehicle } from '@/components/onboarding/vehicle-registration'

type ProfileSection =
  | 'main'
  | 'edit-profile'
  | 'vehicles'
  | 'history'
  | 'ticket-detail'
  | 'payments'
  | 'benefits'
  | 'infractions'
  | 'claims'
  | 'new-claim'
  | 'settings'

type TicketStatus = 'pagado' | 'verificado' | 'expirado' | 'liberado'
type InfractionStatus = 'pendiente' | 'pagada' | 'en_reclamo'
type ClaimStatus = 'abierto' | 'en_proceso' | 'resuelto'


interface Ticket {
  id: string
  date: string
  licensePlate: string
  location: string
  duration: number
  amount: number
  status: TicketStatus
  paymentMethod: string
  ticketNumber: string
}

interface Infraction {
  id: string
  date: string
  type: string
  location: string
  amount: number
  status: InfractionStatus
  description: string
}

interface Claim {
  id: string
  date: string
  subject: string
  status: ClaimStatus
  description: string
  response?: string
}

const MOCK_TICKETS: Ticket[] = [
  { id: '1', date: '2026-05-28 14:30', licensePlate: 'ABC123', location: 'Caseros 400-500', duration: 60, amount: 700, status: 'pagado', paymentMethod: 'Mercado Pago', ticketNumber: 'SEM-48291' },
  { id: '2', date: '2026-05-27 09:15', licensePlate: 'ABC123', location: 'Florida 200-300', duration: 120, amount: 1400, status: 'verificado', paymentMethod: 'Mercado Pago', ticketNumber: 'SEM-48156' },
  { id: '3', date: '2026-05-25 18:45', licensePlate: 'XYZ789', location: 'Balcarce 100-200', duration: 75, amount: 225, status: 'expirado', paymentMethod: 'Efectivo', ticketNumber: 'SEM-47890' },
  { id: '4', date: '2026-05-24 10:00', licensePlate: 'ABC123', location: 'Belgrano 500-600', duration: 60, amount: 700, status: 'liberado', paymentMethod: 'Mercado Pago', ticketNumber: 'SEM-47654' },
  { id: '5', date: '2026-05-20 08:00', licensePlate: 'XYZ789', location: 'San Martín 200-300', duration: 90, amount: 270, status: 'pagado', paymentMethod: 'Tarjeta de Débito', ticketNumber: 'SEM-47321' },
]

const MOCK_INFRACTIONS: Infraction[] = [
  { id: 'INF-001', date: '2026-05-22', type: 'Estacionamiento sin pago', location: 'Caseros 300-400', amount: 3500, status: 'pendiente', description: 'Vehículo estacionado sin ticket vigente.' },
  { id: 'INF-002', date: '2026-05-10', type: 'Exceso de tiempo', location: 'Florida 100-200', amount: 2100, status: 'pagada', description: 'Tiempo de estacionamiento excedido en 45 minutos.' },
]

const MOCK_CLAIMS: Claim[] = [
  { id: 'REC-001', date: '2026-05-26', subject: 'Cobro incorrecto en Caseros', status: 'en_proceso', description: 'Me cobraron 2 horas cuando solo estacioné 1 hora.', response: 'Su reclamo está siendo revisado por el equipo de soporte.' },
  { id: 'REC-002', date: '2026-05-15', subject: 'QR no funcionó', status: 'resuelto', description: 'El permisionario no pudo escanear el código QR.', response: 'Se verificó un problema técnico temporal. Se acreditaron 50 puntos como compensación.' },
]

const STATUS_COLORS: Record<TicketStatus, { bg: string; text: string; label: string }> = {
  pagado: { bg: 'bg-green-100', text: 'text-green-700', label: 'Pagado' },
  verificado: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Verificado' },
  expirado: { bg: 'bg-red-100', text: 'text-red-700', label: 'Expirado' },
  liberado: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Liberado' },
}

const INFRACTION_STATUS_COLORS: Record<InfractionStatus, { bg: string; text: string; label: string }> = {
  pendiente: { bg: 'bg-red-100', text: 'text-red-700', label: 'Pendiente' },
  pagada: { bg: 'bg-green-100', text: 'text-green-700', label: 'Pagada' },
  en_reclamo: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'En reclamo' },
}

const CLAIM_STATUS_COLORS: Record<ClaimStatus, { bg: string; text: string; label: string }> = {
  abierto: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Abierto' },
  en_proceso: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'En proceso' },
  resuelto: { bg: 'bg-green-100', text: 'text-green-700', label: 'Resuelto' },
}



interface ProfileProps {
  registerData: RegisterData
  vehicles: Vehicle[]
}

export function Profile({ registerData, vehicles }: ProfileProps) {
  const [section, setSection] = useState<ProfileSection>('main')
  const [editName, setEditName] = useState(registerData.firstName)
  const [editLastName, setEditLastName] = useState(registerData.lastName)
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState(registerData.phone)
  const [vehicleList, setVehicleList] = useState<Vehicle[]>(vehicles)
  const [newPlate, setNewPlate] = useState('')
  const [newType, setNewType] = useState<'car' | 'motorcycle'>('car')
  const [filterDate, setFilterDate] = useState('')
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [claimSubject, setClaimSubject] = useState('')
  const [claimDescription, setClaimDescription] = useState('')

  const parkingPoints = 7
  const freeHoursAvailable = Math.floor(parkingPoints / 10)

  if (section === 'edit-profile') {
    return (
      <div className="flex flex-col min-h-full bg-white">
        <div className="bg-[#004B9E] px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSection('main')} className="text-white text-lg">←</button>
          <h1 className="text-white font-bold text-base">Editar Perfil</h1>
        </div>
        <div className="flex-1 px-6 py-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#004B9E]">Nombre</label>
            <input className="w-full py-3 px-4 border-2 border-[#004B9E]/30 rounded-lg focus:border-[#004B9E] focus:outline-none" value={editName} onChange={(e) => setEditName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#004B9E]">Apellido</label>
            <input className="w-full py-3 px-4 border-2 border-[#004B9E]/30 rounded-lg focus:border-[#004B9E] focus:outline-none" value={editLastName} onChange={(e) => setEditLastName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#004B9E]">Teléfono</label>
            <input className="w-full py-3 px-4 border-2 border-[#004B9E]/30 rounded-lg focus:border-[#004B9E] focus:outline-none" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#004B9E]">Email</label>
            <input className="w-full py-3 px-4 border-2 border-[#004B9E]/30 rounded-lg focus:border-[#004B9E] focus:outline-none" placeholder="tu@email.com" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#004B9E]">DNI</label>
            <input className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-500" value={registerData.dni} disabled />
          </div>
        </div>
        <div className="px-6 pb-8">
          <button onClick={() => setSection('main')} className="w-full bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl text-base">Guardar cambios</button>
        </div>
      </div>
    )
  }

  if (section === 'vehicles') {
    return (
      <div className="flex flex-col min-h-full bg-white">
        <div className="bg-[#004B9E] px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSection('main')} className="text-white text-lg">←</button>
          <h1 className="text-white font-bold text-base">Mis Vehículos</h1>
        </div>
        <div className="flex-1 px-6 py-6 space-y-4">
          {vehicleList.map((v) => (
            <div key={v.id} className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-[#004B9E]/20 flex items-center gap-3">
              <span className="text-3xl">{v.type === 'car' ? '🚗' : '🏍️'}</span>
              <div className="flex-1">
                <p className="font-bold text-[#004B9E] text-lg">{v.licensePlate || 'Sin patente'}</p>
                <p className="text-xs text-gray-600">{v.type === 'car' ? 'Automóvil' : 'Motocicleta'} · ${v.type === 'car' ? '700' : '300'}/h</p>
              </div>
              <button onClick={() => setVehicleList(vehicleList.filter((x) => x.id !== v.id))} className="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1 rounded-lg hover:bg-red-50">Eliminar</button>
            </div>
          ))}

          <div className="bg-white rounded-xl border-2 border-dashed border-[#004B9E] p-4 space-y-3">
            <p className="text-sm font-bold text-[#004B9E]">Agregar vehículo</p>
            <input className="w-full py-2 px-3 border-2 border-[#004B9E]/30 rounded-lg focus:border-[#004B9E] focus:outline-none text-sm" placeholder="Patente (ej: ABC123)" value={newPlate} onChange={(e) => setNewPlate(e.target.value.toUpperCase())} />
            <div className="flex gap-2">
              <button onClick={() => setNewType('car')} className={`flex-1 py-2 rounded-lg border-2 text-sm font-bold ${newType === 'car' ? 'bg-[#004B9E] text-white border-[#004B9E]' : 'bg-white text-[#004B9E] border-[#004B9E]/30'}`}>🚗 Auto</button>
              <button onClick={() => setNewType('motorcycle')} className={`flex-1 py-2 rounded-lg border-2 text-sm font-bold ${newType === 'motorcycle' ? 'bg-[#004B9E] text-white border-[#004B9E]' : 'bg-white text-[#004B9E] border-[#004B9E]/30'}`}>🏍️ Moto</button>
            </div>
            <button
              disabled={!newPlate.trim()}
              onClick={() => { setVehicleList([...vehicleList, { id: Math.random().toString(), licensePlate: newPlate, type: newType }]); setNewPlate('') }}
              className="w-full bg-[#FF6B35] hover:bg-[#FF5520] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-2 rounded-lg text-sm"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (section === 'history') {
    const filtered = filterDate ? MOCK_TICKETS.filter((t) => t.date.startsWith(filterDate)) : MOCK_TICKETS
    return (
      <div className="flex flex-col min-h-full bg-white">
        <div className="bg-[#004B9E] px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSection('main')} className="text-white text-lg">←</button>
          <h1 className="text-white font-bold text-base">Historial</h1>
        </div>
        <div className="px-6 py-4">
          <div className="flex items-center gap-2">
            <input type="date" className="flex-1 py-2 px-3 border-2 border-[#004B9E]/30 rounded-lg text-sm focus:border-[#004B9E] focus:outline-none" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
            {filterDate && <button onClick={() => setFilterDate('')} className="text-xs text-[#FF6B35] font-bold">Limpiar</button>}
          </div>
        </div>
        <div className="flex-1 px-6 space-y-3 pb-6">
          {filtered.length === 0 && <p className="text-center text-gray-400 py-8">No hay tickets para esta fecha</p>}
          {filtered.map((ticket) => {
            const sc = STATUS_COLORS[ticket.status]
            return (
              <button key={ticket.id} onClick={() => { setSelectedTicket(ticket); setSection('ticket-detail') }} className="w-full text-left bg-white rounded-xl border-2 border-gray-100 hover:border-[#004B9E]/40 p-4 transition-all shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-[#004B9E] text-sm">{ticket.licensePlate}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>{sc.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{ticket.location}</p>
                  <p className="text-xs text-gray-400">{ticket.date}</p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">{ticket.duration} min · {ticket.paymentMethod}</p>
                  <p className="font-bold text-[#FF6B35] text-sm">${ticket.amount}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (section === 'ticket-detail' && selectedTicket) {
    const sc = STATUS_COLORS[selectedTicket.status]
    return (
      <div className="flex flex-col min-h-full bg-white">
        <div className="bg-[#004B9E] px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSection('history')} className="text-white text-lg">←</button>
          <h1 className="text-white font-bold text-base">Detalle Ticket</h1>
        </div>
        <div className="flex-1 px-6 py-6 space-y-4">
          <div className="text-center space-y-1">
            <p className="text-3xl font-black text-[#004B9E]">{selectedTicket.ticketNumber}</p>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${sc.bg} ${sc.text}`}>{sc.label}</span>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 space-y-3 border-2 border-[#004B9E]/20">
            {[
              ['Patente', selectedTicket.licensePlate],
              ['Ubicación', selectedTicket.location],
              ['Fecha', selectedTicket.date],
              ['Duración', `${selectedTicket.duration} minutos`],
              ['Medio de pago', selectedTicket.paymentMethod],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <p className="text-xs text-gray-600">{label}</p>
                <p className="text-sm font-bold text-[#004B9E]">{value}</p>
              </div>
            ))}
          </div>
          <div className="text-center bg-[#FF6B35]/10 rounded-xl p-4 border-2 border-[#FF6B35]/30">
            <p className="text-xs text-gray-600">Monto total</p>
            <p className="text-3xl font-black text-[#FF6B35]">${selectedTicket.amount}</p>
          </div>
        </div>
      </div>
    )
  }

  if (section === 'payments') {
    return (
      <div className="flex flex-col min-h-full bg-white">
        <div className="bg-[#004B9E] px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSection('main')} className="text-white text-lg">←</button>
          <h1 className="text-white font-bold text-base">Medios de Pago</h1>
        </div>
        <div className="flex-1 px-6 py-6 space-y-4">
          <div className="bg-gradient-to-r from-[#009EE3]/10 to-[#009EE3]/20 rounded-xl p-4 border-2 border-[#009EE3]/30 flex items-center gap-3">
            <div className="w-12 h-12 bg-[#009EE3] rounded-xl flex items-center justify-center text-white text-xl">💳</div>
            <div className="flex-1">
              <p className="font-bold text-[#004B9E]">Mercado Pago</p>
              <p className="text-xs text-gray-500">Vinculado · juan****@gmail.com</p>
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-100 rounded-full px-2 py-0.5">Activo</span>
          </div>

          <div className="bg-white rounded-xl p-4 border-2 border-gray-100 flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl">💳</div>
            <div className="flex-1">
              <p className="font-bold text-[#004B9E]">Visa ···· 4532</p>
              <p className="text-xs text-gray-500">Tarjeta de crédito</p>
            </div>
            <button className="text-red-400 hover:text-red-600 text-xs font-bold">Eliminar</button>
          </div>

          <div className="bg-white rounded-xl p-4 border-2 border-gray-100 flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-xl">🏦</div>
            <div className="flex-1">
              <p className="font-bold text-[#004B9E]">Débito ···· 7891</p>
              <p className="text-xs text-gray-500">Cuenta bancaria</p>
            </div>
            <button className="text-red-400 hover:text-red-600 text-xs font-bold">Eliminar</button>
          </div>

          <button className="w-full border-2 border-dashed border-[#004B9E] rounded-xl p-4 text-[#004B9E] font-bold text-sm hover:bg-blue-50 transition-all">
            + Agregar medio de pago
          </button>
        </div>
      </div>
    )
  }

  if (section === 'benefits') {
    const pointsToNextFree = 10 - (parkingPoints % 10)
    return (
      <div className="flex flex-col min-h-full bg-white">
        <div className="bg-[#004B9E] px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSection('main')} className="text-white text-lg">←</button>
          <h1 className="text-white font-bold text-base">Programa de Beneficios</h1>
        </div>
        <div className="flex-1 px-5 py-4 space-y-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-[#004B9E] to-[#003D7F] rounded-xl p-5 text-center text-white space-y-2">
            <p className="text-4xl">🎯</p>
            <p className="text-sm font-semibold text-white/80">Puntos por estacionamiento</p>
            <p className="text-4xl font-black">{parkingPoints}</p>
            <p className="text-xs text-white/70">1 punto por cada estacionamiento finalizado</p>
            <div className="mt-2">
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-[#FF6B35] h-2 rounded-full" style={{ width: `${(parkingPoints % 10) / 10 * 100}%` }} />
              </div>
              <p className="text-xs text-white/70 mt-1">Te faltan {pointsToNextFree} puntos para tu próxima hora gratis</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200 flex items-center gap-3">
            <span className="text-2xl">🎁</span>
            <div>
              <p className="font-bold text-green-800 text-sm">Horas gratis disponibles: {freeHoursAvailable}</p>
              <p className="text-xs text-green-700">Cada 10 puntos = 1 hora gratis de estacionamiento</p>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-[#004B9E]">Cómo funciona</h2>
            <div className="bg-white rounded-xl border-2 border-[#004B9E]/10 p-3 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 bg-[#004B9E] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                <div>
                  <p className="text-sm font-bold text-[#004B9E]">Estacioná</p>
                  <p className="text-xs text-gray-500">Iniciá una sesión de estacionamiento desde la app</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 bg-[#004B9E] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                <div>
                  <p className="text-sm font-bold text-[#004B9E]">Finalizá</p>
                  <p className="text-xs text-gray-500">Al presionar "Finalizar estacionamiento" se suma 1 punto</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 bg-[#FF6B35] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                <div>
                  <p className="text-sm font-bold text-[#FF6B35]">¡Gracias!</p>
                  <p className="text-xs text-gray-500">Cada 10 puntos obtenés 1 hora gratis de estacionamiento</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-[#004B9E]">Premios</h2>
            <div className="bg-white rounded-xl border-2 border-[#004B9E]/10 p-3 flex items-center gap-3">
              <span className="text-2xl">🎫</span>
              <div className="flex-1">
                <p className="font-bold text-[#004B9E] text-sm">1 hora gratis</p>
                <p className="text-xs text-gray-500">Automóvil o motocicleta</p>
              </div>
              <span className="text-sm font-bold text-[#FF6B35]">10 pts</span>
            </div>
            <div className="bg-white rounded-xl border-2 border-[#004B9E]/10 p-3 flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              <div className="flex-1">
                <p className="font-bold text-[#004B9E] text-sm">2 horas gratis</p>
                <p className="text-xs text-gray-500">Automóvil o motocicleta</p>
              </div>
              <span className="text-sm font-bold text-[#FF6B35]">15 pts</span>
            </div>
            <div className="bg-white rounded-xl border-2 border-[#004B9E]/10 p-3 flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <div className="flex-1">
                <p className="font-bold text-[#004B9E] text-sm">3 horas gratis</p>
                <p className="text-xs text-gray-500">Automóvil o motocicleta</p>
              </div>
              <span className="text-sm font-bold text-[#FF6B35]">20 pts</span>
            </div>
            <div className="bg-white rounded-xl border-2 border-[#004B9E]/10 p-3 flex items-center gap-3">
              <span className="text-2xl">💎</span>
              <div className="flex-1">
                <p className="font-bold text-[#004B9E] text-sm">5 horas gratis</p>
                <p className="text-xs text-gray-500">Automóvil o motocicleta</p>
              </div>
              <span className="text-sm font-bold text-[#FF6B35]">30 pts</span>
            </div>
          </div>

          {freeHoursAvailable > 0 && (
            <button className="w-full bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl text-sm">
              Canjear {freeHoursAvailable} hora{freeHoursAvailable > 1 ? 's' : ''} gratis
            </button>
          )}

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-[#004B9E]">Historial de puntos</h2>
            <div className="space-y-2">
              <div className="bg-white rounded-xl border-2 border-[#004B9E]/10 p-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm">✅</div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#004B9E]">Estacionamiento finalizado</p>
                  <p className="text-xs text-gray-500">Caseros 400-500 · 28/05/2026</p>
                </div>
                <span className="text-sm font-bold text-green-600">+1 pt</span>
              </div>
              <div className="bg-white rounded-xl border-2 border-[#004B9E]/10 p-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm">✅</div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#004B9E]">Estacionamiento finalizado</p>
                  <p className="text-xs text-gray-500">Florida 200-300 · 27/05/2026</p>
                </div>
                <span className="text-sm font-bold text-green-600">+1 pt</span>
              </div>
              <div className="bg-white rounded-xl border-2 border-[#004B9E]/10 p-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm">🎁</div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#004B9E]">1 hora gratis canjeada</p>
                  <p className="text-xs text-gray-500">Belgrano 500-600 · 25/05/2026</p>
                </div>
                <span className="text-sm font-bold text-[#FF6B35]">-10 pts</span>
              </div>
              <div className="bg-white rounded-xl border-2 border-[#004B9E]/10 p-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm">✅</div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#004B9E]">Estacionamiento finalizado</p>
                  <p className="text-xs text-gray-500">Balcarce 100-200 · 24/05/2026</p>
                </div>
                <span className="text-sm font-bold text-green-600">+1 pt</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (section === 'infractions') {
    return (
      <div className="flex flex-col min-h-full bg-white">
        <div className="bg-[#004B9E] px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSection('main')} className="text-white text-lg">←</button>
          <h1 className="text-white font-bold text-base">Infracciones</h1>
        </div>
        <div className="flex-1 px-6 py-6 space-y-3">
          {MOCK_INFRACTIONS.length === 0 && <p className="text-center text-gray-400 py-8">No tenés infracciones registradas</p>}
          {MOCK_INFRACTIONS.map((inf) => {
            const sc = INFRACTION_STATUS_COLORS[inf.status]
            return (
              <div key={inf.id} className="bg-white rounded-xl border-2 border-gray-100 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[#004B9E] text-sm">{inf.type}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>{sc.label}</span>
                </div>
                <p className="text-xs text-gray-500">{inf.location} · {inf.date}</p>
                <p className="text-xs text-gray-600">{inf.description}</p>
                <div className="flex items-center justify-between pt-1">
                  <p className="text-lg font-black text-[#FF6B35]">${inf.amount}</p>
                  {inf.status === 'pendiente' && (
                    <button className="bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold text-xs py-2 px-4 rounded-lg">Pagar</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (section === 'claims') {
    return (
      <div className="flex flex-col min-h-full bg-white">
        <div className="bg-[#004B9E] px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSection('main')} className="text-white text-lg">←</button>
          <h1 className="text-white font-bold text-base">Reclamos</h1>
        </div>
        <div className="flex-1 px-6 py-6 space-y-3">
          <button onClick={() => setSection('new-claim')} className="w-full bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-3 rounded-xl text-sm">+ Nuevo reclamo</button>
          {MOCK_CLAIMS.map((claim) => {
            const sc = CLAIM_STATUS_COLORS[claim.status]
            return (
              <div key={claim.id} className="bg-white rounded-xl border-2 border-gray-100 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[#004B9E] text-sm">{claim.subject}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>{sc.label}</span>
                </div>
                <p className="text-xs text-gray-500">{claim.date} · {claim.id}</p>
                <p className="text-xs text-gray-600">{claim.description}</p>
                {claim.response && (
                  <div className="bg-green-50 rounded-lg p-2 border border-green-200">
                    <p className="text-[10px] text-green-700 font-bold">Respuesta:</p>
                    <p className="text-xs text-green-600">{claim.response}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (section === 'new-claim') {
    return (
      <div className="flex flex-col min-h-full bg-white">
        <div className="bg-[#004B9E] px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSection('claims')} className="text-white text-lg">←</button>
          <h1 className="text-white font-bold text-base">Nuevo Reclamo</h1>
        </div>
        <div className="flex-1 px-6 py-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#004B9E]">Asunto</label>
            <input className="w-full py-3 px-4 border-2 border-[#004B9E]/30 rounded-lg focus:border-[#004B9E] focus:outline-none text-sm" placeholder="Ej: Cobro incorrecto" value={claimSubject} onChange={(e) => setClaimSubject(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#004B9E]">Descripción del problema</label>
            <textarea className="w-full py-3 px-4 border-2 border-[#004B9E]/30 rounded-lg focus:border-[#004B9E] focus:outline-none text-sm min-h-[120px] resize-none" placeholder="Contanos qué pasó..." value={claimDescription} onChange={(e) => setClaimDescription(e.target.value)} />
          </div>
          <button
            disabled={!claimSubject.trim() || !claimDescription.trim()}
            onClick={() => { setClaimSubject(''); setClaimDescription(''); setSection('claims') }}
            className="w-full bg-[#FF6B35] hover:bg-[#FF5520] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm"
          >
            Enviar reclamo
          </button>
        </div>
      </div>
    )
  }

  if (section === 'settings') {
    return (
      <div className="flex flex-col min-h-full bg-white">
        <div className="bg-[#004B9E] px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSection('main')} className="text-white text-lg">←</button>
          <h1 className="text-white font-bold text-base">Configuración</h1>
        </div>
        <div className="flex-1 px-6 py-6 space-y-4">
          <div className="bg-white rounded-xl border-2 border-gray-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔔</span>
              <div>
                <p className="font-bold text-[#004B9E] text-sm">Notificaciones</p>
                <p className="text-xs text-gray-500">Alertas de estacionamiento</p>
              </div>
            </div>
            <button onClick={() => setNotifications(!notifications)} className={`w-12 h-7 rounded-full transition-all relative ${notifications ? 'bg-[#009EE3]' : 'bg-gray-300'}`}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${notifications ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🌙</span>
              <div>
                <p className="font-bold text-[#004B9E] text-sm">Modo oscuro</p>
                <p className="text-xs text-gray-500">Tema oscuro</p>
              </div>
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className={`w-12 h-7 rounded-full transition-all relative ${darkMode ? 'bg-[#009EE3]' : 'bg-gray-300'}`}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${darkMode ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-100 p-4 flex items-center gap-3">
            <span className="text-xl">🌐</span>
            <div className="flex-1">
              <p className="font-bold text-[#004B9E] text-sm">Idioma</p>
              <p className="text-xs text-gray-500">Español (Argentina)</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-100 p-4 flex items-center gap-3">
            <span className="text-xl">📱</span>
            <div className="flex-1">
              <p className="font-bold text-[#004B9E] text-sm">Datos de cuenta</p>
              <p className="text-xs text-gray-500">{registerData.phone}</p>
            </div>
          </div>

          <div className="mt-8">
            <button className="w-full bg-red-100 hover:bg-red-200 text-red-600 font-bold py-3 rounded-xl text-sm transition-all">Cerrar sesión</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <div className="bg-gradient-to-b from-[#004B9E] to-[#003D7F] px-6 py-8 text-white text-center space-y-2">
        <div className="w-20 h-20 rounded-full bg-[#009EE3] mx-auto flex items-center justify-center text-3xl font-black border-4 border-white/30">
          {registerData.firstName?.[0]}{registerData.lastName?.[0]}
        </div>
        <h2 className="text-xl font-bold">{registerData.firstName} {registerData.lastName}</h2>
        <p className="text-white/70 text-sm">{registerData.phone} · DNI ***{registerData.dni?.slice(-4)}</p>
      </div>

      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto">
        <button onClick={() => setSection('edit-profile')} className="w-full bg-white rounded-xl p-4 flex items-center gap-3 border-2 border-gray-100 hover:border-[#004B9E]/30 transition-all text-left">
          <span className="text-2xl">👤</span>
          <div className="flex-1">
            <p className="font-bold text-[#004B9E] text-sm">Datos del conductor</p>
            <p className="text-xs text-gray-500">{registerData.firstName} {registerData.lastName} · {registerData.dni}</p>
          </div>
          <span className="text-gray-300">›</span>
        </button>

        <button onClick={() => setSection('vehicles')} className="w-full bg-white rounded-xl p-4 flex items-center gap-3 border-2 border-gray-100 hover:border-[#004B9E]/30 transition-all text-left">
          <span className="text-2xl">🚗</span>
          <div className="flex-1">
            <p className="font-bold text-[#004B9E] text-sm">Mis vehículos</p>
            <p className="text-xs text-gray-500">{vehicleList.length} vehículo{vehicleList.length > 1 ? 's' : ''} registrado{vehicleList.length > 1 ? 's' : ''}</p>
          </div>
          <span className="text-gray-300">›</span>
        </button>

        <button onClick={() => setSection('history')} className="w-full bg-white rounded-xl p-4 flex items-center gap-3 border-2 border-gray-100 hover:border-[#004B9E]/30 transition-all text-left">
          <span className="text-2xl">📋</span>
          <div className="flex-1">
            <p className="font-bold text-[#004B9E] text-sm">Historial de estacionamiento</p>
            <p className="text-xs text-gray-500">{MOCK_TICKETS.length} tickets registrados</p>
          </div>
          <span className="text-gray-300">›</span>
        </button>

        <button onClick={() => setSection('payments')} className="w-full bg-white rounded-xl p-4 flex items-center gap-3 border-2 border-gray-100 hover:border-[#004B9E]/30 transition-all text-left">
          <span className="text-2xl">💳</span>
          <div className="flex-1">
            <p className="font-bold text-[#004B9E] text-sm">Medios de pago</p>
            <p className="text-xs text-gray-500">Mercado Pago · 2 tarjetas</p>
          </div>
          <span className="text-gray-300">›</span>
        </button>

        <button onClick={() => setSection('benefits')} className="w-full bg-white rounded-xl p-4 flex items-center gap-3 border-2 border-gray-100 hover:border-[#004B9E]/30 transition-all text-left">
          <span className="text-2xl">⭐</span>
          <div className="flex-1">
            <p className="font-bold text-[#004B9E] text-sm">Programa de beneficios</p>
            <p className="text-xs text-gray-500">{parkingPoints} pts · {freeHoursAvailable} hora{freeHoursAvailable !== 1 ? 's' : ''} gratis</p>
          </div>
          <span className="text-gray-300">›</span>
        </button>

        <button onClick={() => setSection('infractions')} className="w-full bg-white rounded-xl p-4 flex items-center gap-3 border-2 border-gray-100 hover:border-[#004B9E]/30 transition-all text-left">
          <span className="text-2xl">⚠️</span>
          <div className="flex-1">
            <p className="font-bold text-[#004B9E] text-sm">Infracciones</p>
            <p className="text-xs text-gray-500">{MOCK_INFRACTIONS.filter((i) => i.status === 'pendiente').length} pendiente{MOCK_INFRACTIONS.filter((i) => i.status === 'pendiente').length !== 1 ? 's' : ''}</p>
          </div>
          <span className="text-gray-300">›</span>
        </button>

        <button onClick={() => setSection('claims')} className="w-full bg-white rounded-xl p-4 flex items-center gap-3 border-2 border-gray-100 hover:border-[#004B9E]/30 transition-all text-left">
          <span className="text-2xl">📢</span>
          <div className="flex-1">
            <p className="font-bold text-[#004B9E] text-sm">Reclamos</p>
            <p className="text-xs text-gray-500">{MOCK_CLAIMS.length} reclamo{MOCK_CLAIMS.length > 1 ? 's' : ''}</p>
          </div>
          <span className="text-gray-300">›</span>
        </button>

        <button onClick={() => setSection('settings')} className="w-full bg-white rounded-xl p-4 flex items-center gap-3 border-2 border-gray-100 hover:border-[#004B9E]/30 transition-all text-left">
          <span className="text-2xl">⚙️</span>
          <div className="flex-1">
            <p className="font-bold text-[#004B9E] text-sm">Configuración</p>
            <p className="text-xs text-gray-500">Notificaciones, idioma, cuenta</p>
          </div>
          <span className="text-gray-300">›</span>
        </button>
      </div>
    </div>
  )
}