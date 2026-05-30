export type ZoneOccupancy = 'low' | 'high' | 'disabled' | 'nocturnal'

export interface SemZone {
  id: string
  name: string
  street: string
  occupancy: ZoneOccupancy
  tariff: number
  isNocturnal: boolean
  vehiclesParked: number
  capacity: number
  permisionarioId: string | null
}

export interface Permisionario {
  id: string
  nombre: string
  apellido: string
  legajo: string
  cuadra: string
  zonaId: string
  activo: boolean
  cobrosHoy: number
  cobrosDigitales: number
  cobrosEfectivo: number
  ultimoCobro: string
  ausencias: number
  incidencias: number
}

export interface Ticket {
  id: string
  patente: string
  ubicacion: string
  zonaId: string
  tipoVehiculo: 'auto' | 'moto'
  duracion: number
  monto: number
  medioPago: 'digital' | 'efectivo'
  estado: 'activo' | 'finalizado' | 'pendiente' | 'infraccion'
  permisionarioId: string
  timestamp: string
}

export interface Alerta {
  id: string
  tipo: 'cobro_indebido' | 'sin_permisionario' | 'exceso_tiempo' | 'infraccion'
  mensaje: string
  zonaId?: string
  permisionarioId?: string
  patente?: string
  timestamp: string
  severidad: 'alta' | 'media' | 'baja'
}

export interface Tarifa {
  id: string
  tipoVehiculo: 'auto' | 'moto'
  turno: 'diurno' | 'nocturno'
  precioHora: number
  tolerancia: number
  fraccion: number
}

export interface Feriado {
  id: string
  fecha: string
  nombre: string
  tipo: 'nacional' | 'provincial' | 'municipal'
}

export interface Infraccion {
  id: string
  patente: string
  inspectorId: string
  ubicacion: string
  tipo: 'sin_ticket' | 'exceso_tiempo' | 'zona_no_habilitada'
  estado: 'pendiente' | 'confirmada' | 'apelada'
  fecha: string
  monto: number
  foto?: string
}

export const ZONAS: SemZone[] = [
  { id: 'caseros-400', name: 'Caseros 400-500', street: 'Caseros', occupancy: 'low', tariff: 700, isNocturnal: false, vehiclesParked: 12, capacity: 30, permisionarioId: 'P001' },
  { id: 'caseros-600', name: 'Caseros 600-700', street: 'Caseros', occupancy: 'high', tariff: 700, isNocturnal: false, vehiclesParked: 24, capacity: 28, permisionarioId: 'P001' },
  { id: 'calle-florida-200', name: 'Florida 200-300', street: 'Florida', occupancy: 'low', tariff: 700, isNocturnal: false, vehiclesParked: 8, capacity: 22, permisionarioId: 'P002' },
  { id: 'paseo-balcarce', name: 'Paseo Balcarce', street: 'Balcarce', occupancy: 'nocturnal', tariff: 700, isNocturnal: true, vehiclesParked: 15, capacity: 40, permisionarioId: 'P003' },
  { id: 'paseo-guemes', name: 'Paseo Güemes', street: 'Güemes', occupancy: 'nocturnal', tariff: 700, isNocturnal: true, vehiclesParked: 18, capacity: 35, permisionarioId: 'P003' },
  { id: 'plaza-alvarado', name: 'Plaza Alvarado', street: 'Alvarado', occupancy: 'nocturnal', tariff: 700, isNocturnal: true, vehiclesParked: 10, capacity: 25, permisionarioId: 'P004' },
  { id: 'mitre-300', name: 'Mitre 300-400', street: 'Mitre', occupancy: 'disabled', tariff: 0, isNocturnal: false, vehiclesParked: 0, capacity: 20, permisionarioId: null },
  { id: 'espana-100', name: 'España 100-200', street: 'España', occupancy: 'low', tariff: 700, isNocturnal: false, vehiclesParked: 6, capacity: 18, permisionarioId: 'P005' },
  { id: 'belgrano-500', name: 'Belgrano 500-600', street: 'Belgrano', occupancy: 'high', tariff: 700, isNocturnal: false, vehiclesParked: 19, capacity: 22, permisionarioId: 'P005' },
  { id: 'san-martin-200', name: 'San Martín 200-300', street: 'San Martín', occupancy: 'low', tariff: 300, isNocturnal: false, vehiclesParked: 3, capacity: 15, permisionarioId: 'P006' },
  { id: 'rivadavia-100', name: 'Rivadavia 100-200', street: 'Rivadavia', occupancy: 'disabled', tariff: 0, isNocturnal: false, vehiclesParked: 0, capacity: 16, permisionarioId: null },
  { id: 'laprida-100', name: 'Laprida 100-200', street: 'Laprida', occupancy: 'disabled', tariff: 0, isNocturnal: false, vehiclesParked: 0, capacity: 12, permisionarioId: null },
]

