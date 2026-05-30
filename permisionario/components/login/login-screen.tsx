'use client'

import { useState } from 'react'

interface LoginScreenProps {
  onLogin: () => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [legajo, setLegajo] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#004B9E] via-blue-100 to-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 space-y-6">
        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-2">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
            <span className="text-3xl font-black text-[#004B9E]">SEM</span>
          </div>
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-3xl font-black text-white drop-shadow-lg">SEM Salta</h1>
          <p className="text-white/80 font-semibold text-sm">Acceso Permisionario</p>
        </div>

        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#004B9E]">Legajo</label>
            <input
              type="text"
              placeholder="PER-2847"
              value={legajo}
              onChange={(e) => setLegajo(e.target.value.toUpperCase())}
              className="w-full py-3 px-4 border-2 border-[#004B9E]/30 rounded-lg focus:border-[#004B9E] focus:outline-none text-sm font-semibold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#004B9E]">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Ingresá tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-4 border-2 border-[#004B9E]/30 rounded-lg focus:border-[#004B9E] focus:outline-none text-sm pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            onClick={onLogin}
            disabled={!legajo.trim() || !password.trim()}
            className="w-full bg-[#FF6B35] hover:bg-[#FF5520] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl text-base transition-all"
          >
            Ingresar
          </button>

          <button className="w-full bg-[#004B9E] hover:bg-[#003D7F] text-white font-bold py-3.5 rounded-xl text-base transition-all flex items-center justify-center gap-2">
            <span className="text-lg">👆</span>
            Ingresar con huella
          </button>

          <p className="text-center text-xs text-gray-500 mt-2">
            ¿Olvidaste tu contraseña? <span className="text-[#009EE3] font-semibold cursor-pointer">Recuperar</span>
          </p>
        </div>
      </div>
    </div>
  )
}