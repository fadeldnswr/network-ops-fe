'use client'

import { Cable, CircleAlert, Link, MapPin, Network, WifiOff, Activity, HardDrive, Server, User, Search } from 'lucide-react'
import type { CityOverviewResponse } from '@/lib/types/city'
import { useState, useEffect, useMemo } from 'react'
import { apiGet } from '@/lib/api/client'
import { DeviceOverviewResponse } from '@/lib/types/network-overview'
import { DeviceCard, DeviceCardProps } from '@/components/dashboard/device-card'
import { AlertSummaryCard } from '@/components/dashboard/alert-summary-card'
import { LinkConnection } from '@/lib/types/link-connection'
import { AlertTable, SeverityBadge, type AlertColumn } from '@/components/dashboard/alert-table'
import { AlertApiResponse, AlertTableRow } from '@/lib/types/alert-table'

// Define columns for alert table
const alertColumns: AlertColumn<AlertTableRow>[] = [
  {
    key: 'timestamp',
    header: 'Timestamp',
    className: 'whitespace-nowrap text-muted-foreground',
  },
  {
    key: 'site',
    header: 'Site',
    className: 'whitespace-nowrap',
  },
  {
    key: 'device',
    header: 'Device',
    className: 'whitespace-nowrap font-medium',
  },
  {
    key: 'port',
    header: 'Port',
    className: 'whitespace-nowrap',
  },
  {
    key: 'alert_type',
    header: 'Alert Type',
    className: 'whitespace-nowrap',
  },
  {
    key: 'severity',
    header: 'Severity',
    render: (row) => <SeverityBadge severity={row.severity} />,
  },
  {
    key: 'status',
    header: 'Status',
    className: 'whitespace-nowrap',
  },
  {
    key: 'description',
    header: 'Description',
    className: 'min-w-[280px] text-muted-foreground',
  },
]

