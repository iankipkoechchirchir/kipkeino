import React, { useState } from 'react';
import { Megaphone, AlertTriangle, CloudRain, Bell, RefreshCw, Send, ShieldAlert } from 'lucide-react';

interface BroadcastLog {
  id: string;
  sender: string;
  msg: string;
  level: 'critical' | 'warning' | 'success' | 'info';
  time: string;
  channels: string[];
}

interface AdminBroadcastProps {
  onAddNotification: (msg: string, level: 'critical' | 'warning' | 'success' | 'info') => void;
}

export default function AdminBroadcast({ onAddNotification }: AdminBroadcastProps) {
  const [broadcasts, setBroadcasts] = useState<BroadcastLog[]>([
    {
      id: 'bc-1',
      sender: 'Root Admin (Kipkoech)',
      msg: 'ADAK random biological monitoring set for Monday. Athletes must verify biometric records.',
      level: 'warning',
      time: '10 mins ago',
      channels: ['Athlete App Feed', 'SMS Gateway']
    },
    {
      id: 'bc-2',
      sender: 'Root Admin (Kipkoech)',
      msg: 'Barometric index normal: altitude training sessions cleared at 2,400m.',
      level: 'success',
      time: '2 hours ago',
      channels: ['All Portals']
    },
    {
      id: 'bc-3',
      sender: 'System Monitor',
      msg: 'Kip Keino Stadium Arena Lane 4 closed for routine maintenance resurfacing.',
      level: 'critical',
      time: '1 day ago',
      channels: ['Operations Board']
    }
  ]);

  const [newMsg, setNewMsg] = useState('');
  const [newLevel, setNewLevel] = useState<'critical' | 'warning' | 'success' | 'info'>('warning');
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['All Portals']);

  const handleChannelToggle = (channel: string) => {
    setSelectedChannels(prev => 
      prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
    );
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    // Call state update in parent context so notifications propagate to alerts feeds instantly!
    onAddNotification(newMsg, newLevel);

    const newLog: BroadcastLog = {
      id: 'bc-' + Date.now(),
      sender: 'Root Admin (Kipkoech)',
      msg: newMsg,
      level: newLevel,
      time: 'Just now',
      channels: selectedChannels
    };

    setBroadcasts([newLog, ...broadcasts]);
    setNewMsg('');
  };

  return (
    <div className="space-y-6 font-sans" id="admin-broadcast-page">
      <div className="border-b border-neutral-850 pb-4">
        <h2 className="text-2xl font-display font-bold uppercase italic text-white tracking-tight">
          System Broadcast Terminal
        </h2>
        <p className="text-xs text-neutral-500 font-mono mt-0.5">
          Push global announcements, SMS warnings, or alert rosters to on-duty staff, athletes, and coaches
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CRAFT BROADCAST CARD */}
        <div className="lg:col-span-5">
          <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-6 space-y-5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-amber-500" />
              <span>Compose Live System Alert</span>
            </h3>

            <form onSubmit={handleSendBroadcast} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Alert Level Mode</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['info', 'success', 'warning', 'critical'] as const).map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setNewLevel(lvl)}
                      className={`py-2 text-[9px] uppercase font-bold border rounded transition text-center ${
                        newLevel === lvl
                          ? lvl === 'critical' ? 'bg-red-500/10 border-red-500 text-red-400' :
                            lvl === 'warning' ? 'bg-amber-500/10 border-amber-500 text-amber-500' :
                            lvl === 'success' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' :
                            'bg-blue-500/10 border-blue-500 text-blue-400'
                          : 'bg-neutral-900 border-neutral-850 text-neutral-500 hover:text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Broadcast Message</label>
                <textarea
                  required
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  placeholder="Type official warning, schedule adjustment, or environmental hazard bulletin..."
                  className="w-full h-24 px-3.5 py-2.5 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Target Channels</label>
                <div className="flex flex-wrap gap-2">
                  {['All Portals', 'Athlete App Feed', 'Staff Operations Deck', 'SMS Gateway', 'ADAK Ledger'].map(ch => {
                    const isActive = selectedChannels.includes(ch);
                    return (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => handleChannelToggle(ch)}
                        className={`px-2.5 py-1.5 text-[9px] rounded-full border transition ${
                          isActive 
                            ? 'bg-amber-500/10 border-amber-500 text-amber-500' 
                            : 'bg-neutral-900/60 border-neutral-850 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {ch}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase rounded-lg text-xs tracking-widest transition flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Issue System Broadcast</span>
              </button>
            </form>
          </div>
        </div>

        {/* ACTIVE BROADCAST LOGS */}
        <div className="lg:col-span-7">
          <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Broadcast Dispatch History</span>
            </h3>

            <div className="space-y-3">
              {broadcasts.map((log) => (
                <div key={log.id} className="p-4 bg-neutral-900/30 border border-neutral-800/60 rounded-xl flex items-start gap-3.5">
                  <div className={`p-2 rounded-lg shrink-0 ${
                    log.level === 'critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    log.level === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    log.level === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    {log.level === 'critical' ? <AlertTriangle className="w-4 h-4 animate-bounce" /> : <Bell className="w-4 h-4" />}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] text-neutral-500 font-mono font-bold uppercase">{log.sender}</span>
                      <span className="text-[9px] text-neutral-500 font-mono">{log.time}</span>
                    </div>
                    <p className="text-xs text-neutral-200 font-sans leading-relaxed">{log.msg}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {log.channels.map((ch, idx) => (
                        <span key={idx} className="text-[8px] font-mono uppercase bg-neutral-900 border border-neutral-800 text-neutral-400 px-1.5 py-0.2 rounded-full">
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