export const PERMISIONARIOS: Permisionario[] = [
  { id: 'P001', nombre: 'José', apellido: 'Mendoza', legajo: 'SEM-1042', cuadra: 'Caseros 400-700', zonaId: 'caseros-400', activo: true, cobrosHoy: 38, cobrosDigitales: 22, cobrosEfectivo: 16, ultimoCobro: '14:32', ausencias: 1, incidencias: 0 },
  { id: 'P002', nombre: 'María', apellido: 'Gutiérrez', legajo: 'SEM-1087', cuadra: 'Florida 200-300', zonaId: 'calle-florida-200', activo: true, cobrosHoy: 25, cobrosDigitales: 18, cobrosEfectivo: 7, ultimoCobro: '14:28', ausencias: 0, incidencias: 1 },
  { id: 'P003', nombre: 'Carlos', apellido: 'Vera', legajo: 'SEM-1120', cuadra: 'Paseo Balcarce / Güemes', zonaId: 'paseo-balcarce', activo: true, cobrosHoy: 42, cobrosDigitales: 30, cobrosEfectivo: 12, ultimoCobro: '14:35', ausencias: 2, incidencias: 0 },
  { id: 'P004', nombre: 'Ana', apellido: 'Ruiz', legajo: 'SEM-1155', cuadra: 'Plaza Alvarado', zonaId: 'plaza-alvarado', activo: true, cobrosHoy: 18, cobrosDigitales: 12, cobrosEfectivo: 6, ultimoCobro: '14:20', ausencias: 0, incidencias: 0 },
  { id: 'P005', nombre: 'Luis', apellido: 'Fernández', legajo: 'SEM-1198', cuadra: 'España / Belgrano', zonaId: 'espana-100', activo: true, cobrosHoy: 31, cobrosDigitales: 20, cobrosEfectivo: 11, ultimoCobro: '14:30', ausencias: 3, incidencias: 2 },
  { id: 'P006', nombre: 'Patricia', apellido: 'Torres', legajo: 'SEM-1230', cuadra: 'San Martín 200-300', zonaId: 'san-martin-200', activo: false, cobrosHoy: 0, cobrosDigitales: 0, cobrosEfectivo: 0, ultimoCobro: '—', ausencias: 5, incidencias: 1 },
  { id: 'P007', nombre: 'Roberto', apellido: 'Díaz', legajo: 'SEM-1265', cuadra: 'Sin asignar', zonaId: '', activo: false, cobrosHoy: 0, cobrosDigitales: 0, cobrosEfectivo: 0, ultimoCobro: '—', ausencias: 0, incidencias: 0 },
]

export const TICKETS: Ticket[] = [
  { id: 'T-001428', patente: 'AC 123 BC', ubicacion: 'Caseros 450', zonaId: 'caseros-400', tipoVehiculo: 'auto', duracion: 60, monto: 700, medioPago: 'digital', estado: 'activo', permisionarioId: 'P001', timestamp: '2026-05-29T13:45:00' },
  { id: 'T-001429', patente: 'AC 456 DE', ubicacion: 'Caseros 620', zonaId: 'caseros-600', tipoVehiculo: 'auto', duracion: 120, monto: 1400, medioPago: 'digital', estado: 'activo', permisionarioId: 'P001', timestamp: '2026-05-29T13:15:00' },
  { id: 'T-001430', patente: 'M 789 FG', ubicacion: 'San Martín 250', zonaId: 'san-martin-200', tipoVehiculo: 'moto', duracion: 60, monto: 300, medioPago: 'efectivo', estado: 'pendiente', permisionarioId: 'P006', timestamp: '2026-05-29T14:00:00' },
  { id: 'T-001431', patente: 'AC 789 JK', ubicacion: 'Balcarce 150', zonaId: 'paseo-balcarce', tipoVehiculo: 'auto', duracion: 60, monto: 700, medioPago: 'efectivo', estado: 'activo', permisionarioId: 'P003', timestamp: '2026-05-29T13:30:00' },
  { id: 'T-001432', patente: 'AC 234 LM', ubicacion: 'Belgrano 550', zonaId: 'belgrano-500', tipoVehiculo: 'auto', duracion: 135, monto: 1575, medioPago: 'digital', estado: 'activo', permisionarioId: 'P005', timestamp: '2026-05-29T12:00:00' },
  { id: 'T-001433', patente: 'M 345 NO', ubicacion: 'Florida 280', zonaId: 'calle-florida-200', tipoVehiculo: 'moto', duracion: 60, monto: 300, medioPago: 'digital', estado: 'finalizado', permisionarioId: 'P002', timestamp: '2026-05-29T10:00:00' },
  { id: 'T-001434', patente: 'AC 678 PQ', ubicacion: 'España 180', zonaId: 'espana-100', tipoVehiculo: 'auto', duracion: 60, monto: 700, medioPago: 'efectivo', estado: 'pendiente', permisionarioId: 'P005', timestamp: '2026-05-29T14:10:00' },
  { id: 'T-001435', patente: 'AC 901 RS', ubicacion: 'Güemes 200', zonaId: 'paseo-guemes', tipoVehiculo: 'auto', duracion: 60, monto: 700, medioPago: 'digital', estado: 'activo', permisionarioId: 'P003', timestamp: '2026-05-29T13:50:00' },
]