export default function CitiesPage() {
  // Define state for data fetch
  const [ont, setOnt] = useState<CityOverviewResponse | null>(null)
  const [data, setData] = useState<DeviceOverviewResponse | null>(null)
  const [linkConnection, setLinkConnection] = useState<LinkConnection | null>(null)
  const [alertTable, setAlertTable] = useState<AlertTableRow[]>([])
  const [searchData, setSearchData] = useState<string>("");

  // Define state for loading and error handling
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Define function to normalize severity
  const normalizeSeverity = (value: string): "critical" | "warning" | "info" | "normal" => {
    const severity = value.toLowerCase()
    if(severity === "critical") return "critical"
    if(severity === "warning") return "warning"
    if(severity === "info") return "info"
    return "normal" 
  } 

  // Create functiont to fetch alert table data from the API
  const fetchAlertTable = async () => {
    try {
      setError(null)
      
      // Fetch alert table data from the API and log the raw response for debugging
      const response = await apiGet<AlertApiResponse>("/alert-table/")
      console.log("raw response: ", response)
      console.log("is array: ", Array.isArray(response))
      console.log("data field: ", (response as any).data)

      // Map API response to alert table rows and log the mapped result for debugging
      const mapped: AlertTableRow[] = response.data.map((item, index) => ({
        id: `${item.device}-${item.timestamp}-${index}`,
        timestamp: new Date(item.timestamp).toLocaleString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        site: item.site,
        device: item.device,
        port: item.port,
        alert_type: item.alert_type,
        severity: normalizeSeverity(item.severity),
        status: item.status,
        description: item.description,
      }))
      setAlertTable(mapped)
      console.log("mapped alert table:", mapped)
      console.log("mapped length:", mapped.length)
    } catch (e: any) {
      console.error("Fetch table error", e)
      setError(e?.message ?? "Failed to load alert data from server")
      setAlertTable([])
    } finally {
      setLoading(false)
    }
  }

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

  // Define function to search alert table based on user input
  const filteredTable = useMemo(() => {
    // Trime and convert search query to lowercase for case-insensitive matching
    const keyword = searchData.trim().toLowerCase()

    // If search query is empty, return original alert table data
    if(!keyword) return alertTable

    // Return filtered alert table data based on device name, site, or alert type matching the search query
    return alertTable.filter((item) => {
      return (
        item.device.toLowerCase().includes(keyword) ||
        item.site.toLowerCase().includes(keyword) ||
        item.alert_type.toLowerCase().includes(keyword)
      )
    })
  }, [searchData, alertTable])

  // Fetch city overview data on component mount
  useEffect(() => {
    // Initial fetch of all data
    fetchCityOverview()
    fetchDeviceOverview()
    fetchLinkConnectionOverview()
    fetchAlertTable()

    // Set up interval to refresh data every 1 minute
    const id = setInterval(() => {
      fetchCityOverview()
      fetchDeviceOverview()
      fetchLinkConnectionOverview()
      fetchAlertTable()
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
    { title: "Total Router", value: totalRouter, icon: <HardDrive className="h-5 w-5" /> },
    { title: "Online Router", value: activeRouter, percent: onlineRouterPct, variant: "success", icon: <HardDrive className="h-5 w-5" /> },
    { title: "Offline Router", value: inactiveRouter, percent: offlineRouterPct, variant: "danger", icon: <HardDrive className="h-5 w-5" /> },
  ]

  // Define OLT stats
  const oltStats: DeviceCardProps[] = [
    { title: "Total OLT", value: totalOlt, icon: <Server className="h-5 w-5" /> },
    { title: "Online OLT", value: activeOlt, percent: onlineOltPct, variant: "success", icon: <Server className="h-5 w-5" /> },
    { title: "Offline OLT", value: inactiveOlt, percent: offlineOltPct, variant: "danger", icon: <Server className="h-5 w-5" /> },
  ]

  // Define ONT stats
  const ontStats: DeviceCardProps[] = [
    { title: "Total ONT", value: totalOnt, icon: <User className='h-5 w-5' /> },
    { title: "Online ONT", value: totalOnline, percent: onlinePct, variant: "success", icon: <User className='h-5 w-5' /> },
    { title: "Offline ONT", value: totalOffline, percent: offlinePct, variant: "danger", icon: <User className='h-5 w-5' /> },
  ]

  // Define link connection stats
  const alertCards = [
    {
      title: "Link Backhaul Down",
      key: "link_backhaul_down",
      icon: <Network className="h-6 w-6" />,
    },
    {
      title: "OLT PON Loss",
      key: "pon_loss_olt_down",
      icon: <WifiOff className="h-6 w-6" />,
    },
    {
      title: "Uplink OLT Down",
      key: "uplink_olt_down",
      icon: <Cable className="h-6 w-6" />,
    },
    {
      title: "Last 24H Congest",
      key: "lacp_olt_down",
      icon: <Activity className="h-6 w-6" />,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Top Section: Device Overview + Link Connection side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.2fr] gap-6 items-start">
        
        {/* Device Overview */}
        <section className="space-y-4 min-w-0">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Device Overview</h1>
            </div>
            <p className="text-muted-foreground">
              Monitor network performance across all service regions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Router Statistics */}
            {routerStats.map((stat, key) => (
              <DeviceCard key={`router-${key}`} {...stat} />
            ))}

            {/* OLT Statistics */}
            {oltStats.map((stat, key) => (
              <DeviceCard key={`olt-${key}`} {...stat} />
            ))}

            {/* ONT Statistics */}
            {ontStats.map((stat, key) => (
              <DeviceCard key={`ont-${key}`} {...stat} />
            ))}
          </div>
        </section>

        {/* Link Connection */}
        <section className="space-y-4 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 auto-rows-fr mt-21">
            {alertCards.map((card) => {
              const value = linkConnection
                ? linkConnection[card.key as keyof LinkConnection]
                : 0
              return (
                <AlertSummaryCard
                  key={card.key}
                  title={card.title}
                  value={value}
                  variant={getAlertVariant(value)}
                  className="h-full"
                  icon={card.icon}
                />
              )
            })}
          </div>
        </section>
      </div>

      {/* Alert Table */}
      <section className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CircleAlert className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-semibold text-foreground">Alert Table</h1>
          </div>
          <p className="text-muted-foreground">
            View detailed alert information across all sites
          </p>
        </div>
        
        {/* Search Input */}
        <div className='relative w-full sm:w-72'>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
          <input
            type="text"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder='Search'
            className='w-full rounded-md border border-border bg-card py-2 pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary'
          />
        </div>
        <AlertTable
          title="Active Alerts"
          description="Current alarm and incident list across monitored devices"
          columns={alertColumns}
          data={filteredTable}
          emptyMessage="No active alerts at the moment."
          pageSize={5}
        />
      </section>
    </div>
  )
}
