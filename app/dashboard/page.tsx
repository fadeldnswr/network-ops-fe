'use client'

import { useNocStore } from '@/lib/store'
import { KPICard } from '@/components/dashboard/kpi-card'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { LineChartComponent, PieChartComponent } from '@/components/dashboard/charts'
import { DataTable } from '@/components/dashboard/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, AlertTriangle, Server, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const store = useNocStore()

  const uptime24h = Array.from({ length: 24 }, (_, i) => ({
    name: `${i}h`,
    uptime: 98 + Math.random() * 2,
  }))

  const deviceStatus = [
    { name: 'Healthy', value: store.getHealthyDeviceCount() },
    { name: 'Warning', value: store.getWarningDeviceCount() },
    { name: 'Critical', value: store.getCriticalDeviceCount() },
  ]

  const topIncidents = store.incidents.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Network Devices"
          value={store.devices.length}
          subtext={`${store.getHealthyDeviceCount()} healthy`}
          icon={<Server className="h-5 w-5" />}
          trend="up"
          trendValue="All operational"
        />
        <KPICard
          label="Avg Uptime"
          value={`${store.getAverageUptime()}%`}
          subtext="Last 24 hours"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="up"
          trendValue="+0.3%"
        />
        <KPICard
          label="Active Incidents"
          value={store.getOpenIncidentCount()}
          subtext="Requiring attention"
          icon={<AlertTriangle className="h-5 w-5" />}
          trend={store.getOpenIncidentCount() > 2 ? 'down' : 'neutral'}
          trendValue={store.getOpenIncidentCount() > 0 ? 'Action needed' : 'All clear'}
        />
        <KPICard
          label="Affected Services"
          value={topIncidents.reduce((sum, i) => sum + i.affectedServices, 0)}
          subtext="Current impact"
          icon={<Activity className="h-5 w-5" />}
          trend={topIncidents.length > 0 ? 'down' : 'up'}
          trendValue="Being resolved"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LineChartComponent
            title="Network Uptime"
            description="Last 24 hours"
            data={uptime24h}
            lines={[{ key: 'uptime', stroke: '#10b981' }]}
          />
        </div>
        <PieChartComponent
          title="Device Status Distribution"
          data={deviceStatus}
          colors={['#10b981', '#f59e0b', '#ef4444']}
        />
      </div>

      {/* Incidents Table */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Incidents</CardTitle>
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
                    status={value === 'critical' ? 'critical' : value === 'high' ? 'warning' : 'info'}
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
                    label={String(value).toUpperCase()}
                  />
                ),
              },
              {
                key: 'affectedServices',
                label: 'Affected Services',
              },
              {
                key: 'updatedAt',
                label: 'Last Updated',
                render: (value) => {
                  const date = new Date(value as string)
                  const hours = String(date.getUTCHours()).padStart(2, '0')
                  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
                  const seconds = String(date.getUTCSeconds()).padStart(2, '0')
                  return `${hours}:${minutes}:${seconds}`
                },
              },
            ]}
            data={topIncidents.map((inc) => ({
              ...inc,
              updatedAt: inc.updatedAt.toISOString(),
            }))}
            pageSize={5}
          />
        </CardContent>
      </Card>

      {/* Device Status Overview */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Device Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'name', label: 'Device Name' },
              {
                key: 'status',
                label: 'Status',
                render: (value) => (
                  <StatusBadge status={value as 'healthy' | 'warning' | 'critical'} label={String(value).toUpperCase()} />
                ),
              },
              { key: 'type', label: 'Type' },
              { key: 'location', label: 'Location' },
              {
                key: 'uptime',
                label: 'Uptime',
                render: (value) => `${value}%`,
              },
              {
                key: 'bandwidth',
                label: 'Bandwidth Usage',
                render: (value) => `${value}%`,
              },
            ]}
            data={store.devices.slice(0, 6)}
            pageSize={6}
          />
        </CardContent>
      </Card>
    </div>
  )
}
