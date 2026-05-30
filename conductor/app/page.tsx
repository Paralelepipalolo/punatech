'use client'

import { useState } from 'react'
import { WelcomeScreen } from '@/components/onboarding/welcome-screen'
import { RegisterForm, type RegisterData } from '@/components/onboarding/register-form'
import { VehicleRegistration, type Vehicle } from '@/components/onboarding/vehicle-registration'
import { PaymentMethod } from '@/components/onboarding/payment-method'
import { OnboardingTour } from '@/components/onboarding/onboarding-tour'
import { ParkingSelectScreen } from '@/components/parking/parking-select-screen'
import { PaymentReviewScreen } from '@/components/parking/payment-review-screen'
import { PaymentConfirmationScreen } from '@/components/parking/payment-confirmation-screen'
import { CashPaymentScreen } from '@/components/parking/cash-payment-screen'
import { GuestScreen } from '@/components/onboarding/guest-screen'
import { SemMap } from '@/components/map'
import { Profile } from '@/components/profile/profile-screen'
import { Button } from '@/components/ui/button'

type OnboardingStep = 'welcome' | 'register' | 'vehicles' | 'payment' | 'tour' | 'dashboard' | 'parking' | 'review' | 'cash-payment' | 'confirmation' | 'guest'

type AppTab = 'home' | 'map' | 'profile'

