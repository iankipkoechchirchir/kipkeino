import React, { useState } from 'react';
import { HelpCircle, Send, ShieldAlert, Heart, Calendar, Clock, Plus, Check } from 'lucide-react';

interface Ticket {
  id: string;
  category: string;
  subject: string;
  status: 'Open' | 'Resolved' | 'Escalated';
  date: string;
  description: string;
}

export default function AthleteSupport() {
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 't-901', category: 'Medical & Physio', subject: 'Lactic acid retention check on right Achilles', status: 'Open', date: 'Today, 08:30 AM', description: 'After running the high-altitude stamina intervals, I felt a slight tightness in my right Achilles. Requesting a short physical check with the on-duty physiotherapist.' },
    { id: 't-902', category: 'Infrastructure', subject: 'Locker lock replacement in Block C', status: 'Resolved', date: 'Yesterday', description: 'The mechanical dial lock on locker 42 is rusted and will not latch securely. Solved by caretaker Sarah.' }
  ]);

  const [category, setCategory] = useState('Medical & Physio');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    const newTicket: Ticket = {
      id: 't-' + Math.floor(100 + Math.random() * 900),
      category,
      subject,
      status: 'Open',
      date: 'Just now',
      description
    };

    setTickets([newTicket, ...tickets]);
    setSubject('');
    setDescription('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans" id="athlete-support-page">
      <div className="border-b border-[#1f1f24] pb-4">
        <h2 className="text-2xl font-display font-bold uppercase italic text-white tracking-tight">
          Athlete Support Center
        </h2>
        <p className="text-xs text-neutral-500 font-mono mt-0.5">
          Report training injuries, locker room issues, or file equipment replacement requests
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LOG NEW SUPPORT TICKET */}
        <div className="lg:col-span-5">
          <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-6 space-y-5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-500" />
              <span>Log New Incident / Ticket</span>
            </h3>

            {isSubmitted && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-mono text-center">
                ✓ Ticket submitted successfully to the staff roster.
              </div>
            )}

            <form onSubmit={handleSubmitTicket} className="space-y-4 font-mono text-xs text-left">
              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Incident Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 border border-neutral-800 bg-[#0d0d0f] text-neutral-300 rounded-lg focus:outline-none focus:border-amber-500"
                >
                  <option value="Medical & Physio">Medical & Physio Advice</option>
                  <option value="Infrastructure">Infrastructure & Locker Damage</option>
                  <option value="Anti-Doping ADAK">ADAK Biological Query</option>
                  <option value="Gear Allocation">Gear & Uniform Deficiencies</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Summary Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Tightness on right Achilles"
                  className="w-full px-3.5 py-2.5 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Full Incident Details</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your pain level, specific stadium zone, or locker number precisely..."
                  className="w-full h-24 px-3.5 py-2.5 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase rounded-lg text-xs tracking-widest transition flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Submit Support Incident</span>
              </button>
            </form>
          </div>
        </div>

        {/* INCIDENT DECK & HISTORY */}
        <div className="lg:col-span-7">
          <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-5 space-y-4 text-left">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Active Incident Board</span>
            </h3>

            <div className="space-y-3">
              {tickets.map((t) => (
                <div key={t.id} className="p-4 bg-neutral-900/40 border border-neutral-850 rounded-xl space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase bg-neutral-900 text-amber-400 border border-neutral-800 px-2 py-0.5 rounded">
                        {t.category}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">ID: {t.id}</span>
                    </div>
                    <span className={`px-2 py-0.5 text-[8px] font-mono uppercase rounded ${
                      t.status === 'Open' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      t.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}>
                      {t.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white font-display">{t.subject}</h4>
                    <span className="text-[9px] font-mono text-neutral-500 block mt-0.5">{t.date}</span>
                  </div>

                  <p className="text-xs text-neutral-400 font-sans leading-relaxed pt-1 border-t border-neutral-900">
                    {t.description}
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
