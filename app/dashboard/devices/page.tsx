'use client'

import { useNocStore } from '@/lib/store'
import { DataTable } from '@/components/dashboard/data-table'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { KPICard } from '@/components/dashboard/kpi-card'
import { HardDrive, Plus } from 'lucide-react'

export default function DeviceManagementPage() {
  const store = useNocStore()

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Total Devices"
          value={store.devices.length}
          subtext="All equipment"
          icon={<HardDrive className="h-5 w-5" />}
        />
        <KPICard
          label="Healthy Devices"
          value={store.getHealthyDeviceCount()}
          subtext={`${Math.round((store.getHealthyDeviceCount() / store.devices.length) * 100)}% operational`}
        />
        <KPICard
          label="Warning Devices"
          value={store.getWarningDeviceCount()}
          subtext="Needs attention"
        />
        <KPICard
          label="Critical Devices"
          value={store.getCriticalDeviceCount()}
          subtext="Immediate action required"
        />
      </div>

      {/* Device Table */}
      <Card className="bg-card border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Device Inventory</CardTitle>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Device
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'name', label: 'Device Name' },
              { key: 'type', label: 'Type' },
              {
                key: 'status',
                label: 'Status',
                render: (value) => (
                  <StatusBadge status={value as 'healthy' | 'warning' | 'critical'} label={String(value).toUpperCase()} />
                ),
              },
              { key: 'location', label: 'Location' },
              {
                key: 'uptime',
                label: 'Uptime',
                render: (value) => `${value}%`,
              },
              {
                key: 'bandwidth',
                label: 'Bandwidth',
                render: (value) => `${value}%`,
              },
              {
                key: 'lastSeen',
                label: 'Last Seen',
                render: (value) => new Date(value as string).toLocaleTimeString(),
              },
            ]}
            data={store.devices.map((dev) => ({
              ...dev,
              lastSeen: dev.lastSeen.toISOString(),
            }))}
            pageSize={10}
          />
        </CardContent>
      </Card>

      {/* Device Type Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['OLT', 'ONT', 'Router', 'Switch'].map((type) => {
          const count = store.devices.filter((d) => d.type === type).length
          return (
            <Card key={type} className="bg-card border-border/50">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-2">{type} Devices</p>
                <p className="text-2xl font-bold text-foreground">{count}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
