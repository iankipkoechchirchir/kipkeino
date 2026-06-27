/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HistoricalMilestone, EventCategory } from '../types';
import { Trophy, Award, Heart, Medal, Sparkles, Flame } from 'lucide-react';

interface MilestoneTimelineProps {
  milestones: HistoricalMilestone[];
  isLoading: boolean;
}

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({ milestones, isLoading }) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>('All');
  const [focusedMilestone, setFocusedMilestone] = useState<number | null>(null);

  const filteredMilestones = milestones.filter(m => 
    selectedCategory === 'All' ? true : m.eventCategory === selectedCategory
  );

  const getCategoryIcon = (category: EventCategory) => {
    switch (category) {
      case 'Olympics':
        return <Trophy className="w-4 h-4 text-amber-500" aria-hidden="true" />;
      case 'World Record':
        return <Flame className="w-4 h-4 text-amber-500" aria-hidden="true" />;
      case 'Philanthropy':
        return <Heart className="w-4 h-4 text-rose-500" aria-hidden="true" />;
      default:
        return <Award className="w-4 h-4 text-amber-500" aria-hidden="true" />;
    }
  };

  const getCategoryColor = (category: EventCategory) => {
    switch (category) {
      case 'Olympics':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'World Record':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Philanthropy':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div className="w-full bg-[#0D0D0D] border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl" id="legacy-timeline-container" role="region" aria-label="Kipchoge Keino Historical Timeline">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-800 pb-6 mb-8">
        <div>
          <h2 className="text-2xl font-serif font-light text-white tracking-tight flex items-center gap-2">
            <Medal className="w-6 h-6 text-amber-500" aria-hidden="true" />
            Historical Milestone Archives
          </h2>
          <p className="text-xs text-neutral-500 mt-1 font-mono">
            Statically generated historical archives with 24h Incremental Static Regeneration (ISR).
          </p>
        </div>

        {/* Categories selector filter for keyboard accessibility */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter milestones by category">
          {(['All', 'Olympics', 'World Record', 'Philanthropy'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition duration-150 border uppercase tracking-widest font-mono ${
                selectedCategory === cat
                  ? 'bg-amber-500 border-amber-600 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
              }`}
              id={`filter-btn-${cat.toLowerCase().replace(' ', '-')}`}
              aria-pressed={selectedCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-neutral-400">
          <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-mono">Revalidating legacy static cache...</p>
        </div>
      ) : (
        <div className="relative border-l-2 border-neutral-900 ml-3 md:ml-32 space-y-12" id="milestones-timeline">
          {filteredMilestones.map((milestone, index) => (
            <div 
              key={index}
              tabIndex={0}
              onFocus={() => setFocusedMilestone(index)}
              onBlur={() => setFocusedMilestone(null)}
              className={`relative md:grid md:grid-cols-[120px_1fr] gap-8 transition-all duration-300 outline-none rounded-lg p-3 ${
                focusedMilestone === index ? 'bg-neutral-900/30 ring-2 ring-amber-500/40' : 'hover:bg-neutral-900/10'
              }`}
              id={`milestone-item-${milestone.year}`}
              aria-label={`Milestone in ${milestone.year}: ${milestone.title}`}
            >
              {/* Year display - left panel for larger screens, absolute for mobile */}
              <div className="hidden md:flex flex-col items-end pt-1 pr-6 text-right select-none">
                <span className="text-3xl font-light text-white font-serif tracking-tight leading-none">
                  {milestone.year}
                </span>
                <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mt-1 font-mono">
                  {milestone.eventCategory}
                </span>
              </div>

              {/* Timeline marker node dot */}
              <div className="absolute -left-[11px] md:-left-[11px] top-6 w-5 h-5 rounded-full border-4 border-neutral-950 bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20 transition duration-150">
                <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              </div>

              {/* Body Card */}
              <div className="bg-neutral-950 rounded-xl border border-neutral-800 p-5 md:p-6 shadow-xl relative overflow-hidden flex flex-col lg:flex-row gap-6 hover:border-neutral-700 transition duration-200">
                <div className="flex-1">
                  {/* Category Pill and Year for mobile */}
                  <div className="flex items-center gap-2 mb-2 md:hidden">
                    <span className="text-lg font-black text-white font-mono">
                      {milestone.year}
                    </span>
                    <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[9px] font-bold border ${getCategoryColor(milestone.eventCategory)}`}>
                      {getCategoryIcon(milestone.eventCategory)}
                      {milestone.eventCategory}
                    </span>
                  </div>

                  {/* Category Pill for desktop */}
                  <div className="hidden md:flex items-center gap-1.5 mb-3">
                    <span className={`inline-flex items-center gap-1.5 rounded px-2.5 py-0.5 text-[10px] font-semibold border tracking-wider uppercase ${getCategoryColor(milestone.eventCategory)}`}>
                      {getCategoryIcon(milestone.eventCategory)}
                      {milestone.eventCategory}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-semibold text-white tracking-tight">
                    {milestone.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mt-3 font-sans">
                    {milestone.description}
                  </p>
                </div>

                {/* Legacy Photographic Asset Container - Explicit aspect ratio to prevent layouts shifts (CLS targets) */}
                <div className="w-full lg:w-[200px] shrink-0">
                  <div className="relative aspect-[3/2] lg:aspect-[3/2] w-full bg-neutral-900 rounded border border-neutral-800 overflow-hidden select-none shadow-md">
                    <img 
                      src={milestone.media} 
                      alt={`Historical visual document representing ${milestone.title}`}
                      className="object-cover w-full h-full grayscale opacity-55 transition duration-300 hover:grayscale-0 hover:opacity-100"
                      loading="lazy"
                      width={600}
                      height={400}
                      referrerPolicy="no-referrer"
                      id={`milestone-media-${milestone.year}`}
                    />
                    <div className="absolute top-2 right-2 p-1 rounded-full bg-black/70 border border-neutral-800 backdrop-blur-sm">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                    </div>
                  </div>
                  <span className="block text-[9px] text-neutral-500 mt-1 text-right font-mono italic">
                    Legacy Photo Archives • Eldoret Heritage Board
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 pt-4 border-t border-neutral-800 flex justify-between items-center text-[10px] text-neutral-500 font-mono">
        <span>© Kipchoge Keino Foundation</span>
        <span className="text-amber-500/75 animate-pulse flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          Continuous Live Archives Online
        </span>
      </div>
    </div>
  );
};
