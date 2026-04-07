
// Import necessary icons from lucide-react library
interface CustomerInfoProps {
  customer: any;
}

export default function CustomerInfo({ customer }: CustomerInfoProps) {
  // Define customer details to be displayed in the component, mapping labels to corresponding values from the customer data
  const customerDetails = [
    { label: 'Customer Name', value: customer['CUSTOMER NAME'] },
    { label: 'XL ID', value: customer['XL ID'] },
    { label: 'City', value: customer['CITY'] },
    { label: 'Cluster ID', value: customer['CLUSTER ID'] },
    { label: 'Cluster', value: customer['CLUSTER NAME'] },
    { label: 'Bandwidth', value: customer['BW/PAKET'] },
    { label: 'PPPoE', value: customer['PPPOE USERNAME'] },
    { label: 'Device', value: customer['DEVICE'] },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 h-full">
      <h3 className="text-sm font-semibold text-foreground mb-4">
        Customer Information
      </h3>

      {/* Customer Details */}
      <div className="grid grid-cols-2 gap-3">
        {customerDetails.map((detail, index) => (
          <div
            key={index}
            className="rounded-lg border border-border/60 bg-secondary/20 px-3 py-2"
          >
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-1">
              {detail.label}
            </p>
            <p className="text-xs text-foreground font-medium wrap-break-word line-clamp-2">
              {detail.value || '-'}
            </p>
          </div>
        ))}
      </div>

      {/* Infrastructure IDs */}
      <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
            Infrastructure IDs
          </p>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground">FAT ID</span>
              <span className="text-foreground font-mono text-right break-all">
                {customer['FAT ID'] || '-'}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground">FDT ID</span>
              <span className="text-foreground font-mono text-right break-all">
                {customer['FDT ID'] || '-'}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground">HP ID</span>
              <span className="text-foreground font-mono text-right break-all">
                {customer['HP ID'] || '-'}
              </span>
            </div>
          </div>
        </div>

        {/* Network Config */}
        <div className="space-y-2">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
            Network Config
          </p>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground">ONU Number</span>
              <span className="text-foreground font-mono">
                {customer['ONU NUMBER'] || '-'}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground">PON Port</span>
              <span className="text-foreground font-mono">
                {customer['PON PORT'] || '-'}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground">Slot</span>
              <span className="text-foreground font-mono">
                {customer['SLOT'] || '-'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}