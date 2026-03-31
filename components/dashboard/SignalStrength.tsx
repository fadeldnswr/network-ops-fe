interface SignalStrengthProps {
  data: any;
}

export default function SignalStrength({ data }: SignalStrengthProps) {
  const rxPower = Number(data.Rx_Power);
  const txPower = Number(data.Tx_Power);

  const getRxQuality = (power: number) => {
    if (power > -15) return { label: 'Excellent', color: 'bg-success', percent: 100 };
    if (power > -20) return { label: 'Good', color: 'bg-success', percent: 85 };
    if (power > -25) return { label: 'Fair', color: 'bg-warning', percent: 60 };
    return { label: 'Poor', color: 'bg-destructive', percent: 30 };
  };

  const getTxQuality = (power: number) => {
    if (power > 4) return { label: 'High', color: 'bg-warning', percent: 80 };
    if (power > 0) return { label: 'Normal', color: 'bg-success', percent: 70 };
    return { label: 'Low', color: 'bg-destructive', percent: 40 };
  };

  const rxQuality = getRxQuality(rxPower);
  const txQuality = getTxQuality(txPower);

  return (
    <div className="space-y-4">
      {/* RX Power */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              RX Power
            </p>
            <p className="text-2xl font-bold text-foreground mt-1">{data.Rx_Power} dBm</p>
          </div>
          <span className="text-2xl">📥</span>
        </div>

        <div className="space-y-2">
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div
              className={`h-full ${rxQuality.color} transition-all duration-300`}
              style={{ width: `${rxQuality.percent}%` }}
            />
          </div>
          <p className={`text-xs font-medium ${rxQuality.color === 'bg-success' ? 'text-success' : rxQuality.color === 'bg-warning' ? 'text-warning' : 'text-destructive'}`}>
            {rxQuality.label}
          </p>
        </div>
      </div>

      {/* TX Power */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              TX Power
            </p>
            <p className="text-2xl font-bold text-foreground mt-1">{data.Tx_Power} dBm</p>
          </div>
          <span className="text-2xl">📤</span>
        </div>

        <div className="space-y-2">
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div
              className={`h-full ${txQuality.color} transition-all duration-300`}
              style={{ width: `${txQuality.percent}%` }}
            />
          </div>
          <p className={`text-xs font-medium ${txQuality.color === 'bg-success' ? 'text-success' : txQuality.color === 'bg-warning' ? 'text-warning' : 'text-destructive'}`}>
            {txQuality.label}
          </p>
        </div>
      </div>
    </div>
  );
}
