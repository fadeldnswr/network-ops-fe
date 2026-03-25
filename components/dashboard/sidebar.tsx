'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Radio, Users2, HardDrive, Network,
  Menu, X, ChevronRight, ChevronLeft, Router 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

// Create navigation items for sidebar navigation
const navItems = [
  {
    title: 'Network Monitoring',
    href: '/dashboard/network',
    icon: Network,
  },
  {
    title: 'Device Summary',
    href: '/dashboard/summary',
    icon: HardDrive,
  },
  {
    title: 'ONT Overview',
    href: '/dashboard/cities',
    icon: Router,
  },
  {
    title: 'RSL Overview',
    href: '/dashboard/rsl',
    icon: Users2,
  },
]

// Sidebar component with responsive design and collapsible functionality
export function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [open, setOpen] = useState<boolean>(true)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          className="text-foreground"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 border-r border-border bg-sidebar shadow-xl transition-all duration-300 
        ${collapsed ? 'w-20' : 'w-64'} 
        lg:translate-x-0 
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Radio className="h-6 w-6 text-primary" />
            {!collapsed && <span className='font-bold text-foreground'>NOC</span>}
          </div> 
          {/* Desktop Collapse Toggle */}
          <div className='hidden lg:block'>
            <Button variant="ghost"
            size="icon"
            onClick={() => setCollapsed(value => !value)}
            className='p-1 rounded hover:bg-accent'
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const Icon = item.icon

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  title={collapsed ? item.title : undefined}
                  className={[
                    "w-full gap-3",
                    collapsed ? "justify-center" : "justify-start",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  ].join(" ")}
                  onClick={() => {
                    if (typeof window != "undefined" && window.innerWidth < 1024){
                      setOpen(false)
                    }
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {!collapsed && <span>{item.title}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}
