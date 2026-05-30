'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Settings,
  FileBarChart,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'

type Section = 'dashboard' | 'permisionarios' | 'fiscalizacion' | 'tarifas' | 'reportes'

interface SidebarProps {
  active: Section
  onNavigate: (section: Section) => void
}

const NAV_ITEMS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'permisionarios', label: 'Permisionarios', icon: <Users className="w-5 h-5" /> },
  { id: 'fiscalizacion', label: 'Fiscalización', icon: <ShieldCheck className="w-5 h-5" /> },
  { id: 'tarifas', label: 'Tarifas', icon: <Settings className="w-5 h-5" /> },
  { id: 'reportes', label: 'Reportes', icon: <FileBarChart className="w-5 h-5" /> },
]

export function Sidebar({ active, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-primary-foreground font-black text-sm">SEM</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="font-bold text-sm text-foreground leading-none">SEM Salta</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Panel Municipal</p>
          </div>
        )}
      </div>

      <nav className="flex-1 py-3 px-2 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onNavigate(item.id)
              setMobileOpen(false)
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active === item.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="px-2 py-3 border-t border-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex w-full items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:bg-muted transition-colors"
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
          {!collapsed && <span>Colapsar</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-card border border-border rounded-lg p-2 shadow-md"
      >
        <Menu className="w-5 h-5" />
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 bg-card border-r border-border shadow-xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      <aside
        className={`hidden lg:flex flex-col bg-card border-r border-border transition-all duration-200 ${
          collapsed ? 'w-16' : 'w-56'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  )
}