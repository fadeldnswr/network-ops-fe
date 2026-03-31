interface StatusCardProps {
  title: string;
  value: string;
  status: 'online' | 'offline' | 'warning' | 'neutral';
  icon: string;
  secondary?: boolean;
}

export default function StatusCard({
  title,
  value,
  status,
  icon,
  secondary = false,
}: StatusCardProps) {
  const statusColors = {
    online: 'bg-success/10 text-success border-success/20',
    offline: 'bg-destructive/10 text-destructive border-destructive/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    neutral: 'bg-muted/10 text-muted-foreground border-muted/20',
  };

  const dotColors = {
    online: 'bg-success',
    offline: 'bg-destructive',
    warning: 'bg-warning',
    neutral: 'bg-muted-foreground',
  };

  return (
    <div className={`border rounded-lg p-6 bg-card ${statusColors[status]} border-current`}>
      <div className="flex items-start justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <div className={`w-2 h-2 rounded-full ${dotColors[status]}`} />
      </div>

      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
        {title}
      </p>
      <p className="text-2xl font-bold text-foreground break-words">{value}</p>

      {secondary && (
        <p className="text-xs text-muted-foreground mt-3">Last recorded time</p>
      )}
    </div>
  );
}