export default function Home() {
  const [step, setStep] = useState<OnboardingStep>('welcome')
  const [activeTab, setActiveTab] = useState<AppTab>('home')
  const [registerData, setRegisterData] = useState<RegisterData | null>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isGuest, setIsGuest] = useState(false)
  const [parkingData, setParkingData] = useState({
    selectedVehicle: '',
    location: 'Caseros 400-500',
    duration: 60,
    paymentMethod: 'mercadopago',
    amount: 700,
  })

  const isOnboardingComplete = !['welcome', 'register', 'vehicles', 'payment', 'tour', 'guest'].includes(step)

  const handleWelcomeNext = () => {
    setStep('register')
  }

  const handleGuestMode = () => {
    setIsGuest(true)
    setStep('guest')
  }

  const handleGuestContinue = (plate: string, type: 'car' | 'motorcycle') => {
    setParkingData((prev) => ({
      ...prev,
      selectedVehicle: plate,
    }))
    setStep('parking')
  }

  const handleRegisterNext = (data: RegisterData) => {
    setRegisterData(data)
    setStep('vehicles')
  }

  const handleVehiclesNext = (vehData: Vehicle[]) => {
    setVehicles(vehData)
    setStep('payment')
  }

  const handlePaymentNext = () => {
    setStep('tour')
  }

  const handleTourComplete = () => {
    setStep('dashboard')
  }

  const handleStartParking = () => {
    setStep('parking')
    setActiveTab('home')
  }

  const handleParkingNext = (data: any) => {
    setParkingData(data)
    setStep('review')
  }

  const handleReviewConfirm = () => {
    if (parkingData.paymentMethod === 'cash') {
      setStep('cash-payment')
    } else {
      setTimeout(() => {
        setStep('confirmation')
      }, 2000)
    }
  }

  const handleCashConfirm = () => {
    setStep('confirmation')
  }

  const handleParkHere = (streetName: string) => {
    setParkingData((prev) => ({ ...prev, location: streetName }))
    setActiveTab('home')
    if (step === 'dashboard') {
      setStep('parking')
    }
  }

  if (!isOnboardingComplete) {
    return (
      <main className="w-full min-h-screen">
        {step === 'welcome' && <WelcomeScreen onNext={handleWelcomeNext} onGuest={handleGuestMode} />}
        {step === 'register' && <RegisterForm onNext={handleRegisterNext} />}
        {step === 'vehicles' && (
          <VehicleRegistration
            onNext={handleVehiclesNext}
            onBack={() => setStep('register')}
          />
        )}
        {step === 'payment' && (
          <PaymentMethod
            onNext={handlePaymentNext}
            onBack={() => setStep('vehicles')}
          />
        )}
        {step === 'tour' && <OnboardingTour onComplete={handleTourComplete} />}
        {step === 'guest' && <GuestScreen onContinue={handleGuestContinue} />}
      </main>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'home' && (
          <div className="h-full overflow-y-auto">
            {step === 'dashboard' && !isGuest && (
              <div className="flex flex-col min-h-full bg-gradient-to-b from-[#004B9E] via-blue-100 to-white">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#004B9E]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#009EE3] flex items-center justify-center">
                      <span className="text-white font-black text-sm">SEM</span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">SEM Salta</p>
                      <p className="text-white/70 text-[10px]">Estacionamiento Digital</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 space-y-4">
                  <div className="text-center space-y-2">
                    <div className="text-5xl mb-2">🎉</div>
                    <h1 className="text-3xl font-black text-white drop-shadow-lg">¡Felicidades!</h1>
                    <p className="text-white/90 font-semibold text-sm">Tu cuenta está lista para usar</p>
                  </div>

                  <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 space-y-4">
                    <div className="space-y-3">
                      <h2 className="text-sm font-bold text-[#004B9E]">Tu Información</h2>

                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 space-y-2 border-2 border-[#004B9E]/20">
                        <div>
                          <p className="text-[10px] font-semibold text-[#004B9E] mb-0.5">Nombre Completo</p>
                          <p className="text-sm font-bold text-[#004B9E]">{registerData?.firstName} {registerData?.lastName}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-[#004B9E] mb-0.5">Número de Teléfono</p>
                          <p className="text-sm font-bold text-[#004B9E]">{registerData?.phone}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-[#004B9E] mb-0.5">DNI</p>
                          <p className="text-sm font-bold text-[#004B9E]">***{registerData?.dni.slice(-4)}</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-3 space-y-1.5 border-2 border-[#FF6B35]/20">
                        <p className="text-[10px] font-semibold text-[#FF6B35] mb-0.5">Vehículos Registrados</p>
                        <div className="space-y-1.5">
                          {vehicles.map((v) => (
                            <div key={v.id} className="flex items-center gap-2 bg-white rounded-lg p-1.5">
                              <span className="text-base">
                                {v.type === 'car' ? '🚗' : '🏍️'}
                              </span>
                              <p className="text-xs font-bold text-[#FF6B35]">{v.licensePlate}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-center space-y-1 pt-3 border-t-2 border-gray-200">
                      <p className="text-[10px] text-gray-600 font-medium">Ya puedes</p>
                      <p className="text-xs font-bold text-[#004B9E]">🎯 Estacionar y pagar en línea</p>
                    </div>
                  </div>

                  <Button
                    onClick={handleStartParking}
                    className="w-full max-w-sm bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl text-base shadow-lg"
                  >
                    Comenzar a Estacionar
                  </Button>
                </div>
              </div>
            )}

            {step === 'dashboard' && isGuest && (
              <div className="flex flex-col min-h-full bg-background">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#004B9E]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#009EE3] flex items-center justify-center">
                      <span className="text-white font-black text-sm">SEM</span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">SEM Salta</p>
                      <p className="text-white/70 text-[10px]">Estacionamiento Digital</p>
                    </div>
                  </div>
                  <span className="ml-auto text-[10px] font-medium text-white/60 bg-white/10 px-2 py-0.5 rounded">Invitado</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 space-y-4">
                  <div className="text-center space-y-2">
                    <div className="text-4xl mb-2">🚗</div>
                    <h1 className="text-xl font-black text-[#004B9E]">Estacionar como invitado</h1>
                    <p className="text-sm text-gray-500">Ingresá la patente y elegí el tiempo de estacionamiento</p>
                  </div>
                  <Button
                    onClick={handleStartParking}
                    className="w-full max-w-sm bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold py-4 rounded-xl text-base shadow-lg"
                  >
                    Comenzar a Estacionar
                  </Button>
                </div>
              </div>
            )}

            {step === 'parking' && <ParkingSelectScreen onNext={handleParkingNext} />}

            {step === 'review' && (
              <PaymentReviewScreen
                licensePlate={parkingData.selectedVehicle}
                location={parkingData.location}
                duration={parkingData.duration}
                vehicleType={parkingData.selectedVehicle.includes('M') ? 'motorcycle' : 'car'}
                paymentMethod={parkingData.paymentMethod}
                amount={parkingData.amount}
                onConfirm={handleReviewConfirm}
                onBack={() => setStep('parking')}
              />
            )}

            {step === 'cash-payment' && (
              <CashPaymentScreen
                licensePlate={parkingData.selectedVehicle}
                location={parkingData.location}
                duration={parkingData.duration}
                vehicleType={parkingData.selectedVehicle.includes('M') ? 'motorcycle' : 'car'}
                amount={parkingData.amount}
                onConfirm={handleCashConfirm}
                onBack={() => setStep('review')}
              />
            )}

            {step === 'confirmation' && (
              <PaymentConfirmationScreen
                licensePlate={parkingData.selectedVehicle}
                location={parkingData.location}
                duration={parkingData.duration}
                vehicleType={parkingData.selectedVehicle.includes('M') ? 'motorcycle' : 'car'}
                paymentMethod={parkingData.paymentMethod}
                amount={parkingData.amount}
                ticketNumber={`SEM-${Math.random().toString().slice(2, 7)}`}
                onExtend={() => setStep('parking')}
                onReport={() => alert('Reportar problema')}
              />
            )}
          </div>
        )}

        {activeTab === 'map' && (
          <SemMap onParkHere={handleParkHere} />
        )}

        {activeTab === 'profile' && registerData && (
          <Profile registerData={registerData} vehicles={vehicles} />
        )}
        {activeTab === 'profile' && isGuest && (
          <div className="flex flex-col min-h-full bg-gray-50">
            <div className="bg-[#004B9E] px-4 py-3 flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#009EE3] flex items-center justify-center">
                  <span className="text-white font-black text-sm">SEM</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">SEM Salta</p>
                  <p className="text-white/70 text-[10px]">Estacionamiento Digital</p>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
              <div className="text-5xl mb-4">👤</div>
              <h2 className="text-xl font-black text-[#004B9E]">Modo invitado</h2>
              <p className="text-sm text-gray-500 mt-2 max-w-xs">
                Estás usando SEM Salta sin registro. Para guardar historial, vehículos y medios de pago, registrate.
              </p>
              <button
                onClick={() => { setIsGuest(false); setStep('welcome'); setActiveTab('home') }}
                className="mt-6 px-8 py-3 bg-[#FF6B35] hover:bg-[#FF5520] text-white font-bold rounded-xl text-sm"
              >
                Registrarme ahora
              </button>
              <p className="text-xs text-gray-400 mt-4">Tu sesión actual no se perderá al registrarte.</p>
            </div>
          </div>
        )}
      </div>

      <nav className="flex bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex-1 flex flex-col items-center justify-center py-2.5 transition-colors ${
            activeTab === 'home'
              ? 'text-[#004B9E]'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-[10px] mt-0.5 font-medium">Inicio</span>
          {activeTab === 'home' && (
            <div className="w-4 h-0.5 bg-[#004B9E] rounded-full mt-0.5" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`flex-1 flex flex-col items-center justify-center py-2.5 transition-colors ${
            activeTab === 'map'
              ? 'text-[#004B9E]'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <line x1="8" y1="2" x2="8" y2="18" />
            <line x1="16" y1="6" x2="16" y2="22" />
          </svg>
          <span className="text-[10px] mt-0.5 font-medium">Mapa</span>
          {activeTab === 'map' && (
            <div className="w-4 h-0.5 bg-[#004B9E] rounded-full mt-0.5" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 flex flex-col items-center justify-center py-2.5 transition-colors ${
            activeTab === 'profile'
              ? 'text-[#004B9E]'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-[10px] mt-0.5 font-medium">Perfil</span>
          {activeTab === 'profile' && (
            <div className="w-4 h-0.5 bg-[#004B9E] rounded-full mt-0.5" />
          )}
        </button>
      </nav>
    </div>
  )
}