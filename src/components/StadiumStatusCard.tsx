/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StadiumProject } from '../types';
import { Hammer, Calendar, HardHat, ShieldCheck, ListChecks, Image as ImageIcon, Sparkles, RefreshCw } from 'lucide-react';

interface StadiumStatusCardProps {
  data: StadiumProject;
  isLoading: boolean;
  onRefresh: () => void;
}

export const StadiumStatusCard: React.FC<StadiumStatusCardProps> = ({ data, isLoading, onRefresh }) => {
  const [activeTab, setActiveTab] = useState<'updates' | 'gallery'>('updates');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-neutral-800 bg-[#0D0D0D] p-6 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-amber-500/30" id="stadium-project-card">
      {/* Decorative track lane lines underlay */}
      <div className="absolute right-0 top-0 bottom-0 w-24 opacity-5 pointer-events-none flex gap-1.5">
        <div className="w-2 bg-amber-500 h-full"></div>
        <div className="w-2 bg-amber-500 h-full"></div>
        <div className="w-2 bg-amber-500 h-full"></div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-serif font-light text-white tracking-tight">{data.facilityName}</h3>
            <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-500 uppercase tracking-widest ring-1 ring-inset ring-amber-500/20 font-mono">
              AFCON 2027
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5 font-mono">Eldoret Upgrade Project • Global Class Athletics Hub</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onRefresh}
            disabled={isLoading}
            className="p-1.5 rounded border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-700 transition duration-150 disabled:opacity-50"
            title="Force bypass static cache & fetch SSR data"
            id="refresh-stadium-btn"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20 font-mono">
            On Track for Delivery
          </span>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm font-medium mb-2">
          <span className="text-neutral-300 flex items-center gap-1.5 font-sans">
            <HardHat className="w-4 h-4 text-amber-500" />
            Infrastructure Progress
          </span>
          <span className="text-white font-mono bg-neutral-900 px-2 py-0.5 rounded text-xs border border-neutral-800">
            {data.completionPercentage}% Complete
          </span>
        </div>
        <div className="w-full bg-neutral-900 rounded-full h-3 border border-neutral-800 p-0.5">
          <div 
            className="bg-gradient-to-r from-amber-600 to-amber-400 h-2 rounded-full transition-all duration-700 ease-out" 
            style={{ width: `${data.completionPercentage}%` }}
          />
        </div>
        <p className="text-[11px] text-neutral-500 mt-1.5 italic font-mono">
          *Real-time operational stream. Refreshes dynamically to bypass Edge CDNs.
        </p>
      </div>

      <dl className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-neutral-800 pt-4 text-xs font-mono">
        <div className="bg-neutral-950 p-3 rounded border border-neutral-850">
          <dt className="text-neutral-500 font-medium flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
            Target Handover
          </dt>
          <dd className="mt-1 text-sm font-bold text-neutral-200">{data.targetHandover}</dd>
        </div>
        <div className="bg-neutral-950 p-3 rounded border border-neutral-850">
          <dt className="text-neutral-500 font-medium flex items-center gap-1">
            <Hammer className="w-3.5 h-3.5 text-amber-500" />
            Prime Contractor
          </dt>
          <dd className="mt-1 text-sm font-bold text-neutral-200">{data.contractor}</dd>
        </div>
        <div className="bg-neutral-950 p-3 rounded border border-neutral-850">
          <dt className="text-neutral-500 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            Supervising Body
          </dt>
          <dd className="mt-1 text-sm font-bold text-neutral-200">{data.supervisingBody}</dd>
        </div>
      </dl>

      {/* Tabs section for dynamic CMS information */}
      <div className="mt-6 border-t border-neutral-800 pt-4">
        <div className="flex border-b border-neutral-800 mb-4 gap-2 font-mono">
          <button
            onClick={() => setActiveTab('updates')}
            className={`pb-2 px-2 text-xs font-semibold flex items-center gap-1.5 transition duration-150 ${activeTab === 'updates' ? 'border-b-2 border-amber-500 text-amber-500' : 'text-neutral-400 hover:text-neutral-200'}`}
            id="tab-stadium-updates"
          >
            <ListChecks className="w-3.5 h-3.5" />
            Latest Updates Log
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`pb-2 px-2 text-xs font-semibold flex items-center gap-1.5 transition duration-150 ${activeTab === 'gallery' ? 'border-b-2 border-amber-500 text-amber-500' : 'text-neutral-400 hover:text-neutral-200'}`}
            id="tab-stadium-gallery"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Project Site Gallery
          </button>
        </div>

        {activeTab === 'updates' ? (
          <ul className="space-y-3" id="stadium-updates-list">
            {data.latestUpdates.map((update, index) => (
              <li key={index} className="flex gap-2.5 text-xs text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{update}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3" id="stadium-gallery-grid">
              {data.gallery.map((imgUrl, index) => (
                <div 
                  key={index} 
                  onClick={() => setSelectedImage(imgUrl)}
                  className="group relative cursor-pointer overflow-hidden rounded border border-neutral-800 bg-neutral-900 aspect-video transition duration-200 hover:border-amber-500/50"
                  id={`gallery-img-container-${index}`}
                >
                  <img 
                    src={imgUrl} 
                    alt={`Kipchoge Keino Stadium phase ${index + 1}`} 
                    className="object-cover w-full h-full transition duration-300 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    id={`gallery-img-${index}`}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200">
                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 transition duration-300"
          onClick={() => setSelectedImage(null)}
          id="gallery-lightbox"
        >
          <div className="relative max-w-3xl w-full max-h-[80vh] flex flex-col items-center">
            <button 
              className="absolute -top-10 right-0 text-white hover:text-neutral-300 text-sm font-semibold p-2"
              onClick={() => setSelectedImage(null)}
              id="close-lightbox-btn"
            >
              Close [✕]
            </button>
            <img 
              src={selectedImage} 
              alt="Stadium Site Upgrade Phase Fullscreen View" 
              className="object-contain max-w-full max-h-[70vh] rounded-lg border border-neutral-800"
              referrerPolicy="no-referrer"
              id="lightbox-image"
            />
            <p className="text-neutral-400 text-xs mt-3 text-center">
              Kipchoge Keino Stadium Upgrade Site Work • Eldoret, Kenya
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
