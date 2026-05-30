'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { DashboardPrincipal } from '@/components/dashboard/dashboard-principal'
import { PermisionariosPanel } from '@/components/permisionarios/permisionarios-panel'
import { FiscalizacionPanel } from '@/components/fiscalizacion/fiscalizacion-panel'
import { TarifasPanel } from '@/components/tarifas/tarifas-panel'
import { ReportesPanel } from '@/components/reportes/reportes-panel'

type Section = 'dashboard' | 'permisionarios' | 'fiscalizacion' | 'tarifas' | 'reportes'

export default function Home() {
  const [section, setSection] = useState<Section>('dashboard')

  return (
    <div className="flex h-screen">
      <Sidebar active={section} onNavigate={setSection} />

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between lg:ml-0 ml-12">
            <div>
              <h1 className="font-bold text-sm lg:text-base">
                SEM Salta — {section === 'dashboard' ? 'Dashboard' : section === 'permisionarios' ? 'Permisionarios' : section === 'fiscalizacion' ? 'Fiscalización' : section === 'tarifas' ? 'Tarifas y Configuración' : 'Reportes y Auditoría'}
              </h1>
              <p className="text-xs text-muted-foreground">Municipalidad de Salta · Ordenanza N.º 12.170</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground bg-card border border-border rounded-lg px-3 py-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                29/05/2026 · Turno diurno
              </div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                MC
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6 max-w-5xl">
          {section === 'dashboard' && <DashboardPrincipal />}
          {section === 'permisionarios' && <PermisionariosPanel />}
          {section === 'fiscalizacion' && <FiscalizacionPanel />}
          {section === 'tarifas' && <TarifasPanel />}
          {section === 'reportes' && <ReportesPanel />}
        </div>
      </main>
    </div>
  )
}