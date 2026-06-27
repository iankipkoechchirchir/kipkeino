import React, { useState } from 'react';
import { Terminal, ShieldAlert, Filter, Search, Download, Trash2, Calendar, Database, RefreshCw } from 'lucide-react';

interface AuditLogRecord {
  id: string;
  username: string;
  action: string;
  ip_address: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'security';
  module: string;
}

export default function AuditLogs() {
  const [records, setRecords] = useState<AuditLogRecord[]>([
    { id: 'aud-9901', username: 'admin', action: 'Authorized database initial seed scripts execution via schema.sql', ip_address: '127.0.0.1', timestamp: '2026-06-27 12:00:00', severity: 'info', module: 'Database' },
    { id: 'aud-9902', username: 'admin', action: 'Added athlete Faith Kipyegon to elite academy register roster', ip_address: '192.168.1.100', timestamp: '2026-06-27 12:04:22', severity: 'info', module: 'Athlete Board' },
    { id: 'aud-9903', username: 'kipkoech_staff', action: 'Updated facility completion_percentage on VIP Pavilion to 95%', ip_address: '192.168.1.105', timestamp: '2026-06-27 12:31:12', severity: 'warning', module: 'Facilities' },
    { id: 'aud-9904', username: 'admin', action: 'Modified email verification template: "Athlete Welcome & Verification"', ip_address: '127.0.0.1', timestamp: '2026-06-27 14:12:05', severity: 'warning', module: 'Templates' },
    { id: 'aud-9905', username: 'anonymous_gateway', action: 'Failed ssh login attempt - Blocked by Eldoret Hub firewalls', ip_address: '45.118.90.22', timestamp: '2026-06-27 14:20:18', severity: 'security', module: 'Security Port' },
    { id: 'aud-9906', username: 'admin', action: 'Triggered database verification pool check. Result: STABLE', ip_address: '127.0.0.1', timestamp: '2026-06-27 14:25:30', severity: 'info', module: 'Database' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterModule, setFilterModule] = useState<string>('all');

  const filteredRecords = records.filter(rec => {
    const matchesSearch = rec.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rec.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rec.ip_address.includes(searchTerm);
    const matchesSeverity = filterSeverity === 'all' || rec.severity === filterSeverity;
    const matchesModule = filterModule === 'all' || rec.module === filterModule;

    return matchesSearch && matchesSeverity && matchesModule;
  });

  const clearAllLogs = () => {
    if (window.confirm('Are you absolutely sure you want to truncate the esms_db.audit_logs table? This action is unmodifiable.')) {
      setRecords([]);
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'security':
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      case 'warning':
        return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
      default:
        return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
    }
  };

  return (
    <div className="space-y-6" id="audit-logs-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <h2 className="text-2xl font-serif font-light text-white tracking-tight">System Audit Logs</h2>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">Relational database timeline • Cryptographically-stamped ledger events</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={clearAllLogs}
            className="flex items-center gap-1 px-3 py-1.5 bg-neutral-905 border border-rose-500/20 hover:border-rose-500 text-rose-400 text-xs font-semibold rounded font-mono transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Truncate Table
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search action keyword, IP, user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-neutral-900 border border-neutral-800 text-xs text-white rounded font-mono placeholder-neutral-600 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500 text-[10px] uppercase font-bold">Severity</span>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300 focus:outline-none"
            >
              <option value="all">All Severities</option>
              <option value="info">INFO</option>
              <option value="warning">WARNING</option>
              <option value="security">SECURITY ALERT</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500 text-[10px] uppercase font-bold">Module</span>
            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300 focus:outline-none"
            >
              <option value="all">All Modules</option>
              <option value="Database">Database</option>
              <option value="Athlete Board">Athlete Board</option>
              <option value="Facilities">Facilities</option>
              <option value="Templates">Templates</option>
              <option value="Security Port">Security Port</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#0A0A0A] border border-neutral-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-neutral-900 bg-neutral-950 flex justify-between items-center">
          <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-500 animate-pulse" />
            Active Terminal Logs (esms_db.audit_logs)
          </span>
          <span className="text-[10px] font-mono text-neutral-500">{filteredRecords.length} records found</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-900 bg-neutral-950/50 text-neutral-500 font-mono text-[9px] uppercase tracking-wider">
                <th className="py-3 px-4">Log ID</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Action Ledger Description</th>
                <th className="py-3 px-4 text-right">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 font-mono text-xs text-neutral-300">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-neutral-500 italic">
                    No database events match the search query parameters.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-neutral-900/20 transition">
                    <td className="py-3 px-4 text-neutral-600 font-bold">{rec.id}</td>
                    <td className="py-3 px-4 text-neutral-400">{rec.timestamp}</td>
                    <td className="py-3 px-4 text-white font-semibold">{rec.username}</td>
                    <td className="py-3 px-4 text-neutral-500 text-[11px] select-all">{rec.ip_address}</td>
                    <td className="py-3 px-4 text-amber-500 font-bold">{rec.module}</td>
                    <td className="py-3 px-4 text-neutral-300 leading-relaxed max-w-md truncate md:whitespace-normal select-text">
                      {rec.action}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${getSeverityBadge(rec.severity)}`}>
                        {rec.severity.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
