'use client'

import { useNocStore } from '@/lib/store'
import { AreaChartComponent, LineChartComponent, BarChartComponent } from '@/components/dashboard/charts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KPICard } from '@/components/dashboard/kpi-card'
import { AlertTriangle, TrendingUp, Zap } from 'lucide-react'

export default function NetworkMonitoringPage() {
  const store = useNocStore()

  const bandwidthData = Array.from({ length: 24 }, (_, i) => ({
    name: `${i}h`,
    used: 45 + Math.random() * 40,
    available: 55 + Math.random() * 40,
  }))

  const latencyData = Array.from({ length: 12 }, (_, i) => ({
    name: `${i * 2}:00`,
    'Avg Latency': 15 + Math.random() * 10,
  }))

  const packetLossData = Array.from({ length: 6 }, (_, i) => ({
    name: `Zone ${String.fromCharCode(65 + i)}`,
    'Packet Loss %': Math.random() * 0.5,
  }))

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard
          label="Total Bandwidth"
          value="850 Gbps"
          subtext="Current usage: 485 Gbps (57%)"
          icon={<Zap className="h-5 w-5" />}
          trend="up"
          trendValue="+5% from yesterday"
        />
        <KPICard
          label="Avg Latency"
          value="18.5ms"
          subtext="Peak: 24ms"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="up"
          trendValue="-2.1ms improvement"
        />
        <KPICard
          label="Packet Loss Rate"
          value="0.12%"
          subtext="Threshold: 0.5%"
          icon={<AlertTriangle className="h-5 w-5" />}
          trend="neutral"
          trendValue="Within limits"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AreaChartComponent
          title="Bandwidth Usage"
          description="24-hour trend"
          data={bandwidthData}
          lines={[
            { key: 'used', stroke: '#3b82f6' },
            { key: 'available', stroke: '#10b981' },
          ]}
        />
        <LineChartComponent
          title="Network Latency"
          description="12-hour trend"
          data={latencyData}
          lines={[{ key: 'Avg Latency', stroke: '#f59e0b' }]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartComponent
          title="Packet Loss by Zone"
          description="Current metrics"
          data={packetLossData}
          bars={[{ key: 'Packet Loss %', fill: '#ef4444' }]}
        />
        <Card className="bg-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Network Health Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-muted-foreground">Primary Link Status</span>
              <span className="text-status-healthy font-semibold">Active</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-muted-foreground">Secondary Link Status</span>
              <span className="text-status-healthy font-semibold">Active</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-muted-foreground">BGP Sessions</span>
              <span className="text-status-healthy font-semibold">8/8 Established</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-muted-foreground">DNS Health</span>
              <span className="text-status-healthy font-semibold">Normal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">DDoS Protection</span>
              <span className="text-status-healthy font-semibold">Enabled</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
