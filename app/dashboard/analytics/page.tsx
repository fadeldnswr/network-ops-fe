'use client'

import { LineChartComponent, BarChartComponent, AreaChartComponent } from '@/components/dashboard/charts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KPICard } from '@/components/dashboard/kpi-card'
import { TrendingUp } from 'lucide-react'

export default function PerformanceAnalyticsPage() {
  const uptimeData = Array.from({ length: 30 }, (_, i) => ({
    name: `Day ${i + 1}`,
    uptime: 98 + Math.random() * 2,
  }))

  const responseTimeData = Array.from({ length: 24 }, (_, i) => ({
    name: `${i}:00`,
    'Response Time (ms)': 50 + Math.random() * 30,
  }))

  const throughputData = Array.from({ length: 12 }, (_, i) => ({
    name: `Week ${i + 1}`,
    'Data Throughput (TB)': 500 + Math.random() * 300,
  }))

  const performanceMetrics = Array.from({ length: 7 }, (_, i) => ({
    name: `Zone ${String.fromCharCode(65 + i)}`,
    performance: 85 + Math.random() * 15,
  }))

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard
          label="Overall Performance Score"
          value="94.2%"
          subtext="Excellent"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="up"
          trendValue="+2.1% from last week"
        />
        <KPICard
          label="Average Response Time"
          value="62ms"
          subtext="Target: &lt; 100ms"
          trend="up"
          trendValue="-5ms improvement"
        />
        <KPICard
          label="Data Processed (24h)"
          value="5.2 PB"
          subtext="Peak: 450 Gbps"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartComponent
          title="Monthly Uptime Trend"
          description="30-day performance"
          data={uptimeData}
          lines={[{ key: 'uptime', stroke: '#10b981' }]}
        />
        <AreaChartComponent
          title="Response Time Analysis"
          description="24-hour trend"
          data={responseTimeData}
          lines={[{ key: 'Response Time (ms)', stroke: '#3b82f6' }]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartComponent
          title="Weekly Data Throughput"
          description="Last 12 weeks"
          data={throughputData}
          bars={[{ key: 'Data Throughput (TB)', fill: '#f59e0b' }]}
        />
        <BarChartComponent
          title="Performance by Zone"
          description="Current metrics"
          data={performanceMetrics}
          bars={[{ key: 'performance', fill: '#8b5cf6' }]}
        />
      </div>

      {/* Performance Summary */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Service Level Agreement (SLA) Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { service: 'Uptime SLA (99.99%)', current: '99.98%', status: 'warning' },
            { service: 'Response Time SLA (&lt; 100ms)', current: '62ms', status: 'healthy' },
            { service: 'Packet Loss SLA (&lt; 0.1%)', current: '0.08%', status: 'healthy' },
            { service: 'Availability SLA (99.95%)', current: '99.97%', status: 'healthy' },
          ].map((sla) => (
            <div key={sla.service} className="flex justify-between items-center pb-3 border-b border-border/50 last:border-0">
              <span className="text-muted-foreground text-sm">{sla.service}</span>
              <div className="text-right">
                <p className="font-semibold text-foreground">{sla.current}</p>
                <p className={`text-xs ${sla.status === 'healthy' ? 'text-status-healthy' : 'text-status-warning'}`}>
                  {sla.status === 'healthy' ? '✓ Met' : '⚠ Warning'}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
