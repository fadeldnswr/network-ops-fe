'use client'

import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowDown, ArrowUp } from 'lucide-react'

interface KPICardProps {
  label: string
  value: string | number
  subtext?: string
  icon?: ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  className?: string
}

export function KPICard({
  label,
  value,
  subtext,
  icon,
  trend,
  trendValue,
  className,
}: KPICardProps) {
  return (
    <Card className={`bg-card border-border/50 ${className}`}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
            {subtext && <p className="mt-1 text-xs text-muted-foreground">{subtext}</p>}
          </div>
          {icon && <div className="ml-4 shrink-0 text-accent">{icon}</div>}
        </div>
        {trend && (
          <div className="mt-4 flex items-center gap-1">
            {trend === 'up' && <ArrowUp className="h-3 w-3 text-status-healthy" />}
            {trend === 'down' && <ArrowDown className="h-3 w-3 text-status-warning" />}
            {trendValue && <span className="text-xs text-muted-foreground">{trendValue}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
