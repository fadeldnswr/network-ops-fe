'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Toggle } from '@/components/ui/toggle'
import { Bell, Lock, Palette, Database, Eye } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [incidentAlerts, setIncidentAlerts] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your NOC Dashboard preferences and system configuration</p>
      </div>

      {/* Notification Settings */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Configure how you receive alerts and updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-border/50">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email alerts for important events</p>
            </div>
            <Toggle
              pressed={emailNotifications}
              onPressedChange={setEmailNotifications}
              aria-label="Toggle email notifications"
            />
          </div>
          <div className="flex items-center justify-between pb-4 border-b border-border/50">
            <div>
              <p className="font-medium text-foreground">Incident Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified when incidents are created</p>
            </div>
            <Toggle
              pressed={incidentAlerts}
              onPressedChange={setIncidentAlerts}
              aria-label="Toggle incident alerts"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Auto-Refresh Dashboard</p>
              <p className="text-sm text-muted-foreground">Automatically refresh data every 5 minutes</p>
            </div>
            <Toggle
              pressed={autoRefresh}
              onPressedChange={setAutoRefresh}
              aria-label="Toggle auto-refresh"
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel of the dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-border/50">
            <div>
              <p className="font-medium text-foreground">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Use dark theme for the dashboard</p>
            </div>
            <Toggle
              pressed={darkMode}
              onPressedChange={setDarkMode}
              aria-label="Toggle dark mode"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Refresh Interval</label>
            <select className="w-full bg-secondary border border-border/50 rounded-md px-3 py-2 text-foreground">
              <option>Every 30 seconds</option>
              <option>Every 1 minute</option>
              <option>Every 5 minutes</option>
              <option>Every 10 minutes</option>
              <option>Manual only</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Lock className="h-5 w-5" />
            Security & Privacy
          </CardTitle>
          <CardDescription>Manage your account security and data preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="pb-4 border-b border-border/50">
            <label className="text-sm font-medium text-foreground block mb-2">Session Timeout</label>
            <select className="w-full bg-secondary border border-border/50 rounded-md px-3 py-2 text-foreground">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>Never</option>
            </select>
          </div>
          <div className="pb-4 border-b border-border/50">
            <label className="text-sm font-medium text-foreground block mb-2">Two-Factor Authentication</label>
            <Button variant="outline" className="text-foreground">Enable 2FA</Button>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Change Password</label>
            <Button variant="outline" className="text-foreground">Update Password</Button>
          </div>
        </CardContent>
      </Card>

      {/* Integration Settings */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Database className="h-5 w-5" />
            Integrations & API
          </CardTitle>
          <CardDescription>Configure external integrations and API access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="pb-4 border-b border-border/50">
            <p className="font-medium text-foreground mb-2">API Key</p>
            <div className="flex gap-2">
              <Input
                type="password"
                value="••••••••••••••••"
                readOnly
                className="bg-secondary border-border/50"
              />
              <Button variant="outline">Regenerate</Button>
            </div>
          </div>
          <div>
            <p className="font-medium text-foreground mb-2">Connected Services</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm text-foreground">Slack Integration</span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm text-foreground">PagerDuty Integration</span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backup & Export */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Eye className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>Export and backup your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="pb-4 border-b border-border/50">
            <p className="font-medium text-foreground mb-2">Export Data</p>
            <Button variant="outline" className="text-foreground">
              Export Dashboard Data (CSV)
            </Button>
          </div>
          <div className="pb-4 border-b border-border/50">
            <p className="font-medium text-foreground mb-2">Export Configuration</p>
            <Button variant="outline" className="text-foreground">
              Export Settings (JSON)
            </Button>
          </div>
          <div>
            <p className="font-medium text-foreground mb-2">Last Backup</p>
            <p className="text-sm text-muted-foreground">January 15, 2025 at 02:30 UTC</p>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-card border-border/50 border-status-critical/50">
        <CardHeader>
          <CardTitle className="text-status-critical">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium text-foreground mb-2">Clear Cache</p>
            <Button variant="outline" className="text-muted-foreground">
              Clear All Cached Data
            </Button>
          </div>
          <div>
            <p className="font-medium text-foreground mb-2">Reset to Defaults</p>
            <Button variant="outline" className="text-muted-foreground">
              Reset All Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex gap-2 justify-end">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