export const ALERTAS: Alerta[] = [
  { id: 'A-001', tipo: 'cobro_indebido', mensaje: 'Cobro registrado en zona deshabilitada (Mitre 300)', zonaId: 'mitre-300', permisionarioId: 'P005', timestamp: '14:25', severidad: 'alta' },
  { id: 'A-002', tipo: 'sin_permisionario', mensaje: 'Cuadra San Martín sin permisionario activo', zonaId: 'san-martin-200', permisionarioId: 'P006', timestamp: '13:15', severidad: 'media' },
  { id: 'A-003', tipo: 'exceso_tiempo', mensaje: 'Vehículo AC 234 LM supera las 2 horas de estacionamiento', patente: 'AC 234 LM', zonaId: 'belgrano-500', timestamp: '14:10', severidad: 'media' },
  { id: 'A-004', tipo: 'cobro_indebido', mensaje: 'Intento de cobro en turno diurno en día feriado', timestamp: '09:45', severidad: 'alta' },
  { id: 'A-005', tipo: 'infraccion', mensaje: 'Infracción labrada - AC 901 RS sin ticket vigente', patente: 'AC 901 RS', zonaId: 'paseo-guemes', timestamp: '12:30', severidad: 'baja' },
]

export const TARIFAS: Tarifa[] = [
  { id: 'T1', tipoVehiculo: 'auto', turno: 'diurno', precioHora: 700, tolerancia: 5, fraccion: 15 },
  { id: 'T2', tipoVehiculo: 'moto', turno: 'diurno', precioHora: 300, tolerancia: 5, fraccion: 15 },
  { id: 'T3', tipoVehiculo: 'auto', turno: 'nocturno', precioHora: 700, tolerancia: 5, fraccion: 15 },
  { id: 'T4', tipoVehiculo: 'moto', turno: 'nocturno', precioHora: 300, tolerancia: 5, fraccion: 15 },
]

export const FERIADOS: Feriado[] = [
  { id: 'F1', fecha: '2026-01-01', nombre: 'Año Nuevo', tipo: 'nacional' },
  { id: 'F2', fecha: '2026-02-16', nombre: 'Carnaval', tipo: 'nacional' },
  { id: 'F3', fecha: '2026-03-24', nombre: 'Día de la Memoria', tipo: 'nacional' },
  { id: 'F4', fecha: '2026-04-02', nombre: 'Día del Veterano', tipo: 'nacional' },
  { id: 'F5', fecha: '2026-05-01', nombre: 'Día del Trabajador', tipo: 'nacional' },
  { id: 'F6', fecha: '2026-05-25', nombre: 'Revolución de Mayo', tipo: 'nacional' },
  { id: 'F7', fecha: '2026-06-20', nombre: 'Belgrano', tipo: 'nacional' },
  { id: 'F8', fecha: '2026-07-09', nombre: 'Día de la Independencia', tipo: 'nacional' },
  { id: 'F9', fecha: '2026-08-17', nombre: 'San Martín', tipo: 'nacional' },
  { id: 'F10', fecha: '2026-10-12', nombre: 'Día de la Raza', tipo: 'nacional' },
  { id: 'F11', fecha: '2026-11-16', nombre: 'Día de la Soberanía', tipo: 'nacional' },
  { id: 'F12', fecha: '2026-11-20', nombre: 'Día del Soberano', tipo: 'nacional' },
  { id: 'F13', fecha: '2026-12-08', nombre: 'Inmaculada', tipo: 'nacional' },
  { id: 'F14', fecha: '2026-12-25', nombre: 'Navidad', tipo: 'nacional' },
]

export const INFRACCIONES: Infraccion[] = [
  { id: 'INF-001', patente: 'AC 901 RS', inspectorId: 'INS-01', ubicacion: 'Güemes 200', tipo: 'sin_ticket', estado: 'confirmada', fecha: '2026-05-29T12:30', monto: 5000 },
  { id: 'INF-002', patente: 'AC 555 XX', inspectorId: 'INS-02', ubicacion: 'Caseros 500', tipo: 'exceso_tiempo', estado: 'pendiente', fecha: '2026-05-29T11:15', monto: 3500 },
  { id: 'INF-003', patente: 'M 999 YY', inspectorId: 'INS-01', ubicacion: 'Mitre 350', tipo: 'zona_no_habilitada', estado: 'confirmada', fecha: '2026-05-29T10:00', monto: 8000 },
  { id: 'INF-004', patente: 'AC 222 ZZ', inspectorId: 'INS-03', ubicacion: 'Belgrano 580', tipo: 'sin_ticket', estado: 'apelada', fecha: '2026-05-28T16:45', monto: 5000 },
]

export const ZONE_COLORS: Record<ZoneOccupancy, string> = {
  low: '#22C55E',
  high: '#FACC15',
  disabled: '#EF4444',
  nocturnal: '#1E3A5F',
}

export const ZONE_LABELS: Record<ZoneOccupancy, string> = {
  low: 'Baja ocupación',
  high: 'Alta ocupación',
  disabled: 'No habilitada',
  nocturnal: 'Turno nocturno',
}