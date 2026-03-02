'use client'

import { useNocStore } from '@/lib/store'
import { DataTable } from '@/components/dashboard/data-table'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { KPICard } from '@/components/dashboard/kpi-card'
import { AlertTriangle, Plus } from 'lucide-react'

export default function IncidentMonitoringPage() {
  const store = useNocStore()

  const openIncidents = store.incidents.filter((i) => i.status === 'open' || i.status === 'in-progress')
  const resolvedIncidents = store.incidents.filter((i) => i.status === 'resolved')
  const criticalIncidents = store.incidents.filter((i) => i.severity === 'critical')

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Total Incidents"
          value={store.incidents.length}
          subtext="All time"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
        <KPICard
          label="Open Incidents"
          value={openIncidents.length}
          subtext="Requiring action"
          trend={openIncidents.length > 0 ? 'down' : 'up'}
        />
        <KPICard
          label="Critical Severity"
          value={criticalIncidents.length}
          subtext="Highest priority"
          trend={criticalIncidents.length > 1 ? 'down' : 'up'}
        />
        <KPICard
          label="Resolved (24h)"
          value={resolvedIncidents.length}
          subtext="Mean resolution time: 2.5h"
        />
      </div>

      {/* Active Incidents */}
      <Card className="bg-card border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Active Incidents</CardTitle>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Incident
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'title', label: 'Title' },
              {
                key: 'severity',
                label: 'Severity',
                render: (value) => (
                  <StatusBadge
                    status={value === 'critical' ? 'critical' : value === 'high' ? 'warning' : value === 'medium' ? 'info' : 'healthy'}
                    label={String(value).toUpperCase()}
                  />
                ),
              },
              {
                key: 'status',
                label: 'Status',
                render: (value) => (
                  <StatusBadge
                    status={value === 'open' ? 'critical' : value === 'in-progress' ? 'warning' : 'healthy'}
                    label={String(value).replace('-', ' ').toUpperCase()}
                  />
                ),
              },
              { key: 'affectedServices', label: 'Affected Services' },
              {
                key: 'createdAt',
                label: 'Created',
                render: (value) => new Date(value as string).toLocaleTimeString(),
              },
            ]}
            data={store.incidents.map((inc) => ({
              ...inc,
              createdAt: inc.createdAt.toISOString(),
              updatedAt: inc.updatedAt.toISOString(),
            }))}
            pageSize={10}
          />
        </CardContent>
      </Card>

      {/* Incident Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Incident Breakdown by Severity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {['critical', 'high', 'medium', 'low'].map((sev) => {
              const count = store.incidents.filter((i) => i.severity === sev).length
              const statusMap: Record<string, 'critical' | 'warning' | 'info' | 'healthy'> = {
                critical: 'critical',
                high: 'warning',
                medium: 'info',
                low: 'healthy',
              }
              return (
                <div key={sev} className="flex justify-between items-center pb-2 border-b border-border/50 last:border-0">
                  <span className="text-muted-foreground capitalize">{sev}</span>
                  <StatusBadge status={statusMap[sev]} label={String(count)} />
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Incident Breakdown by Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { status: 'open', label: 'Open' },
              { status: 'in-progress', label: 'In Progress' },
              { status: 'resolved', label: 'Resolved' },
            ].map(({ status, label }) => {
              const count = store.incidents.filter((i) => i.status === status).length
              const statusMap: Record<string, 'critical' | 'warning' | 'healthy'> = {
                open: 'critical',
                'in-progress': 'warning',
                resolved: 'healthy',
              }
              return (
                <div key={status} className="flex justify-between items-center pb-2 border-b border-border/50 last:border-0">
                  <span className="text-muted-foreground">{label}</span>
                  <StatusBadge status={statusMap[status]} label={String(count)} />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
