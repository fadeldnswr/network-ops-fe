'use client'

import { useNocStore } from '@/lib/store'
import { DataTable } from '@/components/dashboard/data-table'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KPICard } from '@/components/dashboard/kpi-card'
import { Users2, AlertTriangle } from 'lucide-react'
import { PieChartComponent } from '@/components/dashboard/charts'

export default function CustomerImpactPage() {
  const store = useNocStore()

  const affectedCustomers = store.customers.filter((c) => c.status !== 'healthy')
  const totalBandwidth = store.customers.reduce((sum, c) => sum + c.bandwidth, 0)
  const affectedBandwidth = affectedCustomers.reduce((sum, c) => sum + c.bandwidth, 0)

  const customerStatusData = [
    { name: 'Healthy', value: store.customers.filter((c) => c.status === 'healthy').length },
    { name: 'Warning', value: store.customers.filter((c) => c.status === 'warning').length },
    { name: 'Critical', value: store.customers.filter((c) => c.status === 'critical').length },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Total Customers"
          value={store.customers.length}
          subtext="All services"
          icon={<Users2 className="h-5 w-5" />}
        />
        <KPICard
          label="Affected Customers"
          value={affectedCustomers.length}
          subtext={`${Math.round((affectedCustomers.length / store.customers.length) * 100)}% of total`}
          icon={<AlertTriangle className="h-5 w-5" />}
          trend={affectedCustomers.length > 0 ? 'down' : 'up'}
        />
        <KPICard
          label="Total Bandwidth"
          value={`${totalBandwidth} Mbps`}
          subtext={`Affected: ${affectedBandwidth} Mbps`}
        />
        <KPICard
          label="Avg SLA Compliance"
          value="99.8%"
          subtext="Target: 99.9%"
        />
      </div>

      {/* Customer List */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Customer Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'name', label: 'Customer Name' },
              { key: 'service', label: 'Service Type' },
              {
                key: 'status',
                label: 'Status',
                render: (value) => (
                  <StatusBadge status={value as 'healthy' | 'warning' | 'critical'} label={String(value).toUpperCase()} />
                ),
              },
              {
                key: 'bandwidth',
                label: 'Bandwidth',
                render: (value) => `${value} Mbps`,
              },
              {
                key: 'lastIssue',
                label: 'Last Issue',
                render: (value) => (value ? new Date(value as string).toLocaleTimeString() : 'None'),
              },
            ]}
            data={store.customers.map((cust) => ({
              ...cust,
              lastIssue: cust.lastIssue?.toISOString(),
            }))}
            pageSize={10}
          />
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartComponent
          title="Customer Status Distribution"
          data={customerStatusData}
          colors={['#10b981', '#f59e0b', '#ef4444']}
        />

        <Card className="bg-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Service Tier Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { tier: 'Premium', count: store.customers.filter((c) => c.service.includes('Premium')).length },
              { tier: 'Business', count: store.customers.filter((c) => c.service.includes('Business')).length },
              { tier: 'Enterprise', count: store.customers.filter((c) => c.service.includes('Enterprise')).length },
              { tier: 'Residential', count: store.customers.filter((c) => c.service.includes('Residential')).length },
            ].map(({ tier, count }) => (
              <div key={tier} className="flex justify-between items-center pb-2 border-b border-border/50 last:border-0">
                <span className="text-muted-foreground">{tier}</span>
                <span className="font-semibold text-foreground">{count} customers</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Impact Assessment */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Current Impact Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Critical Impact</p>
              <p className="text-2xl font-bold text-status-critical">0</p>
              <p className="text-xs text-muted-foreground mt-2">Customers with outages</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Degraded Service</p>
              <p className="text-2xl font-bold text-status-warning">1</p>
              <p className="text-xs text-muted-foreground mt-2">Customers with issues</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Normal Operation</p>
              <p className="text-2xl font-bold text-status-healthy">4</p>
              <p className="text-xs text-muted-foreground mt-2">Customers with no issues</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
