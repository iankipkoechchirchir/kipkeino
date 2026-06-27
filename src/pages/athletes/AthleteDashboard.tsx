import React, { useState } from 'react';
import { Trophy, Activity, Heart, Calendar, CheckCircle, Flame, Star, Watch } from 'lucide-react';

interface AthleteDashboardProps {
  athleteName?: string;
  discipline?: string;
}

export default function AthleteDashboard({ 
  athleteName = "Faith Kipyegon", 
  discipline = "1500m Gold Elite" 
}: AthleteDashboardProps) {
  
  const [completedDrills, setCompletedDrills] = useState<string[]>(['drill-1']);

  const performanceKpis = [
    { label: 'Personal Best Mark', value: '3:49.04', desc: 'World Record Standard', icon: <Trophy className="w-4 h-4 text-amber-500" /> },
    { label: 'Altitude Stamina Index', value: 'VO2 Max 82', desc: 'Gold Category', icon: <Heart className="w-4 h-4 text-red-500" /> },
    { label: 'Completed Drills', value: `${completedDrills.length}/3`, desc: 'Today\'s high-altitude blocks', icon: <Flame className="w-4 h-4 text-orange-500" /> },
    { label: 'Compliance Status', value: 'ADAK Cleared', desc: 'ADAK Bio Passport Ok', icon: <CheckCircle className="w-4 h-4 text-emerald-400" /> }
  ];

  const todayWorkouts = [
    { id: 'drill-1', title: 'VO2 Max Aerobic Stride Intervals', time: '05:30 AM', desc: '4x 1200m at Kip Keino high-altitude track (Target Pace: 61s/lap).' },
    { id: 'drill-2', title: 'Shed-Interval Lactate Speed Test', time: '10:00 AM', desc: '3x 800m sprint block with Coach Peter Rono. Focus on rapid pacing change.' },
    { id: 'drill-3', title: 'High-Altitude Recovery Stretches', time: '16:00 PM', desc: 'Standard physiotherapist evaluation, lactic acid cool down, and hydration checks.' }
  ];

  const toggleDrill = (id: string) => {
    setCompletedDrills(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 font-sans" id="athlete-dashboard-page">
      
      {/* HEADER SECTION WITH HERO ATMOSPHERE */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-950/20 via-orange-950/20 to-neutral-950 border border-neutral-850 rounded-2xl p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-64 h-full bg-amber-500/5 blur-[50px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Elite Athlete Profile</span>
            </span>
            <h2 className="text-3xl font-display font-extrabold text-white uppercase italic tracking-tight">
              Welcome back, {athleteName}!
            </h2>
            <p className="text-xs text-neutral-400 font-mono">
              Academic Discipline: <span className="text-amber-500 font-bold">{discipline}</span> • High-Altitude Campus, Eldoret
            </p>
          </div>

          <div className="flex gap-2 font-mono text-[10px] uppercase">
            <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full font-bold">
              Rank: World #1
            </span>
            <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full font-bold">
              Status: Active
            </span>
          </div>
        </div>
      </div>

      {/* ATHLETE PERFORMANCE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceKpis.map((kpi, idx) => (
          <div key={idx} className="p-5 bg-neutral-950 border border-neutral-850 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">{kpi.label}</span>
              {kpi.icon}
            </div>
            <div>
              <span className="text-2xl font-display font-bold text-white block">{kpi.value}</span>
              <span className="text-[10px] font-mono text-neutral-400 block mt-0.5">{kpi.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* TODAY'S HIGH-ALTITUDE TRACK WORKOUTS */}
        <div className="lg:col-span-8 bg-neutral-950 border border-neutral-850 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Today's Training Schedule
              </h3>
              <p className="text-[10px] text-neutral-500 font-mono">Select checkboxes as you finish interval reps</p>
            </div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase">Coach: Peter Rono</span>
          </div>

          <div className="space-y-4">
            {todayWorkouts.map((workout) => {
              const isDone = completedDrills.includes(workout.id);
              return (
                <div 
                  key={workout.id} 
                  onClick={() => toggleDrill(workout.id)}
                  className={`p-4 border rounded-xl cursor-pointer transition flex items-start gap-4 text-left ${
                    isDone 
                      ? 'bg-emerald-500/5 border-emerald-500/30 text-neutral-400' 
                      : 'bg-neutral-900/40 border-neutral-850 hover:border-neutral-700'
                  }`}
                >
                  <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition ${
                    isDone ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-neutral-700 bg-[#0d0d0f]'
                  }`}>
                    {isDone && <CheckCircle className="w-4 h-4 text-black stroke-[3]" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold font-display ${isDone ? 'line-through text-neutral-500' : 'text-white'}`}>
                        {workout.title}
                      </span>
                      <span className="text-[9px] font-mono text-neutral-500 bg-neutral-900 border border-neutral-800 px-1.5 py-0.2 rounded-full">
                        {workout.time}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                      {workout.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MEDICAL & TIMING STATUS COLUMN */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* ALTITUDE TIMING ADVICE */}
          <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Watch className="w-4 h-4 text-amber-500" />
              <span>Altitude Timing Guideline</span>
            </h3>

            <div className="space-y-3 font-mono text-[11px] leading-relaxed">
              <p className="text-neutral-400">
                Eldoret sits at <strong className="text-white">2,400m altitude</strong>. Due to reduced atmospheric resistance:
              </p>
              <ul className="space-y-2 text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                  <span>Expect sprint times to improve by <strong className="text-white">~0.12s per 100m</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                  <span>Long endurance paces should yield a <strong className="text-white">5% elevation penalty</strong>.</span>
                </li>
              </ul>
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-[10px] text-neutral-500">
                *Guidelines aligned with IAAF sports aerodynamics science.
              </div>
            </div>
          </div>

          {/* MY PROGRESS GRAPH MINI CARD */}
          <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-5 space-y-3">
            <h4 className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider font-bold">Historical VO2 Max Climb</h4>
            <div className="flex items-end justify-between h-14 pt-2">
              <div className="w-5 bg-neutral-900 h-[40%] rounded-t" title="March: 74" />
              <div className="w-5 bg-neutral-900 h-[55%] rounded-t" title="April: 76" />
              <div className="w-5 bg-neutral-800 h-[70%] rounded-t" title="May: 78" />
              <div className="w-5 bg-amber-500 h-[95%] rounded-t" title="June (Now): 82" />
            </div>
            <div className="flex justify-between text-[8px] font-mono text-neutral-500">
              <span>March</span>
              <span>April</span>
              <span>May</span>
              <span className="text-amber-500 font-bold">June (Now)</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
