
// Define status header component interface type
interface StatusHeaderProps {
  data: any;
  isOnline: boolean;
}

// Display component for showing ONT status summary with key information and visual indicators
export default function StatusHeader({ data, isOnline }: StatusHeaderProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <div
              className={`w-3 h-3 rounded-full ${
                isOnline ? 'bg-success' : 'bg-destructive'
              } animate-pulse`}
            />
            <h2 className="text-lg font-bold text-foreground">
              {isOnline ? 'Device Online' : 'Device Offline'}
            </h2>
          </div>

          <p className="text-xs text-muted-foreground break-words">
            Serial: {data.SN_Number} • IP: {data.IP_WAN} • Last Sync: {data.last_sync}
          </p>
        </div>

        <div className="shrink-0">
          <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            {data.customer.DEVICE}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg bg-secondary/20 border border-border/50 px-3 py-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Status</p>
          <p className="text-base font-semibold text-foreground mt-1">{data.Status_ONT}</p>
        </div>

        <div className="rounded-lg bg-secondary/20 border border-border/50 px-3 py-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">ONU Number</p>
          <p className="text-base font-semibold text-foreground mt-1">
            {data.customer['ONU NUMBER']}
          </p>
        </div>

        <div className="rounded-lg bg-secondary/20 border border-border/50 px-3 py-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">PON Port</p>
          <p className="text-base font-semibold text-foreground mt-1">
            {data.customer['PON PORT']}
          </p>
        </div>

        <div className="rounded-lg bg-secondary/20 border border-border/50 px-3 py-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Slot</p>
          <p className="text-base font-semibold text-foreground mt-1">
            {data.customer.SLOT}
          </p>
        </div>
      </div>
    </div>
  );
}