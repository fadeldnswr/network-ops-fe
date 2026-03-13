'use client'

import React, {useState, useMemo } from "react"

// Define rsl status types
export type RSLStatus = "CRIT" | "WARN" | "GOOD"

// Define rsl overview row
export type RSLOverviewRow = {
    id: number|string
    olt_name: string
    pon_port: string
    status: RSLStatus
    last_updated: string
}

// Define props for RSLOverviewTable
type RSLTableProps = {
    data: RSLOverviewRow[]
    title?: string
    description?: string
    emptyMessage?: string
    pageSize?: number
}

// Define function to map status to badge color
const RSLStatusBadge = ({ status } : {status: RSLStatus }) => {
    const styles: Record<RSLStatus, string> = {
        CRIT: 'bg-red-500/15 text-red-400 border border-red-500/30',
        WARN: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
        GOOD: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    }
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>
            {status}
        </span>
    )
}

// Define components function
export function RSLOverviewTable({
    data,
    emptyMessage = "No RSL data available",
    pageSize = 5
}: RSLTableProps){
    const [currentPage, setCurrentPage] = useState(1)

    // Calculate total pages and paginated data
    const totalPages = Math.max(1, Math.ceil(data.length / pageSize))
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize
        const end = start + pageSize
        return data.slice(start, end)
    }, [data, currentPage, pageSize])

    // Define start row and end row
    const startRow = data.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
    const endRow = Math.min(currentPage * pageSize, data.length)

    // Define function to handle page change
    const goToPrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }
    const goToNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }

  return (
    <div className="rounded-lg border border-border bg-card/95 shadow-sm overflow-hidden">

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <thead className="bg-secondary/30">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
                OLT Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
                PON Port
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
                Last Updated
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={row.id ?? rowIndex}
                  className="border-b border-border/70 transition-colors hover:bg-secondary/20"
                >
                  <td className="px-4 py-4 text-sm text-foreground font-medium whitespace-nowrap">
                    {row.olt_name}
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground whitespace-nowrap">
                    {row.pon_port}
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground whitespace-nowrap">
                    <RSLStatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground whitespace-nowrap">
                    {row.last_updated}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {data.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-border px-4 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startRow}-{endRow} of {data.length} rows
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}