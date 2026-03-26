'use client'

import { ActivitySquare } from 'lucide-react'
import { RSLOverviewTable, type RSLOverviewRow } from '@/components/dashboard/rsl-overview-table'
import { RSLOutputResponse, RSLOutputRow, RSLStatus } from '@/lib/types/olt-rsl'
import { useEffect, useMemo, useState } from 'react'
import { apiGet } from '@/lib/api/client'
import { Search } from 'lucide-react'

// Define status options for RSL table
const statusOption: RSLStatus[] = ["GOOD", "WARN", "CRIT"]

export default function RSL() {
  // Define state variables for query, RSL data, search input, loading state, and error message
  const [query, setQuery]= useState<RSLStatus>("WARN")
  const [rslData, setRslData] = useState<RSLOutputRow[]>([])
  const [search, setSearch] = useState<string>("")
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
  const fetchRSLOverview = async (status: RSLStatus) => {
    try {
      setError(null)
      setLoading(true)

      // Fetch data from API
      const response = await apiGet<RSLOutputResponse>(
        `/olt-table/?query_status=${encodeURIComponent(status)}`
      )

      // Ensure response data is an array and map to table rows
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

  // Define function to filter RSL data based on search query
  const filteredData = useMemo(() => {
    // Trim and convert search query to lowercase for case insensitive matching
    const keyword = search.trim().toLowerCase()
    
    // If search query is empty, return all RSL data
    if (!keyword) return rslData

    // Return filtered RSL data where any of the specified fields include the search keyword
    return rslData.filter((item) => {
      return (
        item.olt_name.toLowerCase().includes(keyword) ||
        item.pon_port.toLowerCase().includes(keyword) ||
        item.status.toLowerCase().includes(keyword)
      )
    })
  }, [search, rslData])

  // Fetch RSL overview data on component mount
  useEffect(() => {
    // Initial fetch of RSL overview data based on default query status
    fetchRSLOverview(query)

    // Set up interval to refresh data every 5 minutes
    const id = setInterval(() => {
      fetchRSLOverview(query)
    }, 5 * 60 * 1000)

    // Clear interval on component unmount
    return () => clearInterval(id)
  }, [query])

  // Return JSX for RSL overview page
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

        {/* Query Button */}
        <div className='flex flex-wrap gap-2'>
          {statusOption.map((status) => {
            const isActive = query === status
            return (
              <button
                key={status}
                className={[
                  'rounded-md px-4 py-2 text-sm font-medium transition',
                  isActive
                    ? status === 'CRIT'
                      ? 'bg-red-500/15 text-red-400'
                      : status === 'WARN'
                      ? 'bg-amber-500/15 text-amber-400'
                      : 'bg-emerald-500/15 text-emerald-400'
                    : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground',
                ].join(' ')}
                onClick={() => setQuery(status)}>
                {status}
              </button>
            )
          })}
        </div>
        
        {/* Search Bar */}
        <div className='relative w-full md:w-80'>
          <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search'
          className='w-full rounded-md border border-border bg-card py-2 pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary'
          />
        </div>
        {error ? (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        ) : (

          // Render RSL overview table with filtered data
          <RSLOverviewTable
            data={filteredData}
            emptyMessage={loading ? 'Loading RSL overview data...' : search.trim() ? "No matching RSL data found." : "No RSL data available."}
            pageSize={10}
          />
        )}
      </section>
    </div>
  )
}
