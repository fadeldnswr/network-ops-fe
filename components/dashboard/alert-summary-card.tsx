'use client'

// Define props for AlertSummaryCard component
type AlertSummaryCardProps = {
    title: string
    value: number | string
    variant?: 'success' | 'warning' | 'danger'
    className?: string
    icon?: React.ReactNode
}

// AlertSummaryCard component to display alert summary with different variants
export function AlertSummaryCard({ title, value, variant = 'success', className = '', icon }: AlertSummaryCardProps) {
    // Define styles for different variants
    const variantStyles = {
        default: {
        container: 'bg-card border-border',
        title: 'text-foreground',
        value: 'text-foreground',
        divider: 'bg-border',
        iconWrap: 'bg-secondary/40 text-muted-foreground',
        },
        danger: {
        container: 'bg-card border-red-500/30',
        title: 'text-foreground',
        value: 'text-red-400',
        divider: 'bg-red-500/20',
        iconWrap: 'bg-red-500/10 text-red-400',
        },
        warning: {
        container: 'bg-card border-amber-500/30',
        title: 'text-foreground',
        value: 'text-amber-400',
        divider: 'bg-amber-500/20',
        iconWrap: 'bg-amber-500/10 text-amber-400',
        },
        success: {
        container: 'bg-card border-emerald-500/30',
        title: 'text-foreground',
        value: 'text-emerald-400',
        divider: 'bg-emerald-500/20',
        iconWrap: 'bg-emerald-500/10 text-emerald-400',
        },
    }

    // Define style variable
    const style = variantStyles[variant]

    return (
        <div className={`${style.container} ${className} h-full border rounded-lg overflow-hidden
            min-h-[190px] grid grid-cols-[2.4fr_1fr] shadow-sm`}>
        <div className="flex items-center gap-4 px-5 py-5">
            {icon && (
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${style.iconWrap}`}>
                {icon}
            </div>
            )}

            <p className={`text-2xl md:text-lg font-semibold leading-snug ${style.title}`}>
            {title}
            </p>
        </div>

        <div className="relative flex items-center justify-center px-4 py-5">
            <div className={`absolute left-0 top-0 h-full w-px ${style.divider}`} />
            <span className={`text-4xl md:text-3xl font-bold tracking-tight ${style.value}`}>
            {value}
            </span>
        </div>
        </div>
    )
}