'use client'

import { useState } from 'react'
import { LoginScreen } from '@/components/login/login-screen'
import { MyBlockScreen } from '@/components/dashboard/my-block-screen'
import { ScanQrScreen } from '@/components/scan/scan-qr-screen'
import { CobrosScreen } from '@/components/cobros/cobros-screen'
import { LiquidacionesScreen } from '@/components/liquidaciones/liquidaciones-screen'
import { PerfilScreen } from '@/components/perfil/perfil-screen'

type AppScreen = 'login' | 'dashboard' | 'scan' | 'cobros' | 'liquidaciones' | 'perfil'

export type TabType = 'dashboard' | 'cobros' | 'liquidaciones' | 'perfil'

export default function Home() {
  const [screen, setScreen] = useState<AppScreen>('login')
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')

  const handleLogin = () => {
    setScreen('dashboard')
    setActiveTab('dashboard')
  }

  const handleScanQr = () => {
    setScreen('scan')
  }

  const handleScanComplete = () => {
    setScreen('dashboard')
    setActiveTab('dashboard')
  }

  const handleBackFromScan = () => {
    setScreen('dashboard')
  }

  if (screen === 'login') {
    return <LoginScreen onLogin={handleLogin} />
  }

  if (screen === 'scan') {
    return <ScanQrScreen onComplete={handleScanComplete} onBack={handleBackFromScan} />
  }

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'dashboard' && <MyBlockScreen onScanQr={handleScanQr} />}
        {activeTab === 'cobros' && <CobrosScreen />}
        {activeTab === 'liquidaciones' && <LiquidacionesScreen />}
        {activeTab === 'perfil' && <PerfilScreen />}
      </div>

      <nav className="flex bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
        <button
          onClick={() => handleTabChange('dashboard')}
          className={`flex-1 flex flex-col items-center justify-center py-2.5 transition-colors ${activeTab === 'dashboard' ? 'text-[#004B9E]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span className="text-[10px] mt-0.5 font-medium">Mi Cuadra</span>
          {activeTab === 'dashboard' && <div className="w-4 h-0.5 bg-[#004B9E] rounded-full mt-0.5" />}
        </button>
        <button
          onClick={() => handleTabChange('cobros')}
          className={`flex-1 flex flex-col items-center justify-center py-2.5 transition-colors ${activeTab === 'cobros' ? 'text-[#004B9E]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          <span className="text-[10px] mt-0.5 font-medium">Cobros</span>
          {activeTab === 'cobros' && <div className="w-4 h-0.5 bg-[#004B9E] rounded-full mt-0.5" />}
        </button>
        <button
          onClick={() => handleTabChange('liquidaciones')}
          className={`flex-1 flex flex-col items-center justify-center py-2.5 transition-colors ${activeTab === 'liquidaciones' ? 'text-[#004B9E]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <span className="text-[10px] mt-0.5 font-medium">Liquidaciones</span>
          {activeTab === 'liquidaciones' && <div className="w-4 h-0.5 bg-[#004B9E] rounded-full mt-0.5" />}
        </button>
        <button
          onClick={() => handleTabChange('perfil')}
          className={`flex-1 flex flex-col items-center justify-center py-2.5 transition-colors ${activeTab === 'perfil' ? 'text-[#004B9E]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span className="text-[10px] mt-0.5 font-medium">Perfil</span>
          {activeTab === 'perfil' && <div className="w-4 h-0.5 bg-[#004B9E] rounded-full mt-0.5" />}
        </button>
      </nav>
    </div>
  )
}