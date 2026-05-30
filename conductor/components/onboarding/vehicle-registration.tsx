'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageHeader } from './page-header'

interface VehicleRegistrationProps {
  onNext: (vehicles: Vehicle[]) => void
  onBack: () => void
}

export interface Vehicle {
  id: string
  licensePlate: string
  type: 'car' | 'motorcycle'
}

export function VehicleRegistration({ onNext, onBack }: VehicleRegistrationProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: '1', licensePlate: '', type: 'car' }
  ])

  const handleVehicleChange = (id: string, field: 'licensePlate' | 'type', value: string) => {
    setVehicles(vehicles.map(v =>
      v.id === id ? { ...v, [field]: value } : v
    ))
  }

  const handleAddVehicle = () => {
    const newId = Math.random().toString()
    setVehicles([...vehicles, { id: newId, licensePlate: '', type: 'car' }])
  }

  const handleRemoveVehicle = (id: string) => {
    if (vehicles.length > 1) {
      setVehicles(vehicles.filter(v => v.id !== id))
    }
  }

  const isValid = vehicles.every(v => v.licensePlate.trim().length > 0)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader step={3} totalSteps={3} />
      
      <div className="flex-1 flex flex-col px-5 py-6 space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-[#004B9E] mb-1">Tus Vehículos</h2>
          <p className="text-sm text-gray-500">Registra uno o más vehículos</p>
        </div>

        <div className="space-y-3">
          {vehicles.map((vehicle, index) => (
            <div key={vehicle.id} className="bg-blue-50 rounded-xl p-4 space-y-3 border-2 border-[#004B9E]/10">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#004B9E] text-sm">Vehículo {index + 1}</h3>
                {vehicles.length > 1 && (
                  <button
                    onClick={() => handleRemoveVehicle(vehicle.id)}
                    className="text-red-500 text-xs font-bold hover:underline px-2 py-1"
                  >
                    Eliminar
                  </button>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-[#004B9E]">Patente</Label>
                <Input
                  type="text"
                  placeholder="ABC 123"
                  value={vehicle.licensePlate}
                  onChange={(e) => handleVehicleChange(vehicle.id, 'licensePlate', e.target.value.toUpperCase())}
                  className="py-3 px-4 border-2 border-[#004B9E]/30 rounded-xl font-semibold text-center bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-[#004B9E]">Tipo de Vehículo</Label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleVehicleChange(vehicle.id, 'type', 'car')}
                    className={`flex-1 py-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                      vehicle.type === 'car'
                        ? 'bg-[#004B9E] border-[#004B9E] text-white'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#004B9E]'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM5 11l1.5-4.5h11L19 11H5z"/>
                    </svg>
                    <span className="text-xs font-bold">Auto</span>
                  </button>
                  <button
                    onClick={() => handleVehicleChange(vehicle.id, 'type', 'motorcycle')}
                    className={`flex-1 py-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                      vehicle.type === 'motorcycle'
                        ? 'bg-[#004B9E] border-[#004B9E] text-white'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#004B9E]'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 7c0-1.1-.9-2-2-2h-3V3h-2v2h-4V3H6v2H3c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7zM6.5 16c-1.38 0-2.5-1.12-2.5-2.5S5.12 11 6.5 11s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm11 0c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="text-xs font-bold">Moto</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={handleAddVehicle}
          className="w-full border-2 border-dashed border-[#004B9E] text-[#004B9E] py-3 rounded-xl font-bold hover:bg-blue-50"
        >
          + Agregar Vehículo
        </Button>
      </div>

      <div className="px-5 pb-6 space-y-3">
        <Button
          onClick={() => onNext(vehicles)}
          disabled={!isValid}
          className="w-full bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl disabled:opacity-50"
        >
          Siguiente
        </Button>

        <Button
          variant="outline"
          onClick={onBack}
          className="w-full border-2 border-[#004B9E] text-[#004B9E] py-4 rounded-xl font-bold hover:bg-blue-50"
        >
          Volver
        </Button>
      </div>
    </div>
  )
}