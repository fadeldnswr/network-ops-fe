// Define technical details component interface type
interface TechnicalDetailsProps {
  data: any;
}

// Component to display technical details of ONT status in a structured format
export default function TechnicalDetails({ data }: TechnicalDetailsProps) {
  const details = [
    { label: 'Serial Number', value: data.SN_Number },
    { label: 'IP WAN', value: data.IP_WAN },
    { label: 'Temperature', value: `${data.Temperature_ONT}°C` },
    { label: 'PON Status', value: data.PON_Status },
    { label: 'OLT ID', value: data.customer['OLT ID'] },
    { label: 'FAT ID', value: data.customer['FAT ID'] },
    { label: 'FDT ID', value: data.customer['FDT ID'] },
    { label: 'HP ID', value: data.customer['HP ID'] },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 h-full">
      <h3 className="text-sm font-semibold text-foreground mb-4">
        Technical Details
      </h3>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {details.map((detail, index) => (
          <div key={index} className="rounded-lg border border-border/50 bg-secondary/20 px-3 py-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">
              {detail.label}
            </p>
            <p className="text-xs text-foreground font-mono break-all">
              {detail.value || '-'}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Last Sync</p>
        <p className="text-sm font-medium text-foreground mt-1">{data.last_sync}</p>
      </div>
    </div>
  );
}