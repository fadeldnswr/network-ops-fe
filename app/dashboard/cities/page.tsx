'use client'

import { CityCard } from '@/components/dashboard/city-card'
import { useNocStore } from '@/lib/store'
import { MapPin, TrendingUp } from 'lucide-react'

export default function CitiesPage() {
  const cities = useNocStore((state) => state.cities)

  // Calculate overall stats
  const totalOnt = cities.reduce((sum, city) => sum + city.totalOnt, 0)
  const totalOnline = cities.reduce((sum, city) => sum + city.ontOnline, 0)
  const totalOffline = cities.reduce((sum, city) => sum + city.ontOffline, 0)
  const avgHealthScore = (cities.reduce((sum, city) => sum + city.networkHealthScore, 0) / cities.length).toFixed(1)
  const totalTickets = cities.reduce((sum, city) => sum + city.ticketsInProgress.incident + city.ticketsInProgress.complain, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">City Overview</h1>
        </div>
        <p className="text-muted-foreground">Monitor network performance across all service regions</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Total ONT</p>
          <p className="text-3xl font-bold text-foreground">{totalOnt}</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <p className="text-sm text-green-400 mb-2">Online ONT</p>
          <p className="text-3xl font-bold text-green-400">{totalOnline}</p>
          <p className="text-xs text-green-400 mt-1">{((totalOnline / totalOnt) * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-sm text-red-400 mb-2">Offline ONT</p>
          <p className="text-3xl font-bold text-red-400">{totalOffline}</p>
          <p className="text-xs text-red-400 mt-1">{((totalOffline / totalOnt) * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <p className="text-sm text-primary mb-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Avg Health Score
          </p>
          <p className="text-3xl font-bold text-primary">{avgHealthScore}%</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
          <p className="text-sm text-amber-400 mb-2">Active TT</p>
          <p className="text-3xl font-bold text-amber-400">{totalTickets}</p>
        </div>
      </div>

      {/* Cities Grid - Smaller Cards */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Cities & Regions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </div>
  )
}
