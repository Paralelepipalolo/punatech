export type ZoneOccupancy = 'low' | 'high' | 'disabled' | 'nocturnal'

export interface SemZone {
  id: string
  name: string
  street: string
  coordinates: [number, number][]
  occupancy: ZoneOccupancy
  tariff: number
  isNocturnal: boolean
  nocturnalAreas?: string[]
}

const SALTA_MICROCENTRO_ZONES: SemZone[] = [
  {
    id: 'caseros-400',
    name: 'Caseros 400-500',
    street: 'Caseros',
    coordinates: [
      [-24.7882, -65.4118],
      [-24.7878, -65.4115],
      [-24.7885, -65.4109],
      [-24.7889, -65.4112],
    ],
    occupancy: 'low',
    tariff: 700,
    isNocturnal: false,
  },
  {
    id: 'caseros-600',
    name: 'Caseros 600-700',
    street: 'Caseros',
    coordinates: [
      [-24.7892, -65.4105],
      [-24.7888, -65.4102],
      [-24.7895, -65.4096],
      [-24.7899, -65.4099],
    ],
    occupancy: 'high',
    tariff: 700,
    isNocturnal: false,
  },
  {
    id: 'calle-florida-200',
    name: 'Florida 200-300',
    street: 'Florida',
    coordinates: [
      [-24.7875, -65.4122],
      [-24.7879, -65.4118],
      [-24.7872, -65.4112],
      [-24.7868, -65.4116],
    ],
    occupancy: 'low',
    tariff: 700,
    isNocturnal: false,
  },
  {
    id: 'paseo-balcarce',
    name: 'Paseo Balcarce',
    street: 'Balcarce',
    coordinates: [
      [-24.7912, -65.4078],
      [-24.7908, -65.4075],
      [-24.7915, -65.4068],
      [-24.7919, -65.4071],
    ],
    occupancy: 'nocturnal',
    tariff: 700,
    isNocturnal: true,
    nocturnalAreas: ['Paseo Balcarce'],
  },
  {
    id: 'paseo-guemes',
    name: 'Paseo Güemes',
    street: 'Güemes',
    coordinates: [
      [-24.7852, -65.4102],
      [-24.7848, -65.4098],
      [-24.7855, -65.4092],
      [-24.7859, -65.4095],
    ],
    occupancy: 'nocturnal',
    tariff: 700,
    isNocturnal: true,
    nocturnalAreas: ['Paseo Güemes'],
  },
  {
    id: 'plaza-alvarado',
    name: 'Plaza Alvarado',
    street: 'Alvarado',
    coordinates: [
      [-24.7862, -65.4132],
      [-24.7858, -65.4128],
      [-24.7865, -65.4122],
      [-24.7869, -65.4125],
    ],
    occupancy: 'nocturnal',
    tariff: 700,
    isNocturnal: true,
    nocturnalAreas: ['Plaza Alvarado'],
  },
  {
    id: 'mitre-300',
    name: 'Mitre 300-400',
    street: 'Mitre',
    coordinates: [
      [-24.7922, -65.4098],
      [-24.7918, -65.4095],
      [-24.7925, -65.4088],
      [-24.7929, -65.4091],
    ],
    occupancy: 'disabled',
    tariff: 0,
    isNocturnal: false,
  },
  {
    id: 'espana-100',
    name: 'España 100-200',
    street: 'España',
    coordinates: [
      [-24.7902, -65.4145],
      [-24.7898, -65.4142],
      [-24.7905, -65.4135],
      [-24.7909, -65.4138],
    ],
    occupancy: 'low',
    tariff: 700,
    isNocturnal: false,
  },
  {
    id: 'belgrano-500',
    name: 'Belgrano 500-600',
    street: 'Belgrano',
    coordinates: [
      [-24.7915, -65.4052],
      [-24.7911, -65.4048],
      [-24.7918, -65.4042],
      [-24.7922, -65.4045],
    ],
    occupancy: 'high',
    tariff: 700,
    isNocturnal: false,
  },
  {
    id: 'san-martin-200',
    name: 'San Martín 200-300',
    street: 'San Martín',
    coordinates: [
      [-24.7895, -65.4082],
      [-24.7891, -65.4078],
      [-24.7898, -65.4072],
      [-24.7902, -65.4075],
    ],
    occupancy: 'low',
    tariff: 300,
    isNocturnal: false,
  },
  {
    id: 'rivadavia-100',
    name: 'Rivadavia 100-200',
    street: 'Rivadavia',
    coordinates: [
      [-24.7868, -65.4065],
      [-24.7864, -65.4062],
      [-24.7871, -65.4055],
      [-24.7875, -65.4058],
    ],
    occupancy: 'disabled',
    tariff: 0,
    isNocturnal: false,
  },
  {
    id: '-zorilla-300',
    name: 'Zorilla 300-400',
    street: 'Zorilla',
    coordinates: [
      [-24.7928, -65.4042],
      [-24.7924, -65.4038],
      [-24.7931, -65.4032],
      [-24.7935, -65.4035],
    ],
    occupancy: 'high',
    tariff: 700,
    isNocturnal: false,
  },
  {
    id: 'venida-sarmiento',
    name: 'Av. Sarmiento 800-900',
    street: 'Av. Sarmiento',
    coordinates: [
      [-24.7858, -65.4078],
      [-24.7854, -65.4075],
      [-24.7861, -65.4068],
      [-24.7865, -65.4071],
    ],
    occupancy: 'low',
    tariff: 700,
    isNocturnal: false,
  },
  {
    id: 'iguazu-100',
    name: 'Catamarca 100-200',
    street: 'Catamarca',
    coordinates: [
      [-24.7910, -65.4032],
      [-24.7906, -65.4028],
      [-24.7913, -65.4022],
      [-24.7917, -65.4025],
    ],
    occupancy: 'high',
    tariff: 300,
    isNocturnal: false,
  },
  {
    id: ' localecisima-200',
    name: 'Vicente López 200-300',
    street: 'Vicente López',
    coordinates: [
      [-24.7872, -65.4048],
      [-24.7868, -65.4045],
      [-24.7875, -65.4038],
      [-24.7879, -65.4041],
    ],
    occupancy: 'low',
    tariff: 700,
    isNocturnal: false,
  },
  {
    id: 'laprida-100',
    name: 'Laprida 100-200',
    street: 'Laprida',
    coordinates: [
      [-24.7935, -65.4062],
      [-24.7931, -65.4058],
      [-24.7938, -65.4052],
      [-24.7942, -65.4055],
    ],
    occupancy: 'disabled',
    tariff: 0,
    isNocturnal: false,
  },
]

