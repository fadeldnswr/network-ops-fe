'use client'

// Define props for AlertSummaryCard component
type AlertSummaryCardProps = {
    title: string
    value: number | string
    variant?: 'success' | 'warning' | 'danger'
    className?: string
}

export function AlertSummaryCard({ title, value, variant = 'success', className = '' }: AlertSummaryCardProps) {
    // Define styles for different variants
    const variantStyles = {
        default: {
        container: 'bg-card border-border',
        title: 'text-foreground',
        value: 'text-foreground',
        divider: 'bg-border',
        },
        danger: {
        container: 'bg-card border-red-500/30',
        title: 'text-foreground',
        value: 'text-red-400',
        divider: 'bg-red-500/20',
        },
        warning: {
        container: 'bg-card border-amber-500/30',
        title: 'text-foreground',
        value: 'text-amber-400',
        divider: 'bg-amber-500/20',
        },
        success: {
        container: 'bg-card border-emerald-500/30',
        title: 'text-foreground',
        value: 'text-emerald-400',
        divider: 'bg-emerald-500/20',
        },
    }

    // Define style variable
    const style = variantStyles[variant]

    return (
        <div
        className={`
        ${style.container}
        ${className}
        border rounded-xl overflow-hidden
        min-h-[120px]
        grid grid-cols-[2.2fr_1fr]
        shadow-sm
        `}>
            <div className="flex items-center px-6 py-5">
                <p className={`text-2xl md:text-3xl font-semibold leading-snug ${style.title}`}>{title}</p>
            </div>
            <div className="relative flex items-center justify-center px-4 py-5">
                <div className={`text-2xl md:text-3xl font-semibold leading-snug ${style.title}`}>
                    <span className={`text-4xl md:text-5xl font-bold tracking-tight ${style.value}`}>
                        {value}
                    </span>
                </div>
            </div>
        </div>
    )
}