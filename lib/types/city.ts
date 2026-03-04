
// Export types related to city overview and trouble ticket breakdown
export type TroubleTicketBreakdown = {
  total: number
  incident: number
  complaint: number
}

// City overview summary and row types for API responses
export type CityOverviewSummary = {
  as_of: string
  total_ont: number
  online_ont: number
  offline_ont: number
  online_pct: number
  avg_health_score_pct: number
  active_tt_total: number
  active_incident: number
  active_complaint: number
}

// City row type for detailed city information in the overview response
export type CityRow = {
  city: string
  as_of: string
  total_ont: number
  online_ont: number
  offline_ont: number
  online_pct: number
  health_pct: number
  health_score: number
  tt: TroubleTicketBreakdown
  ai_recommendation: string
  ai_severity: 'OK' | 'WARN' | 'CRIT' | string
}

// City overview response type for the API endpoint that provides a summary and detailed information for multiple cities
export type CityOverviewResponse = {
  as_of: string
  overview: CityOverviewSummary
  cities: CityRow[]
}