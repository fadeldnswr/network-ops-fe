import { Signal, User } from "lucide-react";

// Define props for SignalStrength component
interface SignalStrengthProps {
  data: any;
}

export default function SignalStrength({ data }: SignalStrengthProps) {
  // Convert Rx and Tx power values to numbers for quality assessment
  const rxPower = Number(data.Rx_Power);
  const txPower = Number(data.Tx_Power);

  // Define functions to determine signal quality based on power levels for RX and TX
  const getRxQuality = (power: number) => {
    if (power > -15) return { label: 'Excellent', color: 'bg-success', text: 'text-success', percent: 100 };
    if (power > -20) return { label: 'Good', color: 'bg-success', text: 'text-success', percent: 85 };
    if (power > -25) return { label: 'Fair', color: 'bg-warning', text: 'text-warning', percent: 60 };
    return { label: 'Poor', color: 'bg-destructive', text: 'text-destructive', percent: 30 };
  };

  // Define function to determine signal quality for TX power levels
  const getTxQuality = (power: number) => {
    if (power > 4) return { label: 'High', color: 'bg-warning', text: 'text-warning', percent: 80 };
    if (power > 0) return { label: 'Normal', color: 'bg-success', text: 'text-success', percent: 70 };
    return { label: 'Low', color: 'bg-destructive', text: 'text-destructive', percent: 40 };
  };

  // Get quality assessments for RX and TX power levels
  const rxQuality = getRxQuality(rxPower);
  const txQuality = getTxQuality(txPower);

  // Define card data for RX and TX power with corresponding quality assessments
  const cards = [
    {
      title: 'RX Power',
      value: `${data.Rx_Power} dBm`,
      icon: <Signal />,
      quality: rxQuality,
    },
    {
      title: 'TX Power',
      value: `${data.Tx_Power} dBm`,
      icon: <Signal />,
      quality: txQuality,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {cards.map((item) => (
        <div key={item.title} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                {item.title}
              </p>
              <p className="text-xl font-bold text-foreground mt-1">{item.value}</p>
            </div>
            <span className="text-xl">{item.icon}</span>
          </div>

          <div className="space-y-1.5">
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${item.quality.color} transition-all duration-300`}
                style={{ width: `${item.quality.percent}%` }}
              />
            </div>
            <p className={`text-[11px] font-medium ${item.quality.text}`}>
              {item.quality.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}