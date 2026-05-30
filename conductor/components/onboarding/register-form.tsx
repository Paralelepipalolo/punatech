'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageHeader } from './page-header'
import Image from 'next/image'

interface RegisterFormProps {
  onNext: (data: RegisterData) => void
}

export interface RegisterData {
  phone: string
  firstName: string
  lastName: string
  dni: string
}

export function RegisterForm({ onNext }: RegisterFormProps) {
  const [step, setStep] = useState<'phone' | 'personal'>('phone')
  const [phone, setPhone] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dni, setDni] = useState('')

  const handlePhoneNext = () => {
    if (phone.trim().length >= 10) {
      setStep('personal')
    }
  }

  const handleSubmit = () => {
    if (firstName.trim() && lastName.trim() && dni.trim().length >= 7) {
      onNext({
        phone,
        firstName,
        lastName,
        dni,
      })
    }
  }

  if (step === 'phone') {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <PageHeader step={1} totalSteps={3} />
        
        <div className="flex-1 flex flex-col px-5 py-6 space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-[#004B9E] mb-1">Tu Teléfono</h2>
            <p className="text-sm text-gray-500">Verificaremos tu identidad</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs font-bold text-[#004B9E]">
              Ingresa tu número
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+54 9 388 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="py-3.5 px-4 border-2 border-[#004B9E]/30 rounded-xl focus:border-[#004B9E] focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-[#004B9E]">O registrarse con:</p>
            <div className="flex gap-3">
              <Button
                className="flex-1 py-3.5 bg-white border-2 border-gray-200 hover:border-[#004B9E] rounded-xl font-semibold flex items-center justify-center"
                onClick={() => {/* Google login */}}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-thUt8q40Yt6P3TzFmO5hg1VlXdlzJV.png"
                  alt="Google"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Button>
              <Button
                className="flex-1 py-3.5 bg-white border-2 border-gray-200 hover:border-[#004B9E] rounded-xl font-semibold flex items-center justify-center"
                onClick={() => {/* Apple login */}}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0pnMtvZnPYm5lfNHfKIYAFnafmPyms.png"
                  alt="Apple"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Button>
            </div>
          </div>
        </div>

        <div className="px-5 pb-6 space-y-3">
          <Button
            onClick={handlePhoneNext}
            disabled={phone.trim().length < 10}
            className="w-full bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl disabled:opacity-50"
          >
            Continuar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader step={2} totalSteps={3} />
      
      <div className="flex-1 flex flex-col px-5 py-6 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-[#004B9E] mb-1">Tu Información</h2>
          <p className="text-sm text-gray-500">Completa tus datos personales</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-xs font-bold text-[#004B9E]">
            Nombre
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Juan"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="py-3.5 px-4 border-2 border-[#004B9E]/30 rounded-xl focus:border-[#004B9E] focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-xs font-bold text-[#004B9E]">
            Apellido
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Pérez"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="py-3.5 px-4 border-2 border-[#004B9E]/30 rounded-xl focus:border-[#004B9E] focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dni" className="text-xs font-bold text-[#004B9E]">
            DNI
          </Label>
          <Input
            id="dni"
            type="text"
            placeholder="12345678"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="py-3.5 px-4 border-2 border-[#004B9E]/30 rounded-xl focus:border-[#004B9E] focus:outline-none"
          />
        </div>
      </div>

      <div className="px-5 pb-6 space-y-3">
        <Button
          onClick={handleSubmit}
          disabled={!firstName.trim() || !lastName.trim() || dni.trim().length < 7}
          className="w-full bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl disabled:opacity-50"
        >
          Siguiente
        </Button>

        <Button
          variant="outline"
          onClick={() => setStep('phone')}
          className="w-full border-2 border-[#004B9E] text-[#004B9E] py-4 rounded-xl font-bold hover:bg-blue-50"
        >
          Volver
        </Button>
      </div>
    </div>
  )
}