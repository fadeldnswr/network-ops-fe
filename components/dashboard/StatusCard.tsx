// Define the props for the StatusCard component
interface StatusCardProps {
  title: string;
  value: string;
  status: 'online' | 'offline' | 'warning' | 'neutral';
  icon: React.ReactNode;
  secondary?: boolean;
}

export default function StatusCard({ title, value, status, icon, secondary = false}: StatusCardProps) {
  // Determine the appropriate status colors based on the status prop
  const statusColors = {
    online: 'border-success/30 bg-success/5',
    offline: 'border-destructive/30 bg-destructive/5',
    warning: 'border-warning/30 bg-warning/5',
    neutral: 'border-border bg-card',
  };
  
  // Define dot colors for the status indicator based on the status prop
  const dotColors = {
    online: 'bg-success',
    offline: 'bg-destructive',
    warning: 'bg-warning',
    neutral: 'bg-muted-foreground',
  };

  return (
    <div className={`rounded-xl border p-4 ${statusColors[status]}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg">{icon}</span>
        <div className={`w-2 h-2 rounded-full ${dotColors[status]}`} />
      </div>

      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-1">
        {title}
      </p>

      <p className="text-lg font-semibold text-foreground wrap-break-word leading-tight">
        {value}
      </p>

      {secondary && (
        <p className="text-[11px] text-muted-foreground mt-2">Last recorded time</p>
      )}
    </div>
  );
}