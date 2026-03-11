
// Define types for the severity
export type AlertSeverityApi = "Critical" | "Warning" | "Info" | "Normal"
export type AlertSeverityUi = "critical" | "warning" | "info" | "normal"
export type AlertStatusApi = string

// Define alert API item
export type AlertApiItem = {
    timestamp: string
    site: string
    device: string
    port: string
    alert_type: string
    severity: string
    status: string
    description: string
}

// Define alert API response
export type AlertApiResponse = {
    data: AlertApiItem[]
}

// Define alert table item for UI
export type AlertTableRow = {
    id: string
    timestamp: string
    site: string
    device: string
    port: string
    alert_type: string
    severity: AlertSeverityUi
    status: string
    description: string
}