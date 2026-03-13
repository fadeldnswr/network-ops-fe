
// Define types for RSL Overview data
export type RSLStatus = 'CRIT' | 'WARN' | 'GOOD'

// Define RSL output item from API
export type RSLOutputItem = {
  olt_name: string
  pon_port: string
  rsl_percent: number
  status: string
  last_updated: string
}

// Define RSL output response from API
export type RSLOutputResponse = {
  data: RSLOutputItem[]
}

// Define RSL output row for UI
export type RSLOutputRow = {
  id: string
  olt_name: string
  pon_port: string
  rsl_percent: number
  status: RSLStatus
  last_updated: string
}