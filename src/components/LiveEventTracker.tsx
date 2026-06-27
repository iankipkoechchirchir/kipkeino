/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LiveEventRace, TicketCategory, TicketReservation } from '../types';
import { Play, RotateCcw, Ticket, QrCode, CheckCircle2, User, Trophy, Users, ShieldAlert, Sparkles } from 'lucide-react';

interface LiveEventTrackerProps {
  races: LiveEventRace[];
  categories: TicketCategory[];
  meetVenue: string;
  nextScheduledMeet: string;
  onSimulateRace: (raceId: string) => void;
  onResetRace: () => void;
  onReserveTicket: (holderName: string, categoryId: string, quantity: number) => Promise<TicketReservation>;
  isSimulating: boolean;
}

export const LiveEventTracker: React.FC<LiveEventTrackerProps> = ({
  races,
  categories,
  meetVenue,
  nextScheduledMeet,
  onSimulateRace,
  onResetRace,
  onReserveTicket,
  isSimulating
}) => {
  const [selectedRaceId, setSelectedRaceId] = useState<string>('kk-2');
  const [holderName, setHolderName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [reservation, setReservation] = useState<TicketReservation | null>(null);
  const [ticketError, setTicketError] = useState<string | null>(null);
  const [isReserving, setIsReserving] = useState(false);

  const selectedRace = races.find(r => r.id === selectedRaceId) || races[1];

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!holderName.trim()) {
      setTicketError('Please provide a ticket holder name.');
      return;
    }
    setTicketError(null);
    setIsReserving(true);
    try {
      const res = await onReserveTicket(holderName, selectedCategoryId, quantity);
      setReservation(res);
      // Reset form on success
      setHolderName('');
      setQuantity(1);
    } catch (err: any) {
      setTicketError(err.message || 'Failed to complete ticket reservation.');
    } finally {
      setIsReserving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="live-event-tracker-module">
      
      {/* LEFT & CENTER PANEL: Real-time Athletics & Results */}
      <div className="lg:col-span-2 bg-[#0D0D0D] border border-neutral-800 rounded-xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between" id="athletics-dashboard">
        
        {/* Race Header Selection */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping shrink-0" />
                <h3 className="text-xl font-serif font-light text-white tracking-tight">Live Track Results</h3>
              </div>
              <p className="text-xs text-neutral-500 mt-1 font-mono">
                {meetVenue} • Absa Kip Keino Classic Meet
              </p>
            </div>

            {/* Selector */}
            <div className="flex gap-2 bg-neutral-900 p-1 rounded border border-neutral-800">
              {races.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRaceId(r.id)}
                  className={`px-3 py-1 rounded text-xs font-semibold font-mono uppercase tracking-wider transition duration-150 ${
                    selectedRaceId === r.id
                      ? 'bg-amber-500 text-black shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  id={`btn-race-select-${r.id}`}
                >
                  {r.distance} ({r.category})
                </button>
              ))}
            </div>
          </div>

          {/* Current Selected Race Card */}
          <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h4 className="text-base font-serif font-semibold text-white leading-tight">{selectedRace.eventName}</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-neutral-400 font-mono">
                  <span>Distance: {selectedRace.distance}</span>
                  <span>Schedule: {selectedRace.scheduledTime}</span>
                </div>
              </div>

              {/* Race Action Simulators */}
              <div className="flex gap-2">
                {selectedRace.status === 'scheduled' && (
                  <button
                    onClick={() => onSimulateRace(selectedRace.id)}
                    disabled={isSimulating}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs rounded shadow-md transition duration-150 disabled:opacity-50"
                    id="btn-simulate-race"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    Simulate Live Race
                  </button>
                )}
                {selectedRace.status === 'completed' && selectedRace.id === 'kk-2' && (
                  <button
                    onClick={onResetRace}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-300 font-semibold text-xs rounded transition duration-150"
                    id="btn-reset-race"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Simulation
                  </button>
                )}
                <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded border tracking-wider self-start font-mono ${
                  selectedRace.status === 'live' 
                    ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                    : selectedRace.status === 'completed'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  ● {selectedRace.status}
                </span>
              </div>
            </div>

            {/* Historical/Meet Records Accent */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-neutral-900/50 p-3 rounded border border-neutral-850 text-xs font-mono text-neutral-400">
              <div>
                <span className="text-neutral-500 font-semibold uppercase block text-[10px] tracking-wider">Meet Record</span>
                <span className="text-neutral-200">{selectedRace.records.meet}</span>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold uppercase block text-[10px] tracking-wider">World Record</span>
                <span className="text-neutral-200">{selectedRace.records.world}</span>
              </div>
            </div>
          </div>

          {/* Athletes Lane Results Table */}
          <div className="overflow-x-auto rounded-xl border border-neutral-850 bg-neutral-950">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-850 bg-[#0D0D0D] text-neutral-400 font-mono font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4 text-center w-12">Lane</th>
                  <th className="py-3 px-4">Athlete</th>
                  <th className="py-3 px-4 text-center w-16">Country</th>
                  {selectedRace.status === 'completed' && (
                    <>
                      <th className="py-3 px-4 text-center">400m Split</th>
                      <th className="py-3 px-4 text-center">800m Split</th>
                    </>
                  )}
                  <th className="py-3 px-4 text-right w-24">Final Mark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-850">
                {selectedRace.athletes.map((athlete, idx) => (
                  <tr 
                    key={idx} 
                    className={`hover:bg-neutral-900/30 transition duration-150 ${
                      athlete.currentPosition === 1 ? 'bg-amber-500/5' : ''
                    }`}
                  >
                    <td className="py-2.5 px-4 text-center font-mono font-bold text-neutral-400">
                      {athlete.lane}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        {athlete.currentPosition === 1 && (
                          <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        )}
                        <span>{athlete.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-center font-bold text-neutral-400 font-mono">
                      {athlete.country}
                    </td>
                    {selectedRace.status === 'completed' && (
                      <>
                        <td className="py-2.5 px-4 text-center font-mono text-neutral-500">
                          {athlete.split400m || '55.4'}
                        </td>
                        <td className="py-2.5 px-4 text-center font-mono text-neutral-500">
                          {athlete.split800m || '1:52.1'}
                        </td>
                      </>
                    )}
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-amber-500">
                      {athlete.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Stadium Ticker */}
        <div className="mt-8 pt-4 border-t border-neutral-800 bg-gradient-to-r from-amber-500/5 to-transparent p-3 rounded border border-amber-500/10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono block mb-1">
            Stadium Operations Live Wire
          </span>
          <p className="text-xs text-neutral-400 italic leading-relaxed">
            "Track operations are running smoothly. General admission gates are 62% filled. Wind index at finish-line measures a legal +1.2 m/s."
          </p>
        </div>
      </div>

      {/* RIGHT PANEL: Digital Event Ticketing */}
      <div className="bg-[#0D0D0D] border border-neutral-800 rounded-xl p-6 shadow-2xl flex flex-col justify-between" id="ticketing-module">
        <div>
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-4 mb-6">
            <Ticket className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="text-lg font-serif font-semibold text-white tracking-tight">Kip Keino Classic Tickets</h3>
              <p className="text-[10px] text-neutral-500 font-mono">Official Secure Ticketing Portal</p>
            </div>
          </div>

          {!reservation ? (
            <form onSubmit={handleTicketSubmit} className="space-y-4" id="ticket-booking-form">
              {ticketError && (
                <div className="p-3 rounded bg-red-950/40 border border-red-500/20 text-red-400 text-xs flex gap-2 items-start" id="ticket-error-alert">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{ticketError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-widest font-mono">
                  Ticket Holder Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-neutral-600" />
                  <input
                    type="text"
                    value={holderName}
                    onChange={(e) => setHolderName(e.target.value)}
                    placeholder="e.g. Kelvin Kipchumba"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded border border-neutral-850 bg-neutral-950 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    id="holder-name-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-widest font-mono">
                  Select Seating Category
                </label>
                <select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded border border-neutral-850 bg-neutral-950 text-white focus:outline-none focus:border-amber-500"
                  id="ticket-category-select"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (KES {c.priceKES.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Show benefits of the selected category */}
              <div className="p-3 rounded bg-neutral-950 border border-neutral-850 text-[11px] text-neutral-400">
                <span className="font-semibold text-neutral-300 block mb-1">Seating Amenities:</span>
                <ul className="list-disc list-inside space-y-1 font-sans">
                  {categories.find(c => c.id === selectedCategoryId)?.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-widest font-mono">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 text-sm rounded border border-neutral-850 bg-neutral-950 text-white focus:outline-none focus:border-amber-500"
                    id="ticket-quantity-input"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <span className="text-[10px] text-neutral-500 block uppercase tracking-wider">Estimated Cost:</span>
                  <span className="text-base font-black text-amber-500">
                    KES {((categories.find(c => c.id === selectedCategoryId)?.priceKES || 0) * quantity).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isReserving}
                className="w-full py-2.5 mt-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-widest font-mono rounded shadow-lg shadow-amber-500/10 transition duration-150 flex items-center justify-center gap-2"
                id="book-ticket-btn"
              >
                {isReserving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Generating Digital Pass...
                  </>
                ) : (
                  <>
                    <Ticket className="w-4 h-4" />
                    Purchase Digital Pass
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Digital Ticket Graphic Card */
            <div className="space-y-4" id="digital-ticket-pass">
              <div className="rounded-xl border border-amber-500/30 bg-neutral-950 p-5 shadow-2xl relative overflow-hidden">
                {/* Visual accents */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-500/20 to-transparent pointer-events-none rounded-bl-full" />
                
                <div className="flex justify-between items-start border-b border-neutral-850 pb-3 mb-4">
                  <div>
                    <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 px-1.5 py-0.5 text-[8px] font-bold text-amber-500 uppercase tracking-widest ring-1 ring-inset ring-amber-500/10">
                      LIVE AT ATHLETICS HUB
                    </span>
                    <h4 className="text-xs font-serif font-black text-white mt-1 uppercase tracking-tight">
                      Absa Kip Keino Classic
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {reservation.ticketId}
                  </span>
                </div>

                <div className="space-y-3 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase font-bold">Holder</span>
                    <span className="text-white font-sans font-bold text-sm">{reservation.holderName}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 border-t border-b border-neutral-850 py-2">
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase font-bold">Category</span>
                      <span className="text-neutral-200 font-sans font-semibold text-xs">{reservation.categoryName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase font-bold">Qty</span>
                      <span className="text-neutral-200 font-sans font-semibold text-xs">{reservation.quantity} Pass(es)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase font-bold">Total Settled</span>
                      <span className="text-sm font-black text-amber-500">KES {reservation.totalCost.toLocaleString()}</span>
                    </div>
                    <span className="text-[9px] text-neutral-600 block">Issued: {new Date(reservation.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>

                {/* Simulated QR Code Canvas Block */}
                <div className="mt-5 pt-4 border-t border-dashed border-neutral-850 flex flex-col items-center gap-3">
                  <div className="p-3 bg-white rounded border border-neutral-700 select-none flex items-center justify-center">
                    <QrCode className="w-28 h-28 text-neutral-950" strokeWidth={1.5} />
                  </div>
                  <span className="text-[8px] text-neutral-500 font-mono select-all">
                    Verification Signature: {reservation.ticketId}-SECURE
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setReservation(null)}
                  className="flex-1 py-2 text-xs font-semibold rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-750 transition duration-150"
                  id="book-another-ticket"
                >
                  Book Another Ticket
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic event footer summary */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-between items-center text-[10px] font-mono text-neutral-500">
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-neutral-600" />
            <span>Capacity Managed Gate</span>
          </div>
          <span>v2.1 Secured</span>
        </div>
      </div>

    </div>
  );
};
