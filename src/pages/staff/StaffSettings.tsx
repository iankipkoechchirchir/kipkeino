import React, { useState } from 'react';
import { User, Settings, Check, Bell, Shield } from 'lucide-react';

export default function StaffSettings() {
  const [name, setName] = useState('Julius Keter');
  const [shift, setShift] = useState('Morning (05:00 - 13:00)');
  const [notifySms, setNotifySms] = useState(true);
  const [autoDeduction, setAutoDeduction] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans text-left" id="staff-settings-page">
      <div className="border-b border-[#1f1f24] pb-4">
        <h2 className="text-2xl font-display font-bold uppercase italic text-white tracking-tight">
          Staff Account Settings
        </h2>
        <p className="text-xs text-neutral-500 font-mono mt-0.5">
          Modify your staff on-duty display name, operational shift slots, and notification triggers
        </p>
      </div>

      <div className="max-w-xl">
        <form onSubmit={handleSave} className="bg-neutral-950 border border-neutral-850 rounded-2xl p-6 space-y-6">
          
          {/* STAFF IDENTITY PROFILE */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500" />
              <span>Staff Profile Identity</span>
            </h3>

            <div className="space-y-3 font-mono text-xs text-neutral-300">
              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Staff Display Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Active Shift Assignment</label>
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-neutral-800 bg-[#0d0d0f] text-neutral-300 rounded-lg focus:outline-none focus:border-amber-500"
                >
                  <option value="Morning (05:00 - 13:00)">Morning (05:00 - 13:00)</option>
                  <option value="Evening (13:00 - 21:00)">Evening (13:00 - 21:00)</option>
                  <option value="Night Patrol (21:00 - 05:00)">Night Patrol (21:00 - 05:00)</option>
                  <option value="On-Call (Standby)">On-Call Standby</option>
                </select>
              </div>
            </div>
          </div>

          {/* CRITICAL SYSTEM TRIGGERS */}
          <div className="space-y-4 border-t border-neutral-900 pt-5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              <span>Operations Communication Triggers</span>
            </h3>

            <div className="space-y-3 font-mono text-xs text-neutral-300">
              <div className="flex items-center justify-between p-3.5 bg-neutral-900/30 border border-neutral-850 rounded-xl">
                <div>
                  <span className="block text-white font-bold">SMS Shift Alerts</span>
                  <p className="text-[9px] text-neutral-500 mt-0.5">Receive text notifications if shift assignments change.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifySms(!notifySms)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                    notifySms ? 'bg-amber-500' : 'bg-neutral-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-black transition-transform duration-200 ${
                    notifySms ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-neutral-900/30 border border-neutral-850 rounded-xl">
                <div>
                  <span className="block text-white font-bold">Automatic Duty Logging</span>
                  <p className="text-[9px] text-neutral-500 mt-0.5">Log finished task events directly to MySQL audit logs.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoDeduction(!autoDeduction)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                    autoDeduction ? 'bg-amber-500' : 'bg-neutral-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-black transition-transform duration-200 ${
                    autoDeduction ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* SUBMIT ROW */}
          <div className="border-t border-neutral-900 pt-6 flex items-center justify-between">
            <span className="text-[9px] font-mono text-neutral-500 uppercase">Operational Role: Staff</span>
            
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase rounded-lg text-xs tracking-widest transition flex items-center gap-1.5"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Settings Saved</span>
                </>
              ) : (
                <>
                  <Settings className="w-4 h-4" />
                  <span>Update Settings</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
