import React from 'react';
import { Database, Shield, MapPin } from 'lucide-react';

export function RegionStatus() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-neutral-500">
      <div className="flex items-center gap-1">
        <MapPin className="w-3 h-3 text-red-500" />
        <span>Region: AF-NBO-1 (Eldoret Hub)</span>
      </div>
      <div className="flex items-center gap-1">
        <Shield className="w-3 h-3 text-amber-500" />
        <span>Secure Encryption: AES-256</span>
      </div>
      <div className="flex items-center gap-1">
        <Database className="w-3 h-3 text-emerald-500" />
        <span>DB Status: MySQL Stable</span>
      </div>
    </div>
  );
}

export default RegionStatus;
