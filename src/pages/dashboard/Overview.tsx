import React from 'react';
import { ShieldCheck, Users, Trophy, DollarSign, Activity, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';

interface OverviewProps {
  stats?: {
    totalAthletes: number;
    activeStaff: number;
    stadiumCompletion: number;
    revenueKES: number;
    dbStatus: string;
  };
}

export default function Overview({ stats }: OverviewProps) {
  const currentStats = stats || {
    totalAthletes: 142,
    activeStaff: 38,
    stadiumCompletion: 85,
    revenueKES: 17350000,
    dbStatus: 'Connected (MySQL: Kipkoech)'
  };

  return (
    <div className="space-y-6" id="mgmt-overview-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <h2 className="text-2xl font-serif font-light text-white tracking-tight">Executive Control Centre</h2>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">Admin Overview • Real-time facility metrics & staff rosters</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded">
          <Activity className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span className="text-neutral-400">DB Status:</span>
          <span className="text-amber-400 font-bold">{currentStats.dbStatus}</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-neutral-900/40 border border-neutral-800 p-4 rounded-xl">
          <div className="flex justify-between items-start text-neutral-500">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Total Active Athletes</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-serif text-white">{currentStats.totalAthletes}</span>
            <span className="text-[10px] font-mono text-emerald-500 font-medium">+12% this mth</span>
          </div>
          <p className="text-[10px] text-neutral-500 mt-1">Eldoret Academy Track & Field</p>
        </div>

        <div className="bg-neutral-900/40 border border-neutral-800 p-4 rounded-xl">
          <div className="flex justify-between items-start text-neutral-500">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Staff On-Duty</span>
            <Users className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-serif text-white">{currentStats.activeStaff}</span>
            <span className="text-[10px] font-mono text-neutral-400">14 Operations • 24 Maint</span>
          </div>
          <p className="text-[10px] text-neutral-500 mt-1">Managed by Admin (Kipkoech)</p>
        </div>

        <div className="bg-neutral-900/40 border border-neutral-800 p-4 rounded-xl">
          <div className="flex justify-between items-start text-neutral-500">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Stadium Progress</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-serif text-white">{currentStats.stadiumCompletion}%</span>
            <span className="text-[10px] font-mono text-amber-500">AFCON 2027 Spec</span>
          </div>
          <p className="text-[10px] text-neutral-500 mt-1">On-track for handover Dec 31</p>
        </div>

        <div className="bg-neutral-900/40 border border-neutral-800 p-4 rounded-xl">
          <div className="flex justify-between items-start text-neutral-500">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Revenue (Ticket/Grants)</span>
            <DollarSign className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-mono text-white">KES {currentStats.revenueKES.toLocaleString()}</span>
          </div>
          <p className="text-[10px] text-neutral-500 mt-1">Gate receipts & Ministry funds</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Active Alerts and Operations Logs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" />
              Critical Operational Bulletins
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded flex gap-3 items-start">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-amber-400 block font-mono">Tartan Track Laying Underway (Lane 4-6)</span>
                  <p className="text-neutral-400 mt-1 leading-relaxed">Sinohydro engineering division reports active polymer curing. Athletes must reroute training sprints to the secondary complex until Monday.</p>
                </div>
              </div>

              <div className="p-3 bg-red-500/5 border border-red-500/20 rounded flex gap-3 items-start">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-red-400 block font-mono">VIP Pavilion Electrical Maintenance</span>
                  <p className="text-neutral-400 mt-1 leading-relaxed">Emergency transformer diagnostics at Zone C scheduled for 14:00. Backup diesel generators will support CCTV networks.</p>
                </div>
              </div>

              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded flex gap-3 items-start">
                <span className="w-2 h-2 rounded-full bg-neutral-500 mt-1.5 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-neutral-300 block font-mono">Payroll System Synchronization</span>
                  <p className="text-neutral-500 mt-1 leading-relaxed">Administrator validated monthly payroll disbursement for KDF ground maintenance staff. Ledger balances cleared.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Quick System Actions */}
        <div className="space-y-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-4">Quick Admin Dispatches</h3>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <button className="w-full text-left p-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-amber-500/30 transition rounded flex justify-between items-center">
                <span>Roster Shift Adjustments</span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase">Staff Module →</span>
              </button>
              <button className="w-full text-left p-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-amber-500/30 transition rounded flex justify-between items-center">
                <span>Record New Track Mark</span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase">Athletes Module →</span>
              </button>
              <button className="w-full text-left p-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-amber-500/30 transition rounded flex justify-between items-center">
                <span>Equipment Replacements</span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase">Inventory Module →</span>
              </button>
              <button className="w-full text-left p-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-amber-500/30 transition rounded flex justify-between items-center">
                <span>MySQL DB Connection Audit</span>
                <span className="text-[10px] font-mono text-amber-500 uppercase">Admin Console →</span>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/5 to-transparent border border-neutral-800/80 p-5 rounded-xl text-xs">
            <h4 className="font-serif font-semibold text-white mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              Compliance Guarantee
            </h4>
            <p className="text-neutral-400 leading-relaxed font-sans">
              All infrastructure upgrades meet the rigorous track certification standards set by **World Athletics IAAF** and security clearances of **KDF Supervising Body**.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
