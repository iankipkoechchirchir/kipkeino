import React, { useState } from 'react';
import { Bell, ShieldAlert, FileText, CloudRain, Trash2, Check, CheckSquare } from 'lucide-react';

export default function CoachNotification() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      sender: 'Medical Clearance Desk',
      subject: 'Faith Kipyegon Biometric & ADAK clearance approved',
      body: 'Blood oxygen saturation parameters stable. Athlete cleared for high-performance workouts.',
      date: '2026-06-27 09:12',
      type: 'clearance',
      read: false
    },
    {
      id: 2,
      sender: 'Root Admin (Kipkoech)',
      subject: 'Track Lane 3 Scheduled Refacing works',
      body: 'Maintenance crew will block Lane 3 from 08:00 to 12:00 tomorrow to fix hurdle borders.',
      date: '2026-06-26 14:00',
      type: 'stadium',
      read: true
    },
    {
      id: 3,
      sender: 'Eldoret Weather Meteorological Station',
      subject: 'Afternoon Hailstorm Warning - High Altitude Campus',
      body: 'Expected thunder and severe hail between 14:00 and 16:30. Highly recommended to move speed reps indoors.',
      date: '2026-06-25 11:30',
      type: 'weather',
      read: true
    }
  ]);

  const markAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
  };

  const markRead = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="space-y-6 font-sans text-left" id="coach-notification-page">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-850 pb-4">
        <div>
          <h2 className="text-xl font-display font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" />
            <span>Coach Operations Alerts</span>
          </h2>
          <p className="text-xs text-neutral-400 font-mono">
            Direct notifications from the biological desk, weather systems, and the Root Administrator.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-[10px] font-mono text-amber-400 font-bold uppercase rounded-lg transition flex items-center gap-1 shrink-0"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {alerts.length === 0 ? (
        <div className="py-12 text-center space-y-2 bg-neutral-950 border border-neutral-850 rounded-2xl">
          <span className="text-neutral-500 text-xs font-mono block">Zero critical notifications in feed.</span>
          <span className="text-neutral-600 text-[10px] font-mono block">All biological rosters and facilities cleared.</span>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className={`p-5 bg-neutral-950 border rounded-xl space-y-3 transition relative overflow-hidden ${
                alert.read ? 'border-neutral-850 opacity-70' : 'border-amber-500/30 shadow-sm shadow-amber-500/5'
              }`}
            >
              {!alert.read && (
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
              )}

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-[9px]">
                    <span className="text-neutral-500">{alert.sender}</span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-neutral-500">{alert.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white font-mono">
                    {alert.subject}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  {!alert.read && (
                    <button 
                      onClick={() => markRead(alert.id)}
                      className="p-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded transition"
                      title="Mark Read"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteAlert(alert.id)}
                    className="p-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition"
                    title="Delete Notification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                {alert.body}
              </p>

              <div className="flex gap-2 font-mono text-[8px] uppercase">
                {alert.type === 'clearance' && (
                  <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded">
                    Biological Clearance Approved
                  </span>
                )}
                {alert.type === 'stadium' && (
                  <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded">
                    Track Management Update
                  </span>
                )}
                {alert.type === 'weather' && (
                  <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded">
                    Severe Meteorological Alert
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
