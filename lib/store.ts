import { create } from 'zustand'

export type DeviceStatus = 'healthy' | 'warning' | 'critical'
export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical'

export interface Device {
  id: string
  name: string
  type: 'OLT' | 'ONT' | 'Router' | 'Switch'
  status: DeviceStatus
  location: string
  lastSeen: Date
  uptime: number
  bandwidth: number
}

export interface NetworkMetric {
  timestamp: Date
  value: number
}

export interface Incident {
  id: string
  title: string
  severity: IncidentSeverity
  status: 'open' | 'in-progress' | 'resolved'
  description: string
  affectedServices: number
  createdAt: Date
  updatedAt: Date
}

export interface Customer {
  id: string
  name: string
  status: DeviceStatus
  service: string
  bandwidth: number
  lastIssue?: Date
}

export interface Report {
  id: string
  name: string
  type: 'availability' | 'performance' | 'incident' | 'customer-impact'
  createdAt: Date
  data: Record<string, unknown>
}

export interface TicketStatus {
  incident: number
  complain: number
}

export interface City {
  id: string
  name: string
  totalOnt: number
  ontOnline: number
  ontOffline: number
  networkHealthScore: number
  ticketsInProgress: TicketStatus
  aiPrescriptive: string
}

export interface Router {
  id: string
  name: string
  model: string
  inboundTraffic: number
  outboundTraffic: number
  cpuUsage: number
  memoryUsage: number
  connections: number
  uplink1: string
  uplink2: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'operator' | 'manager' | 'viewer'
  lastLogin: Date
}

interface NocStore {
  // Devices
  devices: Device[]
  addDevice: (device: Device) => void
  updateDevice: (id: string, updates: Partial<Device>) => void
  deleteDevice: (id: string) => void

  // Network Metrics
  networkMetrics: NetworkMetric[]
  addMetric: (metric: NetworkMetric) => void

  // Incidents
  incidents: Incident[]
  addIncident: (incident: Incident) => void
  updateIncident: (id: string, updates: Partial<Incident>) => void
  resolveIncident: (id: string) => void

  // Customers
  customers: Customer[]
  addCustomer: (customer: Customer) => void
  updateCustomer: (id: string, updates: Partial<Customer>) => void

  // Reports
  reports: Report[]
  addReport: (report: Report) => void

  // Users
  users: User[]
  addUser: (user: User) => void
  updateUser: (id: string, updates: Partial<User>) => void

  // Cities
  cities: City[]
  updateCity: (id: string, updates: Partial<City>) => void

  // Routers
  routers: Router[]
  updateRouter: (id: string, updates: Partial<Router>) => void

  // KPIs
  getHealthyDeviceCount: () => number
  getWarningDeviceCount: () => number
  getCriticalDeviceCount: () => number
  getOpenIncidentCount: () => number
  getAverageUptime: () => number
}

// Static reference date for consistent server/client rendering
const REFERENCE_DATE = new Date('2024-02-23T14:00:00Z')

// Mock data generators
const generateMockDevices = (): Device[] => [
  {
    id: 'dev-001',
    name: 'OLT-Main-01',
    type: 'OLT',
    status: 'healthy',
    location: 'Central Office',
    lastSeen: new Date(REFERENCE_DATE),
    uptime: 99.8,
    bandwidth: 85,
  },
  {
    id: 'dev-002',
    name: 'OLT-Main-02',
    type: 'OLT',
    status: 'healthy',
    location: 'Central Office',
    lastSeen: new Date(REFERENCE_DATE),
    uptime: 99.7,
    bandwidth: 78,
  },
  {
    id: 'dev-003',
    name: 'ONT-Zone-A-01',
    type: 'ONT',
    status: 'healthy',
    location: 'Zone A',
    lastSeen: new Date(REFERENCE_DATE),
    uptime: 98.5,
    bandwidth: 92,
  },
  {
    id: 'dev-004',
    name: 'ONT-Zone-B-01',
    type: 'ONT',
    status: 'warning',
    location: 'Zone B',
    lastSeen: new Date(REFERENCE_DATE.getTime() - 5 * 60000),
    uptime: 95.2,
    bandwidth: 65,
  },
  {
    id: 'dev-005',
    name: 'Router-North-01',
    type: 'Router',
    status: 'healthy',
    location: 'North Sector',
    lastSeen: new Date(REFERENCE_DATE),
    uptime: 99.9,
    bandwidth: 88,
  },
  {
    id: 'dev-006',
    name: 'Switch-Core-01',
    type: 'Switch',
    status: 'critical',
    location: 'Core Network',
    lastSeen: new Date(REFERENCE_DATE.getTime() - 15 * 60000),
    uptime: 87.3,
    bandwidth: 120,
  },
]

