export interface ActiveParking {
  id: string
  patente: string
  startTime: string
  endTime: string
  paymentMethod: 'digital' | 'efectivo'
  status: 'verificado' | 'pendiente'
  timeRemaining: string
  amount: number
  vehicleType: 'auto' | 'moto'
}

export interface CobroEntry {
  id: string
  time: string
  patente: string
  amount: number
  paymentMethod: 'digital' | 'efectivo'
  type: 'auto' | 'moto'
}

export interface Liquidacion {
  id: string
  period: string
  totalDigital: number
  totalEfectivo: number
  retencionMunicipal: number
  netoPermisionario: number
  status: 'pagada' | 'pendiente'
}

export const PERMISIONARIO_DATA = {
  nombre: 'María',
  apellido: 'González',
  legajo: 'PER-2847',
  cuadra: 'Caseros 400-500',
  zona: 'Microcentro',
  estado: 'Activo',
}

export const MOCK_ACTIVE_PARKINGS: ActiveParking[] = [
  { id: '1', patente: 'ABC123', startTime: '14:30', endTime: '15:30', paymentMethod: 'digital', status: 'verificado', timeRemaining: '23 min', amount: 700, vehicleType: 'auto' },
  { id: '2', patente: 'XYZ789', startTime: '14:15', endTime: '15:15', paymentMethod: 'efectivo', status: 'pendiente', timeRemaining: '8 min', amount: 300, vehicleType: 'moto' },
  { id: '3', patente: 'DEF456', startTime: '13:00', endTime: '15:00', paymentMethod: 'digital', status: 'verificado', timeRemaining: '38 min', amount: 1400, vehicleType: 'auto' },
  { id: '4', patente: 'GHI012', startTime: '14:45', endTime: '15:45', paymentMethod: 'efectivo', status: 'verificado', timeRemaining: '53 min', amount: 700, vehicleType: 'auto' },
  { id: '5', patente: 'JKL345', startTime: '13:30', endTime: '14:30', paymentMethod: 'digital', status: 'verificado', timeRemaining: '3 min', amount: 300, vehicleType: 'moto' },
]

export const MOCK_COBROS: CobroEntry[] = [
  { id: '1', time: '14:45', patente: 'GHI012', amount: 700, paymentMethod: 'efectivo', type: 'auto' },
  { id: '2', time: '14:30', patente: 'ABC123', amount: 700, paymentMethod: 'digital', type: 'auto' },
  { id: '3', time: '14:15', patente: 'XYZ789', amount: 300, paymentMethod: 'efectivo', type: 'moto' },
  { id: '4', time: '13:30', patente: 'JKL345', amount: 300, paymentMethod: 'digital', type: 'moto' },
  { id: '5', time: '13:00', patente: 'DEF456', amount: 1400, paymentMethod: 'digital', type: 'auto' },
  { id: '6', time: '12:30', patente: 'MNO678', amount: 700, paymentMethod: 'efectivo', type: 'auto' },
  { id: '7', time: '11:45', patente: 'PQR901', amount: 300, paymentMethod: 'efectivo', type: 'moto' },
  { id: '8', time: '11:00', patente: 'STU234', amount: 700, paymentMethod: 'digital', type: 'auto' },
  { id: '9', time: '10:15', patente: 'VWX567', amount: 700, paymentMethod: 'efectivo', type: 'auto' },
  { id: '10', time: '09:30', patente: 'YZA890', amount: 300, paymentMethod: 'digital', type: 'moto' },
]

export const MOCK_LIQUIDACIONES: Liquidacion[] = [
  { id: '1', period: '1-15 Mayo 2026', totalDigital: 8400, totalEfectivo: 5600, retencionMunicipal: 2800, netoPermisionario: 11200, status: 'pagada' },
  { id: '2', period: '16-31 Mayo 2026', totalDigital: 7200, totalEfectivo: 4800, retencionMunicipal: 2400, netoPermisionario: 9600, status: 'pendiente' },
  { id: '3', period: '1-15 Abril 2026', totalDigital: 9100, totalEfectivo: 6300, retencionMunicipal: 3080, netoPermisionario: 12320, status: 'pagada' },
]

export const MOCK_ALERTS = [
  { id: '1', type: 'expiring' as const, message: 'XYZ789 vence en 8 minutos', time: '14:52' },
  { id: '2', type: 'expiring' as const, message: 'JKL345 vence en 3 minutos', time: '14:27' },
  { id: '3', type: 'no_ticket' as const, message: 'Vehículo MNO999 sin ticket registrado', time: '13:40' },
]