import React, { useState } from 'react';
import { Mail, Send, User, MessageSquare, Check, Filter } from 'lucide-react';

interface SupportMessage {
  id: string;
  senderName: string;
  senderRole: string;
  subject: string;
  body: string;
  date: string;
  status: 'unread' | 'replied' | 'resolved';
  messages: { sender: string; text: string; time: string }[];
}

export default function AdminMessage() {
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: 't-101',
      senderName: 'Faith Kipyegon',
      senderRole: 'Athlete',
      subject: 'Lane 4 Tartan unevenness near 200m mark',
      body: 'Hello admin team, during my high-altitude stride test today on Kip Keino Lane 4, I felt a minor dip around the 200m curve. Could the KDF maintenance crew inspect this before the trial meet?',
      date: 'Today, 06:12 AM',
      status: 'unread',
      messages: [
        { sender: 'Faith Kipyegon', text: 'During my high-altitude stride test today on Kip Keino Lane 4, I felt a minor dip around the 200m curve. Could the KDF maintenance crew inspect this before the trial meet?', time: '06:12 AM' }
      ]
    },
    {
      id: 't-102',
      senderName: 'Julius Keter',
      senderRole: 'Staff Groundkeeper',
      subject: 'Fuel canister replenishment approval',
      body: 'I have logged a request for KES 14,500 fuel procurement for the standby diesel generator. Waiting for administrative clearance to finalize the purchase.',
      date: 'Yesterday',
      status: 'replied',
      messages: [
        { sender: 'Julius Keter', text: 'I have logged a request for KES 14,500 fuel procurement for the standby diesel generator. Waiting for administrative clearance to finalize the purchase.', time: 'Yesterday 14:30' },
        { sender: 'System Admin', text: 'Request noted. We are checking the monthly operations budget first.', time: 'Yesterday 16:15' }
      ]
    },
    {
      id: 't-103',
      senderName: 'Peter Rono',
      senderRole: 'Academy Coach',
      subject: 'ADAK Random Testing Roster Updates',
      body: 'The anti-doping association representatives will arrive on Monday for unannounced testing. Please ensure all athletic biological files are validated in the MySQL database.',
      date: '2 days ago',
      status: 'resolved',
      messages: [
        { sender: 'Peter Rono', text: 'The anti-doping association representatives will arrive on Monday for unannounced testing. Please ensure all athletic biological files are validated in the MySQL database.', time: '2 days ago' }
      ]
    }
  ]);

  const [selectedId, setSelectedId] = useState<string>('t-101');
  const [replyText, setReplyText] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'replied'>('all');

  const activeMsg = messages.find(m => m.id === selectedId);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedId) return;

    setMessages(prev => prev.map(m => {
      if (m.id === selectedId) {
        return {
          ...m,
          status: 'replied',
          messages: [
            ...m.messages,
            { sender: 'System Admin', text: replyText, time: 'Just now' }
          ]
        };
      }
      return m;
    }));
    setReplyText('');
  };

  const handleMarkResolved = (id: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, status: 'resolved' };
      }
      return m;
    }));
  };

  const filteredMessages = messages.filter(m => {
    if (filter === 'unread') return m.status === 'unread';
    if (filter === 'replied') return m.status === 'replied';
    return true;
  });

  return (
    <div className="space-y-6 font-sans" id="admin-message-page">
      <div className="border-b border-neutral-850 pb-4">
        <h2 className="text-2xl font-display font-bold uppercase italic text-white tracking-tight">
          Executive Admin Mail & Ticket Inbox
        </h2>
        <p className="text-xs text-neutral-500 font-mono mt-0.5">
          Process athlete incident reports, KDF groundkeeper permits, and athletic council queries
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: TICKET DIRECTORY LIST */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Filters Row */}
          <div className="flex items-center justify-between bg-neutral-950 p-2.5 border border-neutral-850 rounded-lg">
            <span className="text-[10px] font-mono font-bold uppercase text-neutral-500 flex items-center gap-1">
              <Filter className="w-3 h-3 text-amber-500" />
              <span>Filter Tickets</span>
            </span>
            <div className="flex gap-1">
              {(['all', 'unread', 'replied'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2 py-1 text-[9px] font-mono uppercase rounded transition ${
                    filter === f ? 'bg-amber-500 text-black font-bold' : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
            {filteredMessages.map((m) => {
              const isSelected = m.id === selectedId;
              return (
                <div
                  key={m.id}
                  onClick={() => {
                    setSelectedId(m.id);
                    // Mark as read automatically when selected if unread
                    if (m.status === 'unread') {
                      setMessages(prev => prev.map(item => item.id === m.id ? { ...item, status: 'replied' } : item));
                    }
                  }}
                  className={`p-4 border rounded-xl cursor-pointer transition text-left relative ${
                    isSelected 
                      ? 'bg-amber-500/10 border-amber-500/60' 
                      : 'bg-neutral-950 border-neutral-850 hover:bg-neutral-900/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white font-display">{m.senderName}</span>
                      <span className="text-[8px] font-mono uppercase px-1.5 py-0.2 bg-neutral-900 text-neutral-400 border border-neutral-800 rounded">
                        {m.senderRole}
                      </span>
                    </div>
                    <span className="text-[8px] font-mono text-neutral-500">{m.date}</span>
                  </div>

                  <h4 className="text-xs font-semibold text-neutral-200 line-clamp-1 mb-1">{m.subject}</h4>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">{m.body}</p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-[9px] font-mono text-neutral-500">ID: {m.id}</span>
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                      m.status === 'unread' ? 'bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse' :
                      m.status === 'replied' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE CHAT SHELTER */}
        <div className="lg:col-span-7">
          {activeMsg ? (
            <div className="bg-neutral-950 border border-neutral-850 rounded-2xl flex flex-col h-[530px] overflow-hidden">
              
              {/* Active Ticket Header */}
              <div className="p-4 border-b border-neutral-850 bg-neutral-900/20 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">{activeMsg.subject}</h3>
                  <p className="text-[10px] text-neutral-500 font-mono">
                    Thread with <strong className="text-neutral-300">{activeMsg.senderName}</strong> • {activeMsg.senderRole}
                  </p>
                </div>
                {activeMsg.status !== 'resolved' && (
                  <button
                    onClick={() => handleMarkResolved(activeMsg.id)}
                    className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-[9px] uppercase font-bold rounded transition flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Resolve</span>
                  </button>
                )}
              </div>

              {/* Chat Transcript Area */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#09090b]">
                {activeMsg.messages.map((item, idx) => {
                  const isAdmin = item.sender === 'System Admin';
                  return (
                    <div key={idx} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-xl p-3.5 ${
                        isAdmin 
                          ? 'bg-amber-500 text-black rounded-tr-none' 
                          : 'bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-tl-none'
                      }`}>
                        <div className="flex justify-between items-baseline gap-4 mb-1">
                          <span className="text-[9px] font-mono uppercase font-extrabold opacity-70">
                            {item.sender}
                          </span>
                          <span className="text-[8px] font-mono opacity-50">{item.time}</span>
                        </div>
                        <p className="text-xs leading-relaxed font-sans">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input form */}
              <div className="p-4 border-t border-neutral-850 bg-neutral-950">
                {activeMsg.status === 'resolved' ? (
                  <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center text-xs font-mono text-emerald-400">
                    ✓ This ticket thread has been closed as resolved.
                  </div>
                ) : (
                  <form onSubmit={handleSendReply} className="flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type official administrative reply..."
                      className="flex-1 px-3.5 py-2 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg text-xs font-mono focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-4 bg-amber-500 hover:bg-amber-400 text-black rounded-lg transition flex items-center justify-center shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-neutral-950 border border-neutral-850 rounded-2xl h-[530px] flex flex-col items-center justify-center text-neutral-500 font-mono text-xs">
              <Mail className="w-10 h-10 stroke-[1.5] text-neutral-700 mb-2 animate-bounce" />
              <span>Select a message thread from the ticket deck</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
