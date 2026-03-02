'use client'

import { useNocStore } from '@/lib/store'
import { DataTable } from '@/components/dashboard/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { KPICard } from '@/components/dashboard/kpi-card'
import { Users, Plus, Badge } from 'lucide-react'

export default function UserManagementPage() {
  const store = useNocStore()

  const roleColors: Record<string, string> = {
    admin: 'bg-status-critical/10 text-status-critical',
    operator: 'bg-status-info/10 text-status-info',
    manager: 'bg-status-warning/10 text-status-warning',
    viewer: 'bg-status-healthy/10 text-status-healthy',
  }

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Total Users"
          value={store.users.length}
          subtext="Active accounts"
          icon={<Users className="h-5 w-5" />}
        />
        <KPICard
          label="Admins"
          value={store.users.filter((u) => u.role === 'admin').length}
          subtext="Full access"
        />
        <KPICard
          label="Operators"
          value={store.users.filter((u) => u.role === 'operator').length}
          subtext="Daily operations"
        />
        <KPICard
          label="Viewers"
          value={store.users.filter((u) => u.role === 'viewer').length}
          subtext="Read-only access"
        />
      </div>

      {/* Users Table */}
      <Card className="bg-card border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">User Directory</CardTitle>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              {
                key: 'role',
                label: 'Role',
                render: (value) => (
                  <span className={`px-3 py-1 rounded-md text-xs font-medium ${roleColors[String(value)]}`}>
                    {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
                  </span>
                ),
              },
              {
                key: 'lastLogin',
                label: 'Last Login',
                render: (value) => new Date(value as string).toLocaleTimeString(),
              },
            ]}
            data={store.users.map((user) => ({
              ...user,
              lastLogin: user.lastLogin.toISOString(),
            }))}
            pageSize={10}
          />
        </CardContent>
      </Card>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Users by Role</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {['admin', 'operator', 'manager', 'viewer'].map((role) => {
              const count = store.users.filter((u) => u.role === role).length
              return (
                <div key={role} className="flex justify-between items-center pb-2 border-b border-border/50 last:border-0">
                  <span className="text-muted-foreground capitalize">{role}</span>
                  <span className={`px-3 py-1 rounded-md text-sm font-medium ${roleColors[role]}`}>{count}</span>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {store.users.slice(0, 4).map((user) => (
              <div key={user.id} className="pb-2 border-b border-border/50 last:border-0">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  Last login: {user.lastLogin.toLocaleString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* User Permissions */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                role: 'Admin',
                permissions: ['View all data', 'Create/Edit incidents', 'Manage users', 'Generate reports', 'System settings'],
              },
              {
                role: 'Operator',
                permissions: ['View dashboard', 'Create incidents', 'Update status', 'View reports'],
              },
              {
                role: 'Manager',
                permissions: ['View dashboard', 'View incidents', 'Generate reports'],
              },
              {
                role: 'Viewer',
                permissions: ['View dashboard', 'View reports'],
              },
            ].map(({ role, permissions }) => (
              <div key={role} className="border border-border/50 rounded-lg p-4">
                <p className="font-semibold text-foreground mb-2">{role}</p>
                <div className="flex flex-wrap gap-2">
                  {permissions.map((perm) => (
                    <span
                      key={perm}
                      className="text-xs bg-secondary text-foreground px-2 py-1 rounded-md"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
