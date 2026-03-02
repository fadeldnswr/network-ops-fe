'use client'

import { Router } from '@/lib/store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Network } from 'lucide-react'

interface RouterTopologyProps {
  routers: Router[]
}

export function RouterTopology({ routers }: RouterTopologyProps) {
  const coreRouters = routers.filter((r) => r.name.startsWith('Core'))
  const edgeRouters = routers.filter((r) => r.name.startsWith('Edge'))

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Network Topology</h2>

      <Card className="card-elevated p-8">
        <div className="flex flex-col items-center gap-8">
          {/* ISP Layer */}
          <div className="flex justify-center gap-8 w-full">
            <div className="text-center">
              <div className="bg-primary/20 border-2 border-primary rounded-lg p-4 min-w-32">
                <p className="font-semibold text-foreground">Primary ISP</p>
                <p className="text-xs text-muted-foreground mt-1">Internet Uplink</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-primary/20 border-2 border-primary rounded-lg p-4 min-w-32">
                <p className="font-semibold text-foreground">Secondary ISP</p>
                <p className="text-xs text-muted-foreground mt-1">Backup Uplink</p>
              </div>
            </div>
          </div>

          {/* Connection Lines to Core */}
          <div className="text-muted-foreground">↓</div>

          {/* Core Router Layer */}
          <div className="flex justify-center gap-12 w-full">
            {coreRouters.map((router) => (
              <div key={router.id} className="text-center">
                <div className="bg-accent/20 border-2 border-accent rounded-lg p-4 min-w-40">
                  <p className="font-semibold text-foreground text-sm">{router.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{router.model}</p>
                  <div className="flex gap-2 justify-center mt-2">
                    <Badge variant="outline" className="text-xs bg-secondary/50">
                      CPU: {router.cpuUsage}%
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-secondary/50">
                      Mem: {router.memoryUsage}%
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Connection Lines to Edge */}
          <div className="text-muted-foreground">↓</div>

          {/* Edge Router Layer */}
          <div className="flex justify-center gap-8 w-full flex-wrap">
            {edgeRouters.map((router) => (
              <div key={router.id} className="text-center">
                <div className="bg-green-500/20 border-2 border-green-500 rounded-lg p-4 min-w-40">
                  <p className="font-semibold text-foreground text-sm">{router.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{router.model}</p>
                  <div className="flex gap-2 justify-center mt-2">
                    <Badge variant="outline" className="text-xs bg-secondary/50">
                      CPU: {router.cpuUsage}%
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-secondary/50">
                      Conn: {router.connections}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Connection Lines to Network */}
          <div className="text-muted-foreground">↓</div>

          {/* Customer Network */}
          <div className="flex justify-center gap-4">
            <Network className="w-6 h-6 text-primary" />
            <p className="text-foreground font-semibold">Customer Network (ONTs)</p>
            <Network className="w-6 h-6 text-primary" />
          </div>
        </div>
      </Card>

      {/* Topology Legend */}
      <Card className="card-elevated p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/20 border-2 border-primary rounded mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">ISP Layer</p>
              <p className="text-muted-foreground text-xs">Internet connectivity</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-accent/20 border-2 border-accent rounded mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Core Routers</p>
              <p className="text-muted-foreground text-xs">Network backbone</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-500/20 border-2 border-green-500 rounded mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Edge Routers</p>
              <p className="text-muted-foreground text-xs">Regional distribution</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