export const SALTA_CENTER: [number, number] = [-24.7883, -65.4100]

export const SALTA_MICROCENTRO_BOUNDS: [[number, number], [number, number]] = [
  [-24.7950, -65.4160],
  [-24.7840, -65.4020],
]

export const HOLIDAYS_2026 = [
  new Date(2026, 0, 1),
  new Date(2026, 1, 16),
  new Date(2026, 2, 24),
  new Date(2026, 3, 2),
  new Date(2026, 4, 1),
  new Date(2026, 4, 25),
  new Date(2026, 5, 20),
  new Date(2026, 6, 9),
  new Date(2026, 7, 17),
  new Date(2026, 9, 12),
  new Date(2026, 10, 16),
  new Date(2026, 10, 20),
  new Date(2026, 11, 8),
  new Date(2026, 11, 25),
]

export function isHoliday(date: Date): boolean {
  return HOLIDAYS_2026.some(
    (h) =>
      h.getDate() === date.getDate() &&
      h.getMonth() === date.getMonth() &&
      h.getFullYear() === date.getFullYear()
  )
}

export type ShiftType = 'diurno' | 'nocturno' | 'ninguno'

export function getCurrentShift(date: Date): ShiftType {
  const day = date.getDay()
  const hour = date.getHours()

  const weekdayDiurnal = day >= 1 && day <= 5 && hour >= 7 && hour < 21
  const saturdayDiurnal = day === 6 && hour >= 7 && hour < 14
  const nocturnal = hour >= 22 || hour < 5

  if (weekdayDiurnal || saturdayDiurnal) return 'diurno'
  if (nocturnal) return 'nocturno'
  return 'ninguno'
}

export const ZONE_COLORS: Record<ZoneOccupancy, string> = {
  low: '#22C55E',
  high: '#FACC15',
  disabled: '#EF4444',
  nocturnal: '#1E3A5F',
}

export const ZONE_LABELS: Record<ZoneOccupancy, string> = {
  low: 'Baja ocupación (0-50%)',
  high: 'Alta ocupación (50-90%)',
  disabled: 'No habilitada',
  nocturnal: 'Turno nocturno',
}

export { SALTA_MICROCENTRO_ZONES as SEM_ZONES }