const generateMockIncidents = (): Incident[] => [
  {
    id: 'inc-001',
    title: 'High Latency in Zone B',
    severity: 'high',
    status: 'open',
    description: 'Customers in Zone B experiencing latency > 50ms',
    affectedServices: 245,
    createdAt: new Date(REFERENCE_DATE.getTime() - 2 * 3600000),
    updatedAt: new Date(REFERENCE_DATE.getTime() - 30 * 60000),
  },
  {
    id: 'inc-002',
    title: 'Core Router CPU Spike',
    severity: 'critical',
    status: 'in-progress',
    description: 'Core router CPU usage at 98%, investigating cause',
    affectedServices: 1200,
    createdAt: new Date(REFERENCE_DATE.getTime() - 1 * 3600000),
    updatedAt: new Date(REFERENCE_DATE.getTime() - 5 * 60000),
  },
  {
    id: 'inc-003',
    title: 'Fiber Cut - North Zone',
    severity: 'high',
    status: 'resolved',
    description: 'Fiber optic cable cut repaired, service restored',
    affectedServices: 380,
    createdAt: new Date(REFERENCE_DATE.getTime() - 24 * 3600000),
    updatedAt: new Date(REFERENCE_DATE.getTime() - 12 * 3600000),
  },
]

const generateMockCustomers = (): Customer[] => [
  { id: 'cust-001', name: 'Acme Corp', status: 'healthy', service: 'Enterprise Fiber', bandwidth: 1000 },
  { id: 'cust-002', name: 'Tech Startup', status: 'healthy', service: 'Business Fiber', bandwidth: 500 },
  { id: 'cust-003', name: 'City Hospital', status: 'warning', service: 'Premium Fiber', bandwidth: 2000, lastIssue: new Date(REFERENCE_DATE.getTime() - 2 * 3600000) },
  { id: 'cust-004', name: 'University', status: 'healthy', service: 'Educational Fiber', bandwidth: 5000 },
  { id: 'cust-005', name: 'Local Store', status: 'healthy', service: 'Residential Fiber', bandwidth: 100 },
]

const generateMockUsers = (): User[] => [
  { id: 'user-001', name: 'Alice Johnson', email: 'alice@noc.com', role: 'admin', lastLogin: new Date(REFERENCE_DATE) },
  { id: 'user-002', name: 'Bob Smith', email: 'bob@noc.com', role: 'operator', lastLogin: new Date(REFERENCE_DATE.getTime() - 1 * 3600000) },
  { id: 'user-003', name: 'Carol White', email: 'carol@noc.com', role: 'manager', lastLogin: new Date(REFERENCE_DATE.getTime() - 2 * 3600000) },
  { id: 'user-004', name: 'David Brown', email: 'david@noc.com', role: 'viewer', lastLogin: new Date(REFERENCE_DATE.getTime() - 24 * 3600000) },
]

const generateMockCities = (): City[] => [
  {
    id: 'city-001',
    name: 'Simalungun',
    totalOnt: 2450,
    ontOnline: 2380,
    ontOffline: 70,
    networkHealthScore: 94.5,
    ticketsInProgress: { incident: 3, complain: 5 },
    aiPrescriptive: 'Monitor OLT-Main-01 CPU usage. History shows 3 incidents related to high latency in Zone A. Recommend upgrading port bandwidth and scheduling preventive maintenance during off-peak hours.',
  },
  {
    id: 'city-002',
    name: 'Bengkulu',
    totalOnt: 1820,
    ontOnline: 1750,
    ontOffline: 70,
    networkHealthScore: 91.2,
    ticketsInProgress: { incident: 2, complain: 8 },
    aiPrescriptive: 'High complaint rate detected. Previous incidents indicate fiber connectivity issues in South region. Conduct fiber signal quality audit and improve customer communication on service updates.',
  },
  {
    id: 'city-003',
    name: 'Lahat',
    totalOnt: 1560,
    ontOnline: 1520,
    ontOffline: 40,
    networkHealthScore: 96.8,
    ticketsInProgress: { incident: 1, complain: 3 },
    aiPrescriptive: 'Excellent network stability. Minimal incident history suggests current infrastructure is well-maintained. Focus on proactive monitoring and customer satisfaction improvements.',
  },
  {
    id: 'city-004',
    name: 'Jambi',
    totalOnt: 3210,
    ontOnline: 3100,
    ontOffline: 110,
    networkHealthScore: 88.5,
    ticketsInProgress: { incident: 5, complain: 12 },
    aiPrescriptive: 'CRITICAL: Highest incident and complaint count. Pattern analysis shows recurring power supply failures. Urgent: Install backup power systems and schedule network infrastructure review immediately.',
  },
  {
    id: 'city-005',
    name: 'Situbondo',
    totalOnt: 1340,
    ontOnline: 1310,
    ontOffline: 30,
    networkHealthScore: 97.2,
    ticketsInProgress: { incident: 0, complain: 2 },
    aiPrescriptive: 'Outstanding performance with minimal incidents. Network infrastructure is robust. Continue current maintenance schedule and implement automated monitoring for early anomaly detection.',
  },
  {
    id: 'city-006',
    name: 'Wonosobo',
    totalOnt: 980,
    ontOnline: 950,
    ontOffline: 30,
    networkHealthScore: 95.8,
    ticketsInProgress: { incident: 1, complain: 1 },
    aiPrescriptive: 'Very stable network operation. Low incident history indicates good maintenance practices. Consider capacity planning for growth and implement predictive analytics for better resource optimization.',
  },
  {
    id: 'city-007',
    name: 'Gorontalo',
    totalOnt: 2100,
    ontOnline: 2020,
    ontOffline: 80,
    networkHealthScore: 92.3,
    ticketsInProgress: { incident: 4, complain: 7 },
    aiPrescriptive: 'Moderate concern level. History shows intermittent connectivity issues. Recommend ONT device firmware updates and comprehensive fiber line inspection in affected zones.',
  },
]

