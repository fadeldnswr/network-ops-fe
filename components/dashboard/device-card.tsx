
// Define device card props
export type DeviceCardProps = {
    title: string
    value: number | string
    percent?: number | string
    variant?: 'default' | 'success' | 'danger'
}

export function DeviceCard({ title, value, percent, variant = "default"}: DeviceCardProps) {
    // Create styles for different variants
    const styles = {
        default: {
        container: "bg-card border border-border",
        text: "text-muted-foreground",
        value: "text-foreground",
        percent: "text-muted-foreground",
        },
        success: {
        container: "bg-green-500/10 border border-green-500/20",
        text: "text-green-400",
        value: "text-green-400",
        percent: "text-green-400",
        },
        danger: {
        container: "bg-red-500/10 border border-red-500/20",
        text: "text-red-400",
        value: "text-red-400",
        percent: "text-red-400",
        },
    }

    // Define style variable based on variant
    const style = styles[variant]

    return (
        <div className={`${style.container} rounded-lg p-4`}>
            <p className={`${style.text} text-sm mb-2`}>{title}</p>
            <p className={`text-3xl font-bold ${style.value}`}>
                {value.toLocaleString()}
            </p>
            {percent !== undefined && (
                <p className={`text-xs ${style.percent} mt-1`}>
                    {percent}%
                </p>
            )}
        </div>
    )
}