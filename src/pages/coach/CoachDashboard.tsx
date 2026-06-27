import React, { useState } from 'react';
import { Trophy, Activity, Heart, Calendar, CheckCircle, Flame, Star, Watch, Users, ArrowUpRight } from 'lucide-react';

interface CoachDashboardProps {
  coachName?: string;
}

export default function CoachDashboard({ 
  coachName = "Paul Ereng" 
}: CoachDashboardProps) {
  
  const [activeAthletes, setActiveAthletes] = useState([
    { id: 1, name: 'Faith Kipyegon', discipline: '1500m Gold Elite', status: 'In Training', pr: '3:49.04' },
    { id: 2, name: 'Ezekiel Kemboi', discipline: '3000m Steeplechase', status: 'Recovery', pr: '7:55.88' },
    { id: 3, name: 'Eliud Kipchoge', discipline: 'Marathon Elite', status: 'Active Run', pr: '2:01:09' }
  ]);

  const coachKpis = [
    { label: 'Assigned Athletes', value: '12 Runners', desc: 'Active high-altitude academy', icon: <Users className="w-4 h-4 text-amber-500" /> },
    { label: 'Weekly Training Blocks', value: '8 Session Plans', desc: 'Speed & VO2 Max focus', icon: <Flame className="w-4 h-4 text-orange-500" /> },
    { label: 'ADAK Compliance Flag', value: '100% Cleared', desc: 'Biological Passports Verified', icon: <CheckCircle className="w-4 h-4 text-emerald-400" /> },
    { label: 'Next Elite Trials', value: 'July 15', desc: 'National Trials Countdown', icon: <Calendar className="w-4 h-4 text-red-500" /> }
  ];

  const regimenPlans = [
    { id: 'rep-1', title: 'Speed Endurance Aerobic Blocks', athlete: '1500m Squad', time: '05:30 AM', desc: '4x 1200m at Kip Keino track. Target pace: 61s/lap. Recovery: 3 min jog.' },
    { id: 'rep-2', title: 'Lactate Threshold Sprint Reps', athlete: 'Steeplechase Squad', time: '10:00 AM', desc: '3x 800m fast intervals. Focus on high-altitude recovery techniques.' },
    { id: 'rep-3', title: 'Altitude Long Steady Run (AER)', athlete: 'Marathon Squad', time: '15:30 PM', desc: '25km aerobic baseline pacing run. Hydration & lactic assessment at KM 15.' }
  ];

  return (
    <div className="space-y-6 font-sans text-left" id="coach-dashboard-page">
      
      {/* HEADER SECTION WITH HERO ATMOSPHERE */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-950/20 via-orange-950/20 to-neutral-950 border border-neutral-850 rounded-2xl p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-64 h-full bg-amber-500/5 blur-[50px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Elite Coaching Staff</span>
            </span>
            <h2 className="text-3xl font-display font-extrabold text-white uppercase italic tracking-tight">
              Welcome back, Coach {coachName}!
            </h2>
            <p className="text-xs text-neutral-400 font-mono">
              Academy Track Operations • High-Altitude Campus, Eldoret
            </p>
          </div>

          <div className="flex gap-2 font-mono text-[10px] uppercase">
            <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full font-bold">
              Rank: Head Coach
            </span>
            <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full font-bold">
              Hub: Active
            </span>
          </div>
        </div>
      </div>

      {/* COACH PERFORMANCE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {coachKpis.map((kpi, idx) => (
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
        
        {/* ASSIGNED TRAINING REGIMENS */}
        <div className="lg:col-span-8 bg-neutral-950 border border-neutral-850 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Coaching Training Plans & Schedules
              </h3>
              <p className="text-[10px] text-neutral-500 font-mono">Assigned training regimens for high-altitude blocks</p>
            </div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase">Today's Sessions</span>
          </div>

          <div className="space-y-4">
            {regimenPlans.map((reg) => (
              <div 
                key={reg.id} 
                className="p-4 bg-neutral-900/40 border border-neutral-850 hover:border-neutral-700 rounded-xl flex items-start gap-4 transition"
              >
                <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-amber-500 mt-1 shrink-0">
                  <Activity className="w-5 h-5" />
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-display text-white">
                        {reg.title}
                      </span>
                      <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.2 rounded">
                        {reg.athlete}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-neutral-500 bg-neutral-900 border border-neutral-800 px-1.5 py-0.2 rounded-full">
                      {reg.time}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    {reg.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVE ROSTER QUICK AUDIT */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Elite Athlete Quick Roster</span>
            </h3>

            <div className="space-y-3">
              {activeAthletes.map((runner) => (
                <div key={runner.id} className="p-3 bg-neutral-900/30 border border-neutral-850 rounded-xl flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="block text-white font-bold">{runner.name}</span>
                    <span className="block text-[10px] text-neutral-500">{runner.discipline}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-amber-500 block font-bold">PB: {runner.pr}</span>
                    <span className="text-[8px] uppercase tracking-wider text-neutral-400 font-bold bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded">
                      {runner.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BAROMETRIC GUIDELINE */}
          <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-5 space-y-3 font-mono text-[11px] leading-relaxed">
            <h4 className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider font-bold">Barometric Air Density</h4>
            <p className="text-neutral-400">
              Training altitude <strong className="text-white">2,400m</strong>. Oxygen density is <strong className="text-white">~76%</strong> of sea level. Adjust aerobic sprints intervals by adding <strong className="text-white">10-15s</strong> recovery between reps.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
