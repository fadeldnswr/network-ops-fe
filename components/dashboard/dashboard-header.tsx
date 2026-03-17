'use client'

import { Bell, Search, Settings, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

// Define props for dashboard header component
interface DashboardHeaderProps {
  title: string
  subtitle?: string
}

// Dashboard header component with company logo, title, and subtitle
export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40 shadow-sm">
      <div className="flex h-16 items-center justify-between p-10 gap-4">
        <div className="flex items-center gap-4 flex-1">
          {/* COMPANY LOGO */}
          <Image
            src="/tbg-logo.png"
            alt="Tower Bersama Group"
            width={120}
            height={120}
            className="object-contain"
          />
          {/* TITLE */}
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
