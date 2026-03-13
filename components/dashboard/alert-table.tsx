"use client"

import React, { useMemo, useState } from "react"

// Define type for alert severity levels
export type AlertSeverity = 'critical' | 'warning' | 'info' | "normal"

// Define type for alert column
export type AlertColumn<T> = {
    key: keyof T | string
    header: string
    className?: string
    render?: (row: T) => React.ReactNode
}

// Define alert table props
export type AlertTableProps<T> = {
    title?: string
    description?: string
    columns: AlertColumn<T>[]
    data: T[]
    emptyMessage?: string
    pageSize?: number
}

// Define function to map alert levels
function SeverityBadge({ severity }: { severity: AlertSeverity }){
    const styles: Record<AlertSeverity, string> = {
        critical: 'bg-red-500/15 text-red-400 border border-red-500/30',
        warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
        info: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
        normal: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    }

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${styles[severity]}`}>
            {severity}
        </span>
    )
}

// Define alert table component
export function AlertTable<T extends Record<string, any>>({
    columns,
    data,
    emptyMessage = 'No alerts found.',
    pageSize = 10,
}: AlertTableProps<T>){

    // Define state for pagination
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.max(1, Math.ceil(data.length / pageSize))
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize
        const end = start + pageSize
        return data.slice(start, end)
    }, [data, currentPage, pageSize])

    // Define row 
    const startRow = data.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
    const endRow = Math.min(currentPage * pageSize, data.length)

    // Define next and previous algorithm
    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }

    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }


      return (
    <div className="rounded-lg border border-border bg-card/95 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead className="bg-secondary/30">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={`${String(col.key)}-${idx}`}
                  className={`px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border ${col.className ?? ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
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
                  {columns.map((col, colIndex) => {
                    const value =
                      typeof col.key === "string" && col.key in row
                        ? row[col.key]
                        : row[col.key as keyof T]

                    return (
                      <td
                        key={`${String(col.key)}-${colIndex}`}
                        className={`px-4 py-4 text-sm text-foreground align-middle ${col.className ?? ""}`}
                      >
                        {col.render ? col.render(row) : value ?? "-"}
                      </td>
                    )
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-border px-4 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startRow}-{endRow} of {data.length} alerts
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={nextPage}
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

export { SeverityBadge }