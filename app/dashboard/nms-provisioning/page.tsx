'use client';

import { useState } from 'react';
import { KeyRound, ListOrdered, MessageSquareCheck, User } from 'lucide-react';

// NMS Provisioning page component for handling device provisioning requests
export default function NMSProvisioning() {
  const [serialNum, setSerialNum] = useState<string>('');
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Function to submit provisioning request to backend API
  const handleSubmit = async () => {
    try {
        setLoading(true);
        setError("Success! Check the console for response data."); // Placeholder success message
    } catch (e: any) {
        setError(e?.message ?? "An error occurred while processing the request.");
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="sm:px-6 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquareCheck className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">NMS Provisioning</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Automated provisioning and configuration management for network devices
          </p>
        </div>

        <section className="rounded-lg border border-border bg-card px-5 py-4 shadow-sm mb-2">
            <div className="flex gap-3 items-end">
                <div className="flex-1 mb-2">
                    <div>
                        <section className='flex items-center gap-2 mb-4'>
                            <ListOrdered className='w-5 h-5 text-primary' />
                            <label className="text-sm font-medium text-foreground">
                                Serial Number
                            </label>
                        </section>
                        <input
                            type="text"
                            value={serialNum}
                            onChange={(e) => {
                                setSerialNum(e.target.value);
                                setError('');
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            placeholder="Enter serial number (e.g. SN123456789)"
                            className="w-full px-4 py-2.5 mb-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <section className='flex items-center gap-2 mb-4 mt-2'>
                            <User className='w-5 h-5 text-primary' />
                            <label className="text-sm font-medium text-foreground">
                                Username
                            </label>
                        </section>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError('');
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            placeholder="Enter username"
                            className="w-full px-4 py-2.5 mb-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <section className='flex items-center gap-2 mb-4 mt-2'>
                            <KeyRound className='w-5 h-5 text-primary' />
                            <label className="text-sm font-medium text-foreground">
                                Password
                            </label>
                        </section>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            placeholder="Enter password"
                            className="w-full px-4 py-2.5 mb-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>
            {error && (
                <div className="mt-3 p-3 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
                {error}
                </div>
            )}
        </section>
        <button
            onClick={handleSubmit}
              disabled={loading}
              className="h-[46px] px-6 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Loading...' : 'Submit'}
            </button>
      </div>
    </div>
  );
}