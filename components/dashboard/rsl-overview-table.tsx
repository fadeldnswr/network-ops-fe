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
    customer_count: number
    bad_rsl_cust: number
    bad_homepass_list?: string
    fdt_names: string
    fat_names: string
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

// Define BadRSL tool tip component
const BadRSLToolTip = ({badCount, badHomepassList}: {badCount: number, badHomepassList?: string}) => {
  const homepassItems = useMemo(() => {
    if(!badHomepassList) return []
    return badHomepassList
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  }, [badHomepassList])

  // If there are no bad homepass items, return null to avoid rendering empty tooltip
  const hasToolTip = badCount > 0 && homepassItems.length > 0

  return (
    <div className="relative inline-block">
      <div className="group inline-block">
        <p
          className={`w-fit rounded px-2 py-0.5 font-medium text-center ${
            badCount > 0
              ? "bg-red-500/10 text-red-400 cursor-pointer"
              : "bg-transparent text-foreground"
          }`}
        >
          {badCount}
        </p>

        {hasToolTip && (
          <div className="invisible absolute left-1/2 top-full z-[9999] mt-2 w-72 -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-900 p-3 text-xs text-white opacity-0 shadow-xl transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
            <div className="mb-2 font-semibold text-slate-200">
              Bad RSL Homepass
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1">
              {homepassItems.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="break-all rounded bg-slate-800 px-2 py-1 text-slate-100"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
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
    <div className="rounded-lg border border-border bg-card/95 shadow-sm overflow-visible">

      <div className="overflow-x-auto overflow-y-visible">
        <table className="w-full min-w-190 border-collapse">
          <thead className="bg-secondary/30">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
                <p className="text-center">
                  OLT Name
                </p>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
                <p className="text-center">
                  PON Port
                </p>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
                <p className="text-center">
                  FDT Names
                </p>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
                <p className="text-center">
                  FAT Names
                </p>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
                <p className="text-center">
                  Total Customers
                </p>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
                <p className="text-center">
                  Bad RSL Customers
                </p>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
                <p className="text-center">
                  Status
                </p>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
                <p className="text-center">
                  Last Updated
                </p>
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
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
                    <p className="text-center">
                      {row.olt_name}
                    </p>
                  </td>

                  <td className="px-4 py-4 text-sm text-foreground whitespace-nowrap text-center">
                    <p className="text-center">
                      {row.pon_port}
                    </p>
                  </td>

                  <td className="px-4 py-4 text-sm text-foreground whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {row.fdt_names.split(",").map((item, index) => (
                        <span
                          key={index}
                          className="inline-block rounded bg-blue-500/10 text-blue-400 px-2 py-0.5 text-xs w-fit text-center"
                        >
                          {item.trim()}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-foreground whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {row.fat_names.split(",").map((item, index) => (
                        <span
                          key={index}
                          className="inline-block rounded bg-blue-500/10 text-blue-400 px-2 py-0.5 text-xs w-fit text-center"
                        >
                          {item.trim()}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-foreground whitespace-nowrap text-center">
                    {row.customer_count}
                  </td>

                  <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                    <BadRSLToolTip
                      badCount={row.bad_rsl_cust}
                      badHomepassList={row.bad_homepass_list}
                    />
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