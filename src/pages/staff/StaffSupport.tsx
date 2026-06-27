import React, { useState } from 'react';
import { HelpCircle, Send, Check, AlertTriangle, Plus } from 'lucide-react';

interface StaffTicket {
  id: string;
  department: string;
  subject: string;
  body: string;
  date: string;
  status: 'pending' | 'cleared';
}

export default function StaffSupport() {
  const [tickets, setTickets] = useState<StaffTicket[]>([
    {
      id: 'st-51',
      department: 'Maintenance / Groundkeeping',
      subject: 'Lane 4 rubber curing compound shortfall',
      body: 'The Sinohydro delivery was short 2 bags of specialized fast-dry Tartan granules. I need emergency procurement clearance to purchase locally in Eldoret town.',
      date: 'Today, 06:45 AM',
      status: 'pending'
    },
    {
      id: 'st-50',
      department: 'Finance & Supply Chain',
      subject: 'Procurement cleared for VIP food supplies',
      body: 'Standard catering supplies invoice KES 142,000 has been verified. Waiting for Chief Administrator final payout.',
      date: 'Yesterday',
      status: 'cleared'
    }
  ]);

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [dept, setDept] = useState('Groundkeeping');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return;

    const newTicket: StaffTicket = {
      id: 'st-' + Math.floor(10 + Math.random() * 90),
      department: dept,
      subject,
      body,
      date: 'Just now',
      status: 'pending'
    };

    setTickets([newTicket, ...tickets]);
    setSubject('');
    setBody('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans text-left" id="staff-support-page">
      <div className="border-b border-[#1f1f24] pb-4">
        <h2 className="text-2xl font-display font-bold uppercase italic text-white tracking-tight">
          Staff Operational Support Portal
        </h2>
        <p className="text-xs text-neutral-500 font-mono mt-0.5">
          Submit capital requisitions, groundkeeper equipment purchase alerts, and contact the chief administrator
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SUBMIT NEW QUERY CARD */}
        <div className="lg:col-span-5">
          <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-6 space-y-5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-500" />
              <span>Submit Staff Requisition / Query</span>
            </h3>

            {isSubmitted && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-mono text-center">
                ✓ Requisition forwarded directly to Root Admin.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs text-left">
              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Department</label>
                <select
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="w-full px-3 py-2.5 border border-neutral-800 bg-[#0d0d0f] text-neutral-300 rounded-lg focus:outline-none focus:border-amber-500"
                >
                  <option value="Groundkeeping">Groundkeeping & Maintenance</option>
                  <option value="Event Coordination">Event Coordination</option>
                  <option value="Finance Operations">Finance Operations</option>
                  <option value="Security Forces">KDF Security Patrols</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Subject Summary</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Tartan fast-dry adhesive purchase"
                  className="w-full px-3.5 py-2.5 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Detailed Request Body</label>
                <textarea
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Explain exactly why procurement or board feedback is urgent, with KES values..."
                  className="w-full h-24 px-3.5 py-2.5 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase rounded-lg text-xs tracking-widest transition flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Submit Requisition</span>
              </button>
            </form>
          </div>
        </div>

        {/* REQUISITION DECK */}
        <div className="lg:col-span-7">
          <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Operational Requisitions Log</span>
            </h3>

            <div className="space-y-3">
              {tickets.map((t) => (
                <div key={t.id} className="p-4 bg-neutral-900/40 border border-neutral-850 rounded-xl space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-mono uppercase bg-neutral-900 text-amber-500 px-2 py-0.5 rounded border border-neutral-800">
                      {t.department}
                    </span>
                    <span className={`px-2 py-0.5 text-[8px] font-mono uppercase rounded ${
                      t.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {t.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white font-display">{t.subject}</h4>
                    <span className="text-[9px] font-mono text-neutral-500 block mt-0.5">ID: {t.id} • {t.date}</span>
                  </div>

                  <p className="text-xs text-neutral-400 font-sans leading-relaxed pt-1.5 border-t border-neutral-900">
                    {t.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
