import React, { useState } from 'react';
import { Calendar, Clock, Landmark, AlertCircle, PlusCircle, CheckCircle2 } from 'lucide-react';

interface Booking {
  id: number;
  facility: string;
  purpose: string;
  timeSlot: string;
  instructor: string;
  status: 'confirmed' | 'pending' | 'maintenance';
}

export default function Schedules() {
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 1, facility: 'Kipchoge Keino Main Track', purpose: 'Athletics Team Sprint Training', timeSlot: '06:00 - 08:00', instructor: 'Coach Paul Ereng', status: 'confirmed' },
    { id: 2, facility: 'Secondary Tartan Track', purpose: 'Junior Athletics Trial Meet', timeSlot: '09:00 - 13:00', instructor: 'Coach Sarah Jemutai', status: 'confirmed' },
    { id: 3, facility: 'High-Altitude Gymnasium', purpose: 'Elite Muscle Hypertrophy Workout', timeSlot: '14:00 - 16:00', instructor: 'Lead Trainer Peter Rono', status: 'confirmed' },
    { id: 4, facility: 'VIP Presidential Suite', purpose: 'AFCON 2027 Inspection Committee Meeting', timeSlot: '11:00 - 13:00', instructor: 'Board Rep Kipkoech', status: 'pending' },
    { id: 5, facility: 'Main Stadium Lane 1-3', purpose: 'Runway Resurfacing Maintenance', timeSlot: 'All-Day Locked', instructor: 'Sinohydro Engineer Julius', status: 'maintenance' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newFacility, setNewFacility] = useState('Kipchoge Keino Main Track');
  const [newPurpose, setNewPurpose] = useState('');
  const [newTime, setNewTime] = useState('08:00 - 10:00');
  const [newInstructor, setNewInstructor] = useState('Peter Rono');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPurpose) return;

    const newBooking: Booking = {
      id: bookings.length + 1,
      facility: newFacility,
      purpose: newPurpose,
      timeSlot: newTime,
      instructor: newInstructor,
      status: 'pending'
    };

    setBookings([...bookings, newBooking]);
    setNewPurpose('');
    setShowAddForm(false);
  };

  const approveBooking = (id: number) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'confirmed' } : b));
  };

  return (
    <div className="space-y-6" id="mgmt-schedules-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <h2 className="text-2xl font-serif font-light text-white tracking-tight">Facility & Arena Scheduling</h2>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">Arena Bookings • Multi-lane track reservations • KDF maintenance windows</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold rounded font-mono uppercase tracking-wider transition"
          id="btn-toggle-add-booking"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          Request Lane Booking
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl space-y-4 font-mono text-xs">
          <div className="border-b border-neutral-800 pb-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">New Booking Application Form</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-neutral-400 mb-1">Target Arena/Facility</label>
              <select
                value={newFacility}
                onChange={(e) => setNewFacility(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-800 bg-neutral-900 rounded text-white focus:outline-none"
              >
                <option value="Kipchoge Keino Main Track">Kipchoge Keino Main Track</option>
                <option value="Secondary Tartan Track">Secondary Tartan Track</option>
                <option value="High-Altitude Gymnasium">High-Altitude Gymnasium</option>
                <option value="VIP Presidential Suite">VIP Presidential Suite</option>
              </select>
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Purpose of Booking</label>
              <input
                type="text"
                required
                value={newPurpose}
                onChange={(e) => setNewPurpose(e.target.value)}
                placeholder="e.g. 1500m Steeplechase drills"
                className="w-full px-3 py-2 border border-neutral-800 bg-neutral-900 rounded text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Time Frame slot</label>
              <input
                type="text"
                required
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                placeholder="e.g. 08:00 - 10:00"
                className="w-full px-3 py-2 border border-neutral-800 bg-neutral-900 rounded text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Instructor/Supervisor In-Charge</label>
              <input
                type="text"
                required
                value={newInstructor}
                onChange={(e) => setNewInstructor(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-800 bg-neutral-900 rounded text-white focus:outline-none"
              />
            </div>
            <div className="flex items-end lg:col-span-2">
              <button
                type="submit"
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded text-[11px] tracking-widest transition"
              >
                Submit Booking Application
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Grid of Schedules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map(booking => (
          <div key={booking.id} className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-500 font-mono">BOOKING ID: ES-00{booking.id}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono border ${
                  booking.status === 'confirmed'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : booking.status === 'pending'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  {booking.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-serif font-semibold text-white tracking-tight flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-amber-500" />
                  {booking.facility}
                </h3>
                <p className="text-xs text-neutral-300 mt-1.5">{booking.purpose}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-3 border-t border-neutral-900 text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-neutral-500" />
                  <span>{booking.timeSlot}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase text-neutral-500 font-bold">Officer In Charge</span>
                  <span className="text-neutral-300 font-sans">{booking.instructor}</span>
                </div>
              </div>
            </div>

            {booking.status === 'pending' && (
              <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-end">
                <button
                  onClick={() => approveBooking(booking.id)}
                  className="flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold font-mono uppercase rounded transition"
                  id={`btn-approve-booking-${booking.id}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Approve Application
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
