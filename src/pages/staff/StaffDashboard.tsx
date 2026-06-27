import React, { useState } from 'react';
import { LayoutDashboard, Users, Landmark, Fuel, Activity, Clock, CheckSquare } from 'lucide-react';

export default function StaffDashboard() {
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Verify Lane 4 Resurfacing adhesive temperature', status: 'pending', time: '09:00 AM' },
    { id: 't2', title: 'Measure barometric pressure at Eldoret weather monitor', status: 'completed', time: '07:30 AM' },
    { id: 't3', title: 'Refuel backup diesel generator tank in Block B', status: 'pending', time: '11:00 AM' },
    { id: 't4', title: 'Perform check-in validation for afternoon VIP lounge arrivals', status: 'pending', time: '14:30 PM' }
  ]);

  const [fuelLevel, setFuelLevel] = useState(85);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t));
  };

  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="space-y-6 font-sans text-left" id="staff-dashboard-page">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-850 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold uppercase italic text-white tracking-tight">
            Staff Operations Control Room
          </h2>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">
            Monitor daily task queues, track diesel generator reserve volumes, and audit facility check-ins
          </p>
        </div>
        <div className="flex gap-2 font-mono text-[10px] uppercase">
          <span className="px-2.5 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded font-bold">
            On Duty Shift: Morning (05:00 - 13:00)
          </span>
        </div>
      </div>

      {/* METRIC ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-neutral-950 border border-neutral-850 rounded-xl">
          <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider">My Task Progress</span>
          <span className="text-2xl font-display font-bold text-white block mt-1">{completedCount} / {tasks.length} Done</span>
          <span className="text-[10px] font-mono text-neutral-400 block mt-0.5">Daily operational quota</span>
        </div>

        <div className="p-5 bg-neutral-950 border border-neutral-850 rounded-xl">
          <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider">Generator Fuel level</span>
          <span className="text-2xl font-display font-bold text-white block mt-1">{fuelLevel}% Volume</span>
          <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">1,200 Litres (Stable)</span>
        </div>

        <div className="p-5 bg-neutral-950 border border-neutral-850 rounded-xl">
          <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider">Arena Lane Status</span>
          <span className="text-2xl font-display font-bold text-amber-500 block mt-1">Lane 4 Closed</span>
          <span className="text-[10px] font-mono text-neutral-400 block mt-0.5">Resurfacing cures on Fri</span>
        </div>

        <div className="p-5 bg-neutral-950 border border-neutral-850 rounded-xl">
          <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider">Active Staff Members</span>
          <span className="text-2xl font-display font-bold text-white block mt-1">14 Officers</span>
          <span className="text-[10px] font-mono text-neutral-400 block mt-0.5">All KDF & cleaners accounted</span>
        </div>
      </div>

      {/* DETAILED CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* TASK QUEUE LIST */}
        <div className="lg:col-span-8 bg-neutral-950 border border-neutral-850 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              My Operational Shifts Tasks
            </h3>
            <span className="text-[10px] font-mono text-neutral-500">Supervisor: Sarah Jemutai</span>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => {
              const isCompleted = task.status === 'completed';
              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3.5 border rounded-xl cursor-pointer transition flex items-center justify-between gap-4 ${
                    isCompleted 
                      ? 'bg-neutral-900/30 border-neutral-900 text-neutral-500' 
                      : 'bg-neutral-900/10 border-neutral-850 hover:border-neutral-700 text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                      isCompleted ? 'bg-amber-500 border-amber-500 text-black' : 'border-neutral-700'
                    }`}>
                      {isCompleted && <CheckSquare className="w-3.5 h-3.5 text-black stroke-[3]" />}
                    </div>
                    <span className={`text-xs font-mono ${isCompleted ? 'line-through' : ''}`}>
                      {task.title}
                    </span>
                  </div>

                  <span className="text-[9px] font-mono text-neutral-500 shrink-0 bg-neutral-950 border border-neutral-900 px-2 py-0.5 rounded-full">
                    {task.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* FUEL GAUGE & WEATHER QUICK CHECK */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Fuel className="w-4 h-4 text-amber-500" />
              <span>Standby Generator Fuel Monitor</span>
            </h3>

            <div className="space-y-3">
              <div className="w-full bg-neutral-900 h-6 rounded-lg overflow-hidden border border-neutral-800 p-0.5 relative flex items-center justify-center">
                <div 
                  className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 h-full rounded-md transition-all duration-300 absolute left-0.5" 
                  style={{ width: `calc(${fuelLevel}% - 4px)` }}
                />
                <span className="relative z-10 text-[10px] font-mono font-extrabold text-white">
                  {fuelLevel}% CAPACITY
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setFuelLevel(prev => Math.min(100, prev + 5))}
                  className="flex-1 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[9px] font-mono uppercase text-neutral-300 rounded transition"
                >
                  + Add 5% Fuel
                </button>
                <button
                  onClick={() => setFuelLevel(prev => Math.max(0, prev - 5))}
                  className="flex-1 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[9px] font-mono uppercase text-neutral-300 rounded transition"
                >
                  - Burn Fuel
                </button>
              </div>
            </div>
          </div>

          <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-5 space-y-3">
            <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider block">Environmental Index</span>
            <div className="space-y-1.5 text-xs text-neutral-300 font-mono">
              <div className="flex justify-between">
                <span>Wind Direction:</span>
                <span className="text-white">NE / Legal</span>
              </div>
              <div className="flex justify-between">
                <span>Humidity Rank:</span>
                <span className="text-white">42% (Normal)</span>
              </div>
              <div className="flex justify-between">
                <span>Air pressure:</span>
                <span className="text-amber-500">2,400m altitude scale</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
