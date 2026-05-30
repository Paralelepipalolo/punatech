'use client'

import { MOCK_LIQUIDACIONES } from '@/components/data'

export function LiquidacionesScreen() {
  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <div className="bg-[#004B9E] px-4 py-4">
        <h1 className="text-white font-bold text-lg">Liquidaciones</h1>
        <p className="text-white/70 text-xs">Historial de cobros y retenciones</p>
      </div>

      <div className="px-4 py-4 space-y-3">
        {MOCK_LIQUIDACIONES.map((liq) => (
          <div key={liq.id} className={`bg-white rounded-xl border-2 ${liq.status === 'pagada' ? 'border-green-100' : 'border-yellow-100'} overflow-hidden`}>
            <div className={`px-4 py-3 flex items-center justify-between ${liq.status === 'pagada' ? 'bg-green-50' : 'bg-yellow-50'}`}>
              <div>
                <p className="font-bold text-[#004B9E] text-sm">{liq.period}</p>
                <p className="text-[10px] text-gray-500">Quincena</p>
              </div>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${liq.status === 'pagada' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                {liq.status === 'pagada' ? '✓ Pagada' : '⏳ Pendiente'}
              </span>
            </div>

            <div className="px-4 py-3 space-y-2">
              <div className="flex justify-between">
                <p className="text-xs text-gray-600">Cobros digitales</p>
                <p className="text-xs font-bold text-blue-600">${liq.totalDigital.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-600">Cobros en efectivo</p>
                <p className="text-xs font-bold text-green-600">${liq.totalEfectivo.toLocaleString()}</p>
              </div>

              <div className="border-t border-gray-100 pt-2 flex justify-between">
                <p className="text-xs text-gray-600">Total bruto</p>
                <p className="text-xs font-bold">${(liq.totalDigital + liq.totalEfectivo).toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-red-500">Retención Municipal (20%)</p>
                <p className="text-xs font-bold text-red-500">-${liq.retencionMunicipal.toLocaleString()}</p>
              </div>

              <div className="border-t-2 border-[#004B9E]/20 pt-2 flex justify-between">
                <p className="text-sm font-bold text-[#004B9E]">Neto recibido</p>
                <p className="text-lg font-black text-[#004B9E]">${liq.netoPermisionario.toLocaleString()}</p>
              </div>
            </div>

            {liq.status === 'pagada' && (
              <div className="px-4 pb-3">
                <button className="w-full bg-[#004B9E] hover:bg-[#003D7F] text-white font-bold py-2 rounded-lg text-xs transition-all">
                  Descargar comprobante
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}