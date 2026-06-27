import React, { useState } from 'react';
import { ShieldAlert, HelpCircle, Activity, Send, CheckCircle, Trash2, Shield, AlertTriangle } from 'lucide-react';

export default function CoachSupport() {
  const [tickets, setTickets] = useState([
    { id: 'TKT-701', subject: 'Kipchoge Track Lane 3 Hurdle Damage', category: 'Facilities', urgency: 'high', status: 'In Review', message: 'The wooden safety border of the steeplechase pit is loose.', date: '2026-06-27' },
    { id: 'TKT-702', subject: 'Doping Clearance Testing Request (ADAK)', category: 'Medical/ADAK', urgency: 'medium', status: 'Pending Coordinator', message: 'Pre-clearance requests for 1500m athletes ahead of next weekend national trials.', date: '2026-06-26' }
  ]);

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Facilities');
  const [urgency, setUrgency] = useState('medium');
  const [message, setMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    const newTicket = {
      id: `TKT-${Math.floor(100 + Math.random() * 900)}`,
      subject,
      category,
      urgency,
      status: 'Open',
      message,
      date: new Date().toISOString().split('T')[0]
    };

    setTickets([newTicket, ...tickets]);
    setSubject('');
    setMessage('');
    setSuccessMsg('Diagnostic ticket submitted to Executive Groundkeepers successfully.');
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleDelete = (id: string) => {
    setTickets(tickets.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6 font-sans text-left" id="coach-support-page">
      
      {/* HEADER SECTION */}
      <div className="border-b border-neutral-850 pb-4">
        <h2 className="text-xl font-display font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <span>Coach Technical Support Center</span>
        </h2>
        <p className="text-xs text-neutral-400 font-mono">
          Report arena hurdles, request physical therapy rooms, or coordinate biological ADAK inspections.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-mono flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* REPORT NEW TICKET */}
        <div className="lg:col-span-5 bg-neutral-950 border border-neutral-850 rounded-2xl p-5 sm:p-6 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
            Log Maintenance & Clearances
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Ticket Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Lane 2 Electronic Timer glitch"
                className="w-full px-3 py-2 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-800 bg-[#0d0d0f] text-neutral-300 rounded-lg focus:outline-none focus:border-amber-500"
                >
                  <option value="Facilities">Facilities / Lanes</option>
                  <option value="Medical/ADAK">Medical & ADAK</option>
                  <option value="Supplies/Gear">Supplies / Gear</option>
                  <option value="Scheduling">Scheduling Trials</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Urgency</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-800 bg-[#0d0d0f] text-neutral-300 rounded-lg focus:outline-none focus:border-amber-500"
                >
                  <option value="low">Low - Routine</option>
                  <option value="medium">Medium - Important</option>
                  <option value="high">High - Immediate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Description</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detail the issue. (e.g. Laser start line sensor isn't emitting sync pulses)."
                className="w-full px-3 py-2 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500 font-sans text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase rounded-lg text-[10px] tracking-widest transition flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Forward Ticket</span>
            </button>
          </form>
        </div>

        {/* ACTIVE TICKET LOGS */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
              Active Support & Dispatch History
            </h3>
            <span className="text-[10px] font-mono text-neutral-500">
              {tickets.length} Logs Active
            </span>
          </div>

          <div className="space-y-4">
            {tickets.map((tkt) => (
              <div 
                key={tkt.id} 
                className="p-5 bg-neutral-950 border border-neutral-850 hover:border-neutral-800 rounded-xl space-y-3 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-neutral-500 block">
                      ID: {tkt.id} • {tkt.date}
                    </span>
                    <h4 className="text-xs font-bold text-white font-mono">
                      {tkt.subject}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase">
                    <span className={`px-2 py-0.5 rounded-full font-bold ${
                      tkt.urgency === 'high' 
                        ? 'bg-red-500/10 border border-red-500/20 text-red-400' 
                        : 'bg-neutral-800 border border-neutral-700 text-neutral-400'
                    }`}>
                      {tkt.urgency}
                    </span>
                    <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full font-bold">
                      {tkt.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  {tkt.message}
                </p>

                <div className="flex items-center justify-between border-t border-neutral-900 pt-3 flex-wrap gap-2 text-[10px] font-mono text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Category: {tkt.category}</span>
                  </span>

                  <button 
                    onClick={() => handleDelete(tkt.id)}
                    className="flex items-center gap-1 text-red-500/80 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel Ticket</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
