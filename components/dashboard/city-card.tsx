'use client'

import { Card } from '@/components/ui/card'
import { City } from '@/lib/store'
import { CityRow } from '@/lib/types/city'
import { Activity, Zap, Lightbulb } from 'lucide-react'

interface CityCardProps {
  city: CityRow
}

export function CityCard({ city }: CityCardProps) {
  const total = city.total_ont ?? 0
  const online = city.online_ont ?? 0
  const offline = city.offline_ont ?? 0
  const onlinePercentage = total > 0 ? ((online / total) * 100).toFixed(1) : "0.0"
  const offlinePercentage = total > 0 ? ((offline / total) * 100).toFixed(1) : "0.0"

  const score = Number(city.health_score ?? 0)
  const getHealthColor = (score: number) => {
    if(score >= 95) return "text-green-500"
    if(score >= 85) return "text-blue-500"
    if(score >= 70) return "text-yellow-500"
    return "text-red-500"
  } 

  // Get total tickets in progress by summing incident and complaint counts, with safe defaults
  const getTotalTickets = (city.tt?.incident ?? 0) + (city.tt?.complaint ?? 0)

  // Severity color based on AI recommendation severity level
  const severityClass =
    city.ai_severity === 'CRIT'
      ? 'text-red-400'
      : city.ai_severity === 'WARN'
      ? 'text-amber-400'
      : 'text-green-400'
  
  return (
    <Card className="card-elevated p-4 hover:border-primary/50 transition-all duration-300">
      <div className="space-y-3">
        {/* Header */}
        <div className="pb-2 border-b border-border">
          <div className='flex items-center justify-between gap-2'>
            <h3 className="text-lg font-bold text-foreground">{city.city}</h3>
            <span className={`text-xs font-semibold ${severityClass}`}>
              {city.ai_severity}
            </span>
          </div>
          <p className='text-xs text-muted-foreground'>{city.as_of}</p>
        </div>

        {/* ONT Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-secondary/40 rounded-lg p-2 border border-border/50">
            <p className="text-xs text-muted-foreground mb-0.5 font-medium">Total</p>
            <p className="text-base font-bold text-foreground">{total.toLocaleString()}</p>
          </div>
          <div className="bg-green-500/10 rounded-lg p-2 border border-green-500/20">
            <p className="text-xs text-green-400 mb-0.5 font-medium">Online</p>
            <p className="text-base font-bold text-green-400">{online.toLocaleString()}</p>
            <p className="text-xs text-green-400">{onlinePercentage}%</p>
          </div>
          <div className="bg-red-500/10 rounded-lg p-2 border border-red-500/20">
            <p className="text-xs text-red-400 mb-0.5 font-medium">Offline</p>
            <p className="text-base font-bold text-red-400">{offline.toLocaleString()}</p>
            <p className="text-xs text-red-400">{offlinePercentage}%</p>
          </div>
        </div>

        {/* Network Health Score */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <Activity className="w-3 h-3" />
              Health
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-secondary rounded-full h-1.5">
                <div
                  className={`${getHealthColor(score)} bg-current h-1.5 rounded-full`}
                  style={{ width: `${Math.max(0, Math.min(100, score))}%` }}
                />
              </div>
              <p className={`text-sm font-bold ${getHealthColor(score)}`}>
                {score}%
              </p>
            </div>
          </div>
          <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                background: `conic-gradient(rgb(34, 197, 94) 0% ${score}%, rgb(107, 114, 128) ${score}% 100%)`,
              }}
            >
              {score}
            </div>
          </div>
        </div>

        {/* TT In Progress */}
        <div>
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Zap className="w-3 h-3" />
            TT ({city.tt?.total ?? getTotalTickets})
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-orange-500/10 rounded-lg p-2 border border-orange-500/20">
              <p className="text-xs text-orange-600 mb-0.5">Incident</p>
              <p className="text-sm font-bold text-orange-600">{city.tt?.incident ?? 0}</p>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-2 border border-blue-500/20">
              <p className="text-xs text-blue-600 mb-0.5">Complain</p>
              <p className="text-sm font-bold text-blue-600">{city.tt?.complaint ?? 0}</p>
            </div>
          </div>
        </div>

        {/* AI Prescriptive Recommendation */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-3 border border-primary/20">
          <p className="text-xs font-semibold text-primary mb-2 flex items-center gap-2">
            <Lightbulb className="w-3 h-3" />
            AI Recommendation
          </p>
          <p className="text-xs text-foreground leading-relaxed">{city.ai_recommendation ?? "-"}</p>
        </div>
      </div>
    </Card>
  )
}
