'use client';

import { useState } from 'react';
import StatusHeader from '@/components/dashboard/StatusHeader';
import CustomerInfo from '@/components/dashboard/CustomerInfo';
import SignalStrength from '@/components/dashboard/SignalStrength';
import StatusCard from '@/components/dashboard/StatusCard';
import TechnicalDetails from '@/components/dashboard/TechnicalDetails';
import { CircleAlert, Clock, MessageSquareCheck, Thermometer } from 'lucide-react';

// Define sample data structure for ONT status, including customer details and technical parameters
const sampleData = {
  IP_WAN: "10.103.66.67",
  Last_Off_Time: "2026-02-04 09:18:42",
  PON_Status: "UP",
  Rx_Power: "-21.19",
  SN_Number: "FHTTc1084d39",
  Status_ONT: "UP",
  Temperature_ONT: "46.17",
  Tx_Power: "2.35",
  customer: {
    "BW/PAKET": "PID_FTTH_ENT_BIZ_PRIME",
    "CITY": "KOTA JAMBI",
    "CLUSTER ID": "JMB-00636",
    "CLUSTER NAME": "KELURAHAN KENALI ASAM BAWAH",
    "COLUMN 1": "10026",
    "CUSTOMER NAME": "VISKA SHELFIYASRI",
    "DEVICE": "FIBER HOME",
    "FAT ID": "FAT-JMB-768-D01-05",
    "FDT ID": "FDT-48-JMB-60077104-768",
    "HP ID": "HP-120122600010",
    "OLT ID": "OLT-JAM-THEHOK-02",
    "ONU NUMBER": "4",
    "PHONE NUMBER": "",
    "PON PORT": "11",
    "PPPOE USERNAME": "60665291@xl.co.id",
    "SERIAL NUMBER": "FHTTC1084D39",
    "SLOT": "5",
    "XL ID": "60665291"
  },
  last_sync: "02:19:07"
};

export default function ONTChecker() {
  const [data, setData] = useState<typeof sampleData>(sampleData);
  const [customerId, setCustomerId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleCheckStatus = async () => {
    if (!customerId.trim()) {
      setError('Please enter a Customer ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Fetch ONT status data from API
      const response = await fetch(`/api/ont?customer_id=${encodeURIComponent(customerId)}`);
      const result = await response.json();
      
      // Check if response if not ok and throw error to be caught in catch block
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching data';
      setError(errorMessage);
      console.error('[ONT Checker] Error:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Determine if ONT is online based on status values
  const isOnline = data.Status_ONT === 'UP' && data.PON_Status === 'UP';

  return (
    <div className="space-y-6">
      <div className="sm:px-6 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquareCheck className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">ONT Status Checker</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time device monitoring and diagnostics
          </p>
        </div>

        <section className="rounded-lg border border-border bg-card px-5 py-4 shadow-sm">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Customer ID / XL ID
              </label>
              <input
                type="text"
                value={customerId}
                onChange={(e) => {
                  setCustomerId(e.target.value);
                  setError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleCheckStatus()}
                placeholder="Enter Customer ID (e.g., 60665291)"
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleCheckStatus}
              disabled={loading}
              className="h-11.5 px-6 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Check Status'}
            </button>
          </div>

          {error && (
            <div className="mt-3 p-3 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 gap-4">
          <StatusHeader data={data} isOnline={isOnline} />

          {/* Row 1: Signal + Status */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-stretch">
            <div className="h-full">
              <SignalStrength data={data} />
            </div>

            <div className="grid grid-cols-1 gap-4 h-full">
              <StatusCard
                title="PON Status"
                value={data.PON_Status}
                status={data.PON_Status === 'UP' ? 'online' : 'offline'}
                icon=<CircleAlert />
              />
              <StatusCard
                title="Temperature"
                value={`${data.Temperature_ONT}°C`}
                status={Number(data.Temperature_ONT) > 50 ? 'warning' : 'online'}
                icon=<Thermometer />
              />
            </div>
          </div>

          {/* Optional slim card for last offline */}
          <div className="grid grid-cols-1">
            <StatusCard
              title="Last Offline"
              value={data.Last_Off_Time}
              status="neutral"
              icon=<Clock />
              secondary
            />
          </div>

          {/* Row 2: Details + Customer */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
            <TechnicalDetails data={data} />
            <CustomerInfo customer={data.customer} />
          </div>
        </section>
      </div>
    </div>
  );
}