'use client'

import { Bell, Search, Settings, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DashboardHeaderProps {
  title: string
  subtitle?: string
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40 shadow-sm">
      <div className="flex h-16 items-center justify-between px-6 gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </header>
  )
}
