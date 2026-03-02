'use client'

import { Badge } from '@/components/ui/badge'
import { CircleDot } from 'lucide-react'

interface StatusBadgeProps {
  status: 'healthy' | 'warning' | 'critical' | 'info'
  label: string
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusColors = {
    healthy: 'bg-status-healthy/10 text-status-healthy border-status-healthy/30 hover:bg-status-healthy/20',
    warning: 'bg-status-warning/10 text-status-warning border-status-warning/30 hover:bg-status-warning/20',
    critical: 'bg-status-critical/10 text-status-critical border-status-critical/30 hover:bg-status-critical/20',
    info: 'bg-status-info/10 text-status-info border-status-info/30 hover:bg-status-info/20',
  }

  const dotColors = {
    healthy: 'text-status-healthy',
    warning: 'text-status-warning',
    critical: 'text-status-critical',
    info: 'text-status-info',
  }

  return (
    <Badge variant="outline" className={statusColors[status]}>
      <CircleDot className={`mr-1 h-2 w-2 ${dotColors[status]}`} fill="currentColor" />
      {label}
    </Badge>
  )
}
