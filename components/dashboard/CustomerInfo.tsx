interface CustomerInfoProps {
  customer: any;
}

export default function CustomerInfo({ customer }: CustomerInfoProps) {
  const customerDetails = [
    { label: 'Customer Name', value: customer['CUSTOMER NAME'] },
    { label: 'XL ID', value: customer['XL ID'] },
    { label: 'City', value: customer['CITY'] },
    { label: 'Cluster', value: customer['CLUSTER NAME'] },
    { label: 'Cluster ID', value: customer['CLUSTER ID'] },
    { label: 'Bandwidth/Paket', value: customer['BW/PAKET'] },
    { label: 'PPPoE Username', value: customer['PPPOE USERNAME'] },
    { label: 'Device Type', value: customer['DEVICE'] },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold text-foreground mb-6">Customer Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customerDetails.map((detail, index) => (
          <div key={index} className="p-4 bg-secondary/30 rounded-lg border border-border/50">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              {detail.label}
            </p>
            <p className="text-sm text-foreground font-medium break-words">{detail.value || '-'}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Infrastructure IDs
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">FAT ID:</span>
                <span className="text-foreground font-mono">{customer['FAT ID']}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">FDT ID:</span>
                <span className="text-foreground font-mono">{customer['FDT ID']}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">HP ID:</span>
                <span className="text-foreground font-mono">{customer['HP ID']}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Network Config
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ONU Number:</span>
                <span className="text-foreground font-mono">{customer['ONU NUMBER']}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">PON Port:</span>
                <span className="text-foreground font-mono">{customer['PON PORT']}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Slot:</span>
                <span className="text-foreground font-mono">{customer['SLOT']}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
