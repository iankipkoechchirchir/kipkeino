import React, { useState } from 'react';
import { Settings, Shield, Bell, Key, Database, Globe, Check } from 'lucide-react';

interface AdminSettingsProps {
  onAddNotification?: (msg: string, level: 'critical' | 'warning' | 'success' | 'info') => void;
}

export default function AdminSettings({ onAddNotification }: AdminSettingsProps) {
  const [ticketMultiplier, setTicketMultiplier] = useState(1.0);
  const [antiDopingEnforced, setAntiDopingEnforced] = useState(true);
  const [smsGateway, setSmsGateway] = useState(true);
  const [weatherPolling, setWeatherPolling] = useState(5);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    if (onAddNotification) {
      onAddNotification('Global application configurations and security layers updated successfully.', 'success');
    }
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans" id="admin-settings-page">
      <div className="border-b border-[#1f1f24] pb-4">
        <h2 className="text-2xl font-display font-bold uppercase italic text-white tracking-tight">
          Global App configurations
        </h2>
        <p className="text-xs text-neutral-500 font-mono mt-0.5">
          Establish ticketing currencies, SMS gateways, anti-doping regulations, and auto-backup intervals
        </p>
      </div>

      <div className="max-w-3xl">
        <form onSubmit={handleSave} className="bg-neutral-950 border border-neutral-850 rounded-2xl p-6 sm:p-8 space-y-6">
          
          {/* SYSTEM MODE CARD */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-500" />
              <span>Security & Compliance Parameters</span>
            </h3>

            <div className="space-y-3.5 font-mono text-xs text-neutral-300">
              <div className="flex items-center justify-between p-4 bg-neutral-900/30 border border-neutral-850 rounded-xl">
                <div>
                  <span className="block text-white font-bold">Strict Anti-Doping Regulations</span>
                  <p className="text-[10px] text-neutral-500 mt-0.5 font-normal">Block athletic race results if ADAK biological passport is not verified.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAntiDopingEnforced(!antiDopingEnforced)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                    antiDopingEnforced ? 'bg-amber-500' : 'bg-neutral-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-black transition-transform duration-200 ${
                    antiDopingEnforced ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-900/30 border border-neutral-850 rounded-xl">
                <div>
                  <span className="block text-white font-bold">SMS Status Gateway Gateway</span>
                  <p className="text-[10px] text-neutral-500 mt-0.5 font-normal">Automatically trigger text alerts to coaches on weather or lane disruptions.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSmsGateway(!smsGateway)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                    smsGateway ? 'bg-amber-500' : 'bg-neutral-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-black transition-transform duration-200 ${
                    smsGateway ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* PARAMETERS SECTION */}
          <div className="space-y-4 border-t border-neutral-900 pt-5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-500" />
              <span>Operations & Ticketing Pricing</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">
                  Ticket Surcharge Multiplier
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="3.0"
                  value={ticketMultiplier}
                  onChange={(e) => setTicketMultiplier(parseFloat(e.target.value) || 1.0)}
                  className="w-full px-3.5 py-2.5 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
                <span className="text-[9px] text-neutral-500 mt-1 block">Adjust standard prices by this factor on match-day</span>
              </div>

              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">
                  Weather Barometric Polling (Mins)
                </label>
                <select
                  value={weatherPolling}
                  onChange={(e) => setWeatherPolling(parseInt(e.target.value) || 5)}
                  className="w-full px-3.5 py-2.5 border border-neutral-800 bg-[#0d0d0f] text-neutral-300 rounded-lg focus:outline-none focus:border-amber-500"
                >
                  <option value={1}>1 Minute Interval</option>
                  <option value={5}>5 Minutes Interval</option>
                  <option value={15}>15 Minutes Interval</option>
                  <option value={30}>30 Minutes Interval</option>
                </select>
                <span className="text-[9px] text-neutral-500 mt-1 block">Frequency of Kip Keino barometer telemetry update</span>
              </div>
            </div>
          </div>

          {/* BACKUP STRATEGY */}
          <div className="space-y-4 border-t border-neutral-900 pt-5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-500" />
              <span>Database Retention & Backups</span>
            </h3>

            <div className="font-mono text-xs">
              <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">
                Backup Frequency
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['hourly', 'daily', 'weekly'].map(freq => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setBackupFrequency(freq)}
                    className={`py-2 border text-[9px] uppercase font-bold rounded-lg transition text-center ${
                      backupFrequency === freq
                        ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                        : 'bg-neutral-900 border-neutral-850 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ACTION SUBMIT */}
          <div className="border-t border-neutral-900 pt-6 flex items-center justify-between">
            <span className="text-[10px] font-mono text-neutral-500 uppercase">Config Key: SEC-STADIUM-2026</span>
            
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase rounded-lg text-xs tracking-widest transition flex items-center gap-1.5"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Configurations Saved</span>
                </>
              ) : (
                <>
                  <Settings className="w-4 h-4" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