const generateMockRouters = (): Router[] => [
  {
    id: 'router-001',
    name: 'Core-Router-A',
    model: 'Cisco ASR 9010',
    inboundTraffic: 8500,
    outboundTraffic: 7200,
    cpuUsage: 45,
    memoryUsage: 62,
    connections: 12450,
    uplink1: 'Primary ISP',
    uplink2: 'Secondary ISP',
  },
  {
    id: 'router-002',
    name: 'Core-Router-B',
    model: 'Juniper MX960',
    inboundTraffic: 7800,
    outboundTraffic: 6900,
    cpuUsage: 38,
    memoryUsage: 55,
    connections: 11200,
    uplink1: 'Primary ISP',
    uplink2: 'Secondary ISP',
  },
  {
    id: 'router-003',
    name: 'Edge-Router-01',
    model: 'Cisco ASR 1000',
    inboundTraffic: 4200,
    outboundTraffic: 3900,
    cpuUsage: 52,
    memoryUsage: 68,
    connections: 5600,
    uplink1: 'Core-Router-A',
    uplink2: 'Core-Router-B',
  },
  {
    id: 'router-004',
    name: 'Edge-Router-02',
    model: 'Cisco ASR 1000',
    inboundTraffic: 3800,
    outboundTraffic: 3500,
    cpuUsage: 41,
    memoryUsage: 59,
    connections: 4900,
    uplink1: 'Core-Router-A',
    uplink2: 'Core-Router-B',
  },
]

export const useNocStore = create<NocStore>((set, get) => ({
  devices: generateMockDevices(),
  addDevice: (device) => set((state) => ({ devices: [...state.devices, device] })),
  updateDevice: (id, updates) =>
    set((state) => ({
      devices: state.devices.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    })),
  deleteDevice: (id) => set((state) => ({ devices: state.devices.filter((d) => d.id !== id) })),

  networkMetrics: Array.from({ length: 24 }, (_, i) => {
    const staticValues = [62, 58, 65, 72, 68, 75, 82, 78, 85, 88, 84, 90, 92, 88, 85, 80, 76, 70, 65, 68, 72, 75, 78, 81]
    return {
      timestamp: new Date(REFERENCE_DATE.getTime() - (24 - i) * 3600000),
      value: staticValues[i] || 70,
    }
  }),
  addMetric: (metric) => set((state) => ({ networkMetrics: [...state.networkMetrics.slice(-23), metric] })),

  incidents: generateMockIncidents(),
  addIncident: (incident) => set((state) => ({ incidents: [...state.incidents, incident] })),
  updateIncident: (id, updates) =>
    set((state) => ({
      incidents: state.incidents.map((i) => (i.id === id ? { ...i, ...updates } : i)),
    })),
  resolveIncident: (id) =>
    set((state) => ({
      incidents: state.incidents.map((i) =>
        i.id === id ? { ...i, status: 'resolved', updatedAt: new Date() } : i
      ),
    })),

  customers: generateMockCustomers(),
  addCustomer: (customer) => set((state) => ({ customers: [...state.customers, customer] })),
  updateCustomer: (id, updates) =>
    set((state) => ({
      customers: state.customers.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),

  reports: [],
  addReport: (report) => set((state) => ({ reports: [...state.reports, report] })),

  users: generateMockUsers(),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updates) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
    })),

  cities: generateMockCities(),
  updateCity: (id, updates) =>
    set((state) => ({
      cities: state.cities.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),

  routers: generateMockRouters(),
  updateRouter: (id, updates) =>
    set((state) => ({
      routers: state.routers.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    })),

  getHealthyDeviceCount: () => get().devices.filter((d) => d.status === 'healthy').length,
  getWarningDeviceCount: () => get().devices.filter((d) => d.status === 'warning').length,
  getCriticalDeviceCount: () => get().devices.filter((d) => d.status === 'critical').length,
  getOpenIncidentCount: () => get().incidents.filter((i) => i.status === 'open' || i.status === 'in-progress').length,
  getAverageUptime: () => {
    const avg = get().devices.reduce((sum, d) => sum + d.uptime, 0) / get().devices.length
    return Math.round(avg * 10) / 10
  },
}))
