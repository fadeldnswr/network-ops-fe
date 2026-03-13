'use client'


import { ActivitySquare } from 'lucide-react'
import { RSLOverviewTable, type RSLOverviewRow } from '@/components/dashboard/rsl-overview-table'
import { RSLOutputResponse, RSLOutputRow, RSLStatus } from '@/lib/types/olt-rsl'
import { useEffect, useState } from 'react'
import { apiGet } from '@/lib/api/client'

export default function RSL() {
  const [rslData, setRslData] = useState<RSLOutputRow[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Define function to normalize RSL status
  const normalizeRSLStatus = (value: string): RSLStatus => {
    const status = value.toUpperCase()
    if (status === 'CRIT') return 'CRIT'
    if (status === 'WARN') return 'WARN'
    return 'GOOD'
  }

  // Define function to fetch RSL overview data from API
  const fetchRSLOverview = async () => {
    try {
      setError(null)
      setLoading(true)

      // Fetch data from API
      const response = await apiGet<RSLOutputResponse>("/olt-table/")
      const rows = Array.isArray(response.data) ? response.data : []

      // Map each value to rows
      const mapped: RSLOutputRow[] = rows.map((item, index) => ({
        id: `${item.olt_name}-${item.pon_port}-${index}`,
        olt_name: item.olt_name,
        pon_port: item.pon_port,
        rsl_percent: item.rsl_percent,
        status: normalizeRSLStatus(item.status),
        last_updated: new Date(item.last_updated).toLocaleString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      }))
      setRslData(mapped)
    } catch (e: any) {
      console.error("Error fetching RSL overview data:", e)
      setError('Failed to fetch RSL overview data.')
      setRslData([])
    } finally {
      setLoading(false)
    }
  }

  // Fetch RSL overview data on component mount
  useEffect(() => {
    fetchRSLOverview()

    const id = setInterval(() => {
      fetchRSLOverview()
    }, 5 * 60 * 1000)
  }, [])

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ActivitySquare className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-semibold text-foreground">RSL Overview Table</h1>
          </div>
          <p className="text-muted-foreground">
            View OLT PON port status based on current RSL percentage threshold
          </p>
        </div>

        {error ? (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        ) : (
          <RSLOverviewTable
            data={rslData}
            emptyMessage={loading ? 'Loading RSL overview data...' : 'No RSL overview data available.'}
            pageSize={10}
          />
        )}
      </section>
    </div>
  )
}
