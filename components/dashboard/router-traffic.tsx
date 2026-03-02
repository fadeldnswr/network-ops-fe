'use client'

import { Router } from '@/lib/store'
import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ArrowDown, ArrowUp } from 'lucide-react'

interface RouterTrafficProps {
  routers: Router[]
}

export function RouterTraffic({ routers }: RouterTrafficProps) {
  const chartData = routers.map((router) => ({
    name: router.name,
    inbound: router.inboundTraffic,
    outbound: router.outboundTraffic,
  }))

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Router Traffic</h2>
      
      <Card className="card-elevated p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            <Bar dataKey="inbound" fill="hsl(var(--chart-2))" name="Inbound (Mbps)" />
            <Bar dataKey="outbound" fill="hsl(var(--chart-3))" name="Outbound (Mbps)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Router Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {routers.map((router) => (
          <Card key={router.id} className="card-elevated p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">{router.name}</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1">
                  <ArrowDown className="w-4 h-4" />
                  Inbound
                </span>
                <span className="font-medium text-accent">{router.inboundTraffic} Mbps</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1">
                  <ArrowUp className="w-4 h-4" />
                  Outbound
                </span>
                <span className="font-medium text-accent">{router.outboundTraffic} Mbps</span>
              </div>

              <div className="border-t border-border pt-2 mt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">CPU</span>
                  <span className="font-medium">{router.cpuUsage}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full" 
                    style={{ width: `${router.cpuUsage}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Memory</span>
                  <span className="font-medium">{router.memoryUsage}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div 
                    className="bg-accent h-1.5 rounded-full" 
                    style={{ width: `${router.memoryUsage}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
