'use client'

import { MOCK_COBROS, PERMISIONARIO_DATA } from '@/components/data'

export function CobrosScreen() {
  const totalDigital = MOCK_COBROS.filter(c => c.paymentMethod === 'digital').reduce((sum, c) => sum + c.amount, 0)
  const totalEfectivo = MOCK_COBROS.filter(c => c.paymentMethod === 'efectivo').reduce((sum, c) => sum + c.amount, 0)
  const totalGeneral = totalDigital + totalEfectivo
  const retencion = Math.round(totalGeneral * 0.2)
  const neto = totalGeneral - retencion

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <div className="bg-[#004B9E] px-4 py-4">
        <h1 className="text-white font-bold text-lg">Registro de Cobros</h1>
        <p className="text-white/70 text-xs">{PERMISIONARIO_DATA.cuadra} · Hoy</p>
      </div>

      <div className="px-4 py-3 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white rounded-xl p-3 text-center border-2 border-[#004B9E]/10">
            <p className="text-[10px] text-gray-500">Total</p>
            <p className="text-lg font-black text-[#004B9E]">${totalGeneral}</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center border-2 border-blue-100">
            <p className="text-[10px] text-gray-500">Digital</p>
            <p className="text-lg font-black text-blue-600">${totalDigital}</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center border-2 border-green-100">
            <p className="text-[10px] text-gray-500">Efectivo</p>
            <p className="text-lg font-black text-green-600">${totalEfectivo}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#004B9E] to-[#009EE3] rounded-xl p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs opacity-80">Retención Municipal (20%)</p>
              <p className="text-lg font-black">${retencion}</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-80">Tu neto</p>
              <p className="text-2xl font-black">${neto}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-blue-500 rounded-sm" />
            <span className="text-xs font-bold text-gray-600">Cobros digitales</span>
            <span className="text-xs text-gray-400">(no requieren tu intervención)</span>
          </div>
          {MOCK_COBROS.filter(c => c.paymentMethod === 'digital').map(cobro => (
            <div key={cobro.id} className="bg-white rounded-xl p-3 border-2 border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{cobro.type === 'auto' ? '🚗' : '🏍️'}</span>
                  <div>
                    <p className="font-bold text-[#004B9E] text-sm">{cobro.patente}</p>
                    <p className="text-[10px] text-gray-500">{cobro.time} · Digital</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Digital</span>
                  <p className="font-bold text-[#004B9E]">${cobro.amount}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-2 mb-1 mt-4">
            <div className="w-3 h-3 bg-green-500 rounded-sm" />
            <span className="text-xs font-bold text-gray-600">Cobros en efectivo</span>
            <span className="text-xs text-gray-400">(verificados por vos)</span>
          </div>
          {MOCK_COBROS.filter(c => c.paymentMethod === 'efectivo').map(cobro => (
            <div key={cobro.id} className="bg-white rounded-xl p-3 border-2 border-green-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{cobro.type === 'auto' ? '🚗' : '🏍️'}</span>
                  <div>
                    <p className="font-bold text-[#004B9E] text-sm">{cobro.patente}</p>
                    <p className="text-[10px] text-gray-500">{cobro.time} · Efectivo</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Efectivo</span>
                  <p className="font-bold text-[#004B9E]">${cobro.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}