'use client'

import { CityCard } from '@/components/dashboard/city-card'
import { MapPin, TrendingUp } from 'lucide-react'
import type { CityOverviewResponse } from '@/lib/types/city'
import { useState, useEffect } from 'react'
import { apiGet } from '@/lib/api/client'

export default function CitiesPage() {
  const [data, setData] = useState<CityOverviewResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Create function to fetch city overview data from the API
  const fetchCityOverview = async () => {
    try {
      setError(null)
      const response = await apiGet<CityOverviewResponse>("/cities")
      setData(response)
    } catch (e: any) {
      setError(e?.message ?? "Failed to load data from server")
    } finally {
      setLoading(false)
    }
  }

  // Fetch city overview data on component mount
  useEffect(() => {
    fetchCityOverview()
    const id = setInterval(fetchCityOverview, 60 * 1000) // Refresh every 5 minutes
    return () => clearInterval(id)
  }, [])

  // Handle loading and error states
  if (loading && !data) return <div className='p-5'>Loading...</div>

  // Handle error
  if(error && !data) {
    return (
      <div className='p-6'>
        <div className='rounded-md border border-border p-4'>
          <div className='text-red-500'>Data temporarily not available</div>
          <div className='font-semibold'>{error}</div>
        </div>
      </div>
    )
  }

  // Extract overview data
  const overview = data?.overview
  const totalOnt = overview?.total_ont ?? 0
  const totalOnline = overview?.online_ont ?? 0
  const totalOffline = overview?.offline_ont ?? 0
  const avgHealthScore = overview?.avg_health_score_pct ?? 0
  const totalTickets = overview?.active_tt_total ?? 0

  // Calculate percentages with safe division
  const onlinePct = totalOnt > 0 ? ((totalOnline / totalOnt) * 100).toFixed(1) : "0.0"
  const offlinePct = totalOnt> 0 ? ((totalOffline / totalOnt) * 100).toFixed(1) : "0.0"

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">ONT Overview</h1>
        </div>
        <p className="text-muted-foreground">Monitor router network performance and health score across all service regions</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Total ONT</p>
          <p className="text-3xl font-bold text-foreground">{totalOnt.toLocaleString()}</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <p className="text-sm text-green-400 mb-2">Online ONT</p>
          <p className="text-3xl font-bold text-green-400">{totalOnline.toLocaleString()}</p>
          <p className="text-xs text-green-400 mt-1">{onlinePct}%</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-sm text-red-400 mb-2">Offline ONT</p>
          <p className="text-3xl font-bold text-red-400">{totalOffline.toLocaleString()}</p>
          <p className="text-xs text-red-400 mt-1">{offlinePct}%</p>
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
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-5 h-5" />
          <h3 className="text-2xl font-bold text-foreground">Cities & Regions</h3>
        </div>
        <p className="text-muted-foreground pb-6">View detailed information about each city and region</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.cities.map((city) => {
            return (
              <CityCard key={city.city} city={city}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}
