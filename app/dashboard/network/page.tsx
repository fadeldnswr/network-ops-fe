'use client'

import { KPICard } from '@/components/dashboard/kpi-card'
import { AlertTriangle, TrendingUp, Zap, Network } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NetworkOverviewResponse } from '@/lib/types/network-overview'
import { apiGet } from '@/lib/api/client'

export default function NetworkMonitoringPage() {
  const [data, setData] = useState<NetworkOverviewResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [city, setCity] = useState<string>("gto") // Default city selection

  // Define grafana url
  const grafanaApi = process.env.NEXT_PUBLIC_GRAFANA_KEY
  const grafanaUrl = `http://192.168.254.4:3000/d/d8324300-1942-4d85-9b7d-7d0cd485b004/router-site-visualization?orgId=1&from=1772589123775&to=1772761923775&timezone=browser&var-site_code=${city}&var-query0=&var-hostname=$__all&__feature.dashboardSceneSolo=true&auth_token=${grafanaApi}`

  // Define function to fetch network overview data
  const fetchNetworkOverview = async () => {
    try {
      setError(null)
      const response = await apiGet<NetworkOverviewResponse>("/network-overview/")
      setData(response)
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load data from server')
    } finally {
      setLoading(false)
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    // Initial fetch
    fetchNetworkOverview()

    // Set up interval to refresh data every 60 seconds
    const id = setInterval(() => {
      fetchNetworkOverview()
    }, 60000)

    // Cleanup interval on component unmount
    return () => clearInterval(id)
  }, [])

  // Handle loading
  if(loading && !data) return <div className='p-6'>Loading...</div> 

  // Handle error
  if(error && !data){
    return (
      <div className='p-6'>
        <div className='rounded-md border border-border p-4'>
          <div className='text-red-500 font-semibold'>Failed to load network overview data</div>
          <div>{error}</div>
        </div>
      </div>
    )
  }

  // Destructure values from data
  const { total_bandwidth, current_usage, usage_percent, in_bps, out_bps, in_gb, out_gb } = data!

  // Convert to Gbps for display
  const in_bps_gbps = in_bps / 1e9
  const out_bps_gbps = out_bps / 1e9

  return (
    <div className="space-y-6">
      <div>
        <div className='flex items-center gap-2'>
          <Network className="w-6 h-6 text-primary" />
          <h3 className='text-2xl font-bold text-foreground '>
            Network Metrics Overview
          </h3>
        </div>
        <p className='text-sm text-muted-foreground'>
          Real-time overview of network performance and bandwidth usage across all sites
        </p>
      </div>
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard
          label="Total Bandwidth"
          value={`${total_bandwidth} GB`}
          subtext={`Current Usage: ${current_usage.toFixed(1)} Gbps`}
          icon={<Zap className="h-5 w-5" />}
          trend="up"
          trendValue={`${usage_percent.toFixed(1)}% from last hour`}
        />
        <KPICard
          label="Inbound Traffic"
          value={`${in_bps_gbps.toFixed(1)} Gbps`}
          subtext='Data flowing from external devices'
          icon={<TrendingUp className="h-5 w-5" />}
          trend="up"
          trendValue="-2.1ms improvement"
        />
        <KPICard
          label="Outbound Traffic"
          value={`${out_bps_gbps.toFixed(1)} Gbps`}
          subtext='Data leaving from network to external destination'
          icon={<AlertTriangle className="h-5 w-5" />}
          trend="neutral"
          trendValue="Within limits"
        />
      </div>
      {/* Button */}
      <div>
        <div>
          <p className='p-2 text-sm text-foreground'>Choose site area</p>
        </div>
        <div>
          <select
          onChange={(e) => setCity(e.target.value)}
          value={city}
          className='w-full p-2.5 text-slate-200 border border-slate-700 rounded-lg 
               focus:ring-2 focus:ring-blue-700 focus:border-transparent outline-none 
               transition-all duration-200 cursor-pointer hover:bg-[#1e293b]'
          >
            <option value="gto">Gorontalo</option>
            <option value="jmb">Jambi</option>
            <option value="wsb">Wonosobo</option>
            <option value="smgn">Simalungun</option>
          </select>
        </div>
      </div>
      {/* Charts */}
      <div className="gap-6 border rounded-md p-4">
        <div className='pb-4'>
          <h2 className='text-xl font-bold text-foreground'>
            Network Traffic Dashboard
          </h2>
          <p className='text-xs text-muted-foreground mt-0.5'>
            Router traffic visualization using Grafana
          </p>
        </div>
        <iframe
          src={grafanaUrl}
          width="100%"
          height="500"
          style={{border: 'none'}}
          title='Network Traffic Dashboard'
        ></iframe>
      </div>
    </div>
  )
}