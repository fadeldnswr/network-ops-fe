'use client'

import { CircleAlert, Link, MapPin } from 'lucide-react'
import type { CityOverviewResponse } from '@/lib/types/city'
import { useState, useEffect } from 'react'
import { apiGet } from '@/lib/api/client'
import { DeviceOverviewResponse } from '@/lib/types/network-overview'
import { DeviceCard, DeviceCardProps } from '@/components/dashboard/device-card'
import { AlertSummaryCard } from '@/components/dashboard/alert-summary-card'
import { LinkConnection } from '@/lib/types/link-connection'

export default function CitiesPage() {
  // Define state for data fetch
  const [ont, setOnt] = useState<CityOverviewResponse | null>(null)
  const [data, setData] = useState<DeviceOverviewResponse | null>(null)
  const [linkConnection, setLinkConnection] = useState<LinkConnection | null>(null)

  // Define state for loading and error handling
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Create function to fetch city overview data from the API
  const fetchCityOverview = async () => {
    try {
      setError(null)
      const response = await apiGet<CityOverviewResponse>("/cities")
      setOnt(response)
    } catch (e: any) {
      setError(e?.message ?? "Failed to load data from server")
    } finally {
      setLoading(false)
    }
  }

  // Create function to fetch device overview data from the API
  const fetchDeviceOverview = async () => {
    try {
      setError(null)
      const response = await apiGet<DeviceOverviewResponse>("/devices")
      setData(response)
    } catch (e: any) {
      setError(e?.message ?? "Failed to load data from server")
    } finally {
      setLoading(false)
    }
  }
  
  // Create function to fetch link connection overview data from the API
  const fetchLinkConnectionOverview = async () => {
    try {
      setError(null)
      const response = await apiGet<LinkConnection>("/link-connection/")
      setLinkConnection(response)
    } catch (e: any) {
      setError(e?.message ?? "Failed to load data from server")
    } finally {
      setLoading(false)
    }
  }

  // Fetch city overview data on component mount
  useEffect(() => {
    // Initial fetch of all data
    fetchCityOverview()
    fetchDeviceOverview()
    fetchLinkConnectionOverview()

    // Set up interval to refresh data every 1 minute
    const id = setInterval(() => {
      fetchCityOverview()
      fetchDeviceOverview()
      fetchLinkConnectionOverview()
    }, 60 * 1000) // Refresh every 1 minute
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
  
  // Define function to calculate percentage
  const calculatePercentage = (part: number, total: number) => {
    if (total === 0) return "0.0"
    return Number(((part / total) * 100).toFixed(1))
  }

  // Define function to calculate severity
  const getAlertVariant = (value: number): "success" | "warning" | "danger" => {
    if (value === 0) return "success"
    if (value <= 20) return "warning"
    return "danger" 
  }

  // Extract ONT overview data
  const overview = ont?.overview
  const totalOnt = overview?.total_ont ?? 0
  const totalOnline = overview?.online_ont ?? 0
  const totalOffline = overview?.offline_ont ?? 0

  // Extract device overview data
  const totalRouter = data?.total_router ?? 0
  const activeRouter = data?.active_router ?? 0
  const inactiveRouter = data?.inactive_router ?? 0

  // Extract OLT overview data
  const totalOlt = data?.total_olt ?? 0
  const activeOlt = data?.active_olt ?? 0
  const inactiveOlt = data?.inactive_olt ?? 0

  // Calculate percentages with safe division
  const onlinePct = calculatePercentage(totalOnline, totalOnt)
  const offlinePct = calculatePercentage(totalOffline, totalOnt)
  const onlineRouterPct = calculatePercentage(activeRouter, totalRouter)
  const offlineRouterPct = calculatePercentage(inactiveRouter, totalRouter)
  const onlineOltPct = calculatePercentage(activeOlt, totalOlt)
  const offlineOltPct = calculatePercentage(inactiveOlt, totalOlt)

  // Define router stats
  const routerStats: DeviceCardProps[] = [
    { title: "Total Router", value: totalRouter },
    { title: "Online Router", value: activeRouter, percent: onlineRouterPct, variant: "success" },
    { title: "Offline Router", value: inactiveRouter, percent: offlineRouterPct, variant: "danger" },
  ]

  // Define OLT stats
  const oltStats: DeviceCardProps[] = [
    { title: "Total OLT", value: totalOlt },
    { title: "Online OLT", value: activeOlt, percent: onlineOltPct, variant: "success" },
    { title: "Offline OLT", value: inactiveOlt, percent: offlineOltPct, variant: "danger" },
  ]

  // Define ONT stats
  const ontStats: DeviceCardProps[] = [
    { title: "Total ONT", value: totalOnt },
    { title: "Online ONT", value: totalOnline, percent: onlinePct, variant: "success" },
    { title: "Offline ONT", value: totalOffline, percent: offlinePct, variant: "danger" },
  ]

  // Define link connection stats
  const alertCards = [
    { title: "Link Backhaul Down", key: "link_backhaul_down" },
    { title: "PON Loss OLT Down", key: "pon_loss_olt_down" },
    { title: "Uplink OLT Down", key: "uplink_olt_down" },
    { title: "LACP OLT Down", key: "lacp_olt_down" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Device Overview</h1>
        </div>
        <p className="text-muted-foreground">Monitor network performance across all service regions</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Router Statistics */}
        {routerStats.map((stat, key) => (
          <DeviceCard key={key} {...stat} />
        ))}

        {/* OLT Statistics */}
        {oltStats.map((stat, key) => (
          <DeviceCard key={key} {...stat} />
        ))}

        {/* ONT Statistics */}
        {ontStats.map((stat, key) => (
          <DeviceCard key={key} {...stat} />
        ))}

      </div>

      {/* Link Connnection */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Link className="w-6 h-6 text-primary" />
          <h1 className='text-2xl font-semibold text-foreground'>Link Connection</h1>
        </div>
        <p className="text-muted-foreground">Monitor link connection across multiple sites</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {alertCards.map((card) => {
          const value = linkConnection ? linkConnection[card.key as keyof LinkConnection] : 0
          return (
            <AlertSummaryCard
              key={card.key}
              title={card.title}
              value={value}
              variant={getAlertVariant(value)}
            />
          )
        })}
      </div>

      {/* Alert Table */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <CircleAlert className="w-6 h-6 text-primary" />
          <h1 className='text-2xl font-semibold text-foreground'>Alert Table</h1>
        </div>
        <p className="text-muted-foreground">View detailed alert information across all sites</p>
      </div>
    </div>
  )
}
