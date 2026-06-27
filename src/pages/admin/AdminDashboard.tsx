import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Database, 
  Activity, 
  Cpu, 
  HardDrive, 
  Clock, 
  RefreshCw 
} from 'lucide-react';

export default function AdminDashboard() {
  const [latency, setLatency] = useState(14);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const stats = [
    { label: 'Active Athletes', value: '142', change: '+12%', type: 'positive' },
    { label: 'Total Personnel', value: '38', change: 'Stable', type: 'neutral' },
    { label: 'MySQL Pool', value: '7/10', change: '70% Capacity', type: 'neutral' },
    { label: 'System Health', value: '99.98%', change: 'Excellent', type: 'positive' }
  ];

  const dbNodes = [
    { name: 'Primary RW Node (AF-NBO-1)', type: 'Master', status: 'Online', replication: '0ms' },
    { name: 'Replica RO Node (AF-NBO-2)', type: 'Replica', status: 'Online', replication: '12ms' },
    { name: 'Backup Cache Server (AF-NBO-3)', type: 'Redis Cache', status: 'Synchronizing', replication: '2ms' }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLatency(Math.floor(10 + Math.random() * 8));
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-6" id="admin-dashboard-page">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-850 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold uppercase italic text-white tracking-tight">
            Root Admin Control Deck
          </h2>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">
            Real-time server infrastructure status, connected athlete counts, and database pool telemetry
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[10px] font-mono rounded text-neutral-400 hover:text-white transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-500' : ''}`} />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* METRIC BOXES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div key={idx} className="p-5 bg-neutral-950 border border-neutral-850 rounded-xl relative overflow-hidden">
            <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider">{s.label}</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-display font-bold text-white">{s.value}</span>
              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                s.type === 'positive' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-neutral-900 text-neutral-400'
              }`}>
                {s.change}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 opacity-20 w-full" />
          </div>
        ))}
      </div>

      {/* DETAILED MONITOR PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SQL & INFRASTRUCTURE STATUS */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-500" />
              <span>Active MySQL Node Replication Status</span>
            </h3>

            <div className="space-y-3">
              {dbNodes.map((node, i) => (
                <div key={i} className="p-3.5 bg-neutral-900/30 border border-neutral-900 rounded-lg flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white block">{node.name}</span>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">{node.type}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-neutral-400 block">Lag: {node.replication}</span>
                      <span className="text-[8px] font-mono text-neutral-500">Query Pool ok</span>
                    </div>
                    <span className={`px-2 py-0.5 text-[8px] font-mono uppercase rounded ${
                      node.status === 'Online' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {node.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIVE SERVER PERFORMANCE PARAMETERS */}
          <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-neutral-900/40 border border-neutral-900 rounded-lg space-y-1">
              <span className="text-[9px] font-mono text-neutral-500 uppercase block">API Response Latency</span>
              <span className="text-lg font-mono font-bold text-white">{latency} ms</span>
              <span className="text-[8px] font-mono text-emerald-500 block">Class A Excellent</span>
            </div>
            <div className="p-3 bg-neutral-900/40 border border-neutral-900 rounded-lg space-y-1">
              <span className="text-[9px] font-mono text-neutral-500 uppercase block">CPU Usage Level</span>
              <span className="text-lg font-mono font-bold text-white">4.2%</span>
              <span className="text-[8px] font-mono text-neutral-400 block">Intel Xeon Gold</span>
            </div>
            <div className="p-3 bg-neutral-900/40 border border-neutral-900 rounded-lg space-y-1">
              <span className="text-[9px] font-mono text-neutral-500 uppercase block">Session Lock Mode</span>
              <span className="text-lg font-mono font-bold text-amber-500">Bcrypt-Active</span>
              <span className="text-[8px] font-mono text-neutral-500 block">Hash Cost: 10</span>
            </div>
          </div>
        </div>

        {/* RECENT EVENTS & ACTION TELEMETRY */}
        <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-5 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <Activity className="w-4 h-4 text-red-500" />
            <span>Root Audit Feed</span>
          </h3>

          <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
            <div className="border-l-2 border-amber-500 pl-3 py-1 space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 block">07:42:15 UTC</span>
              <p className="text-xs text-white">Database Pool connection restarted successfully</p>
              <span className="text-[9px] text-neutral-500 font-mono">By Operator IP: 192.168.1.1</span>
            </div>
            <div className="border-l-2 border-neutral-800 pl-3 py-1 space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 block">06:14:02 UTC</span>
              <p className="text-xs text-neutral-400">New athlete registered: <span className="text-neutral-200">Faith Kipyegon</span></p>
              <span className="text-[9px] text-neutral-500 font-mono">Discipline: 1500m Gold Elite</span>
            </div>
            <div className="border-l-2 border-neutral-800 pl-3 py-1 space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 block">04:30:11 UTC</span>
              <p className="text-xs text-neutral-400">Scheduled maintenance logged at Lane 4</p>
              <span className="text-[9px] text-neutral-500 font-mono">Assignee: Julius Keter</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
