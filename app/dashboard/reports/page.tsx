'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download, Plus } from 'lucide-react'
import { DataTable } from '@/components/dashboard/data-table'

export default function ReportsPage() {
  const mockReports = [
    {
      id: 'rep-001',
      name: 'Monthly Network Performance Report - January 2025',
      type: 'performance',
      createdAt: new Date(Date.now() - 2 * 24 * 3600000).toLocaleDateString(),
      size: '2.4 MB',
    },
    {
      id: 'rep-002',
      name: 'Incident Analysis Report - Q4 2024',
      type: 'incident',
      createdAt: new Date(Date.now() - 10 * 24 * 3600000).toLocaleDateString(),
      size: '1.8 MB',
    },
    {
      id: 'rep-003',
      name: 'Customer Impact Assessment Report',
      type: 'customer-impact',
      createdAt: new Date(Date.now() - 5 * 24 * 3600000).toLocaleDateString(),
      size: '3.1 MB',
    },
    {
      id: 'rep-004',
      name: 'Availability Report - Last 30 Days',
      type: 'availability',
      createdAt: new Date(Date.now() - 1 * 24 * 3600000).toLocaleDateString(),
      size: '1.2 MB',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: 'Availability', count: 12, icon: '📊' },
          { name: 'Performance', count: 8, icon: '📈' },
          { name: 'Incident', count: 15, icon: '🚨' },
          { name: 'Customer Impact', count: 5, icon: '👥' },
        ].map((type) => (
          <Card key={type.name} className="bg-card border-border/50 cursor-pointer hover:bg-secondary/50 transition">
            <CardContent className="pt-6">
              <div className="text-3xl mb-2">{type.icon}</div>
              <p className="text-sm text-muted-foreground mb-1">{type.name} Reports</p>
              <p className="text-2xl font-bold text-foreground">{type.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports List */}
      <Card className="bg-card border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Recent Reports</CardTitle>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Generate Report
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'name', label: 'Report Name' },
              {
                key: 'type',
                label: 'Type',
                render: (value) => {
                  const typeLabels: Record<string, string> = {
                    performance: 'Performance',
                    incident: 'Incident',
                    'customer-impact': 'Customer Impact',
                    availability: 'Availability',
                  }
                  return typeLabels[String(value)] || String(value)
                },
              },
              { key: 'createdAt', label: 'Created' },
              { key: 'size', label: 'Size' },
              {
                key: 'id',
                label: 'Action',
                render: () => (
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                ),
              },
            ]}
            data={mockReports}
            pageSize={10}
          />
        </CardContent>
      </Card>

      {/* Generate Custom Report */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Generate Custom Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Report Type</label>
                <select className="w-full bg-secondary border border-border/50 rounded-md px-3 py-2 text-foreground">
                  <option>Availability</option>
                  <option>Performance</option>
                  <option>Incident</option>
                  <option>Customer Impact</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Date Range</label>
                <select className="w-full bg-secondary border border-border/50 rounded-md px-3 py-2 text-foreground">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>Custom Range</option>
                </select>
              </div>
            </div>
            <Button className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
