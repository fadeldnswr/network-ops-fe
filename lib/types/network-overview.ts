

// Define network overview types
export type NetworkOverviewResponse = {
  total_bandwidth: number
  current_usage: number
  usage_percent: number
  in_bps: number
  out_bps: number
  in_gb: number
  out_gb: number
}

// Define network graph data point type for time series charts
export type NetworkGraphResponse = {
    name: string
    timestamp: string
    in_bps: number
    out_bps: number
}

// Define network graph list response type for time series API endpoint
export type NetworkGraphListResponse = {
    data: NetworkGraphResponse[]
}