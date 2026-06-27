import React, { useState } from 'react';
import { Bell, ShieldAlert, CloudRain, Trophy, Check, Trash2 } from 'lucide-react';

interface Notification {
  id: string;
  sender: string;
  title: string;
  body: string;
  date: string;
  level: 'critical' | 'warning' | 'success' | 'info';
  isRead: boolean;
}

export default function AthleteNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-1',
      sender: 'Coach Peter Rono',
      title: 'Interval Timing Readout',
      body: 'Faith, excellent pace on your third 1200m interval reps today. You hit 60.4s (0.6s faster than target)! Hydrate thoroughly, see you at physical check at 4 PM.',
      date: 'Today, 08:45 AM',
      level: 'success',
      isRead: false
    },
    {
      id: 'notif-2',
      sender: 'System Admin (Kipkoech)',
      title: 'ADAK Biometric Passport Warning',
      body: 'ADAK blood sampling scheduled for Monday. Please ensure your biological parameters and medical clearances are fully up-to-date inside the high-altitude hub directory.',
      date: 'Yesterday',
      level: 'warning',
      isRead: false
    },
    {
      id: 'notif-3',
      sender: 'Operations Team',
      title: 'Lane 4 Maintenance Shut-Down',
      body: 'Tartan lane 4 curve undergoes hot rubber granule curing. Avoid using lane 4 during training trials until Friday.',
      date: '2 days ago',
      level: 'critical',
      isRead: true
    }
  ]);

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6 font-sans text-left" id="athlete-notification-page">
      <div className="border-b border-[#1f1f24] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold uppercase italic text-white tracking-tight">
            Athlete Alerts & Notification Feed
          </h2>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">
            Track official direct instructions, biometric testing call-ups, and stadium lane maintenance alerts
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[10px] font-mono text-neutral-300 rounded transition uppercase font-bold"
          >
            Mark All as Read ({unreadCount})
          </button>
        )}
      </div>

      <div className="max-w-3xl space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-8 text-center text-neutral-500 font-mono text-xs">
            <Bell className="w-8 h-8 text-neutral-800 mx-auto mb-2" />
            <span>No notifications in your personal feed</span>
          </div>
        ) : (
          notifications.map((n) => (
            <div 
              key={n.id} 
              className={`p-4 border rounded-xl flex items-start gap-4 transition relative ${
                n.isRead 
                  ? 'bg-neutral-950/40 border-neutral-900 text-neutral-400' 
                  : 'bg-neutral-950 border-neutral-850'
              }`}
            >
              {/* LEVEL INDICATOR ACCENTS */}
              <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                n.level === 'critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                n.level === 'warning' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                n.level === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}>
                {n.level === 'critical' ? <ShieldAlert className="w-4 h-4 animate-bounce" /> : <Bell className="w-4 h-4" />}
              </div>

              {/* DETAILS */}
              <div className="flex-1 space-y-1 pr-8">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-extrabold">
                    From: {n.sender}
                  </span>
                  {!n.isRead && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                  )}
                </div>
                <h4 className={`text-sm font-bold font-display ${n.isRead ? 'text-neutral-300' : 'text-white'}`}>
                  {n.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">{n.body}</p>
                <span className="text-[9px] font-mono text-neutral-500 block pt-1">{n.date}</span>
              </div>

              {/* ACTION BUTTONS */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                {!n.isRead && (
                  <button
                    onClick={() => handleMarkRead(n.id)}
                    title="Mark Read"
                    className="p-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500 text-neutral-400 hover:text-amber-400 rounded transition"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(n.id)}
                  title="Delete Alert"
                  className="p-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500 text-neutral-400 hover:text-red-400 rounded transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
