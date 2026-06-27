import React, { useState } from 'react';
import { Search, Trophy, Medal, PlusCircle, Activity, Heart, Eye } from 'lucide-react';

export interface Athlete {
  id: number;
  name: string;
  discipline: string;
  age: number;
  coach: string;
  status: 'active' | 'injured' | 'suspended' | 'retired';
  medicalClearance: boolean;
  joinedDate: string;
  pbMark?: string; // Personal Best
}

interface AthleteProfileProps {
  athletes?: Athlete[];
  onAddAthlete?: (athlete: Omit<Athlete, 'id'>) => void;
}

export default function AthleteProfile({ athletes: initialAthletes, onAddAthlete }: AthleteProfileProps) {
  const [athletes, setAthletes] = useState<Athlete[]>(initialAthletes || [
    { id: 1, name: 'Ezekiel Kemboi', discipline: '3000m Steeplechase', age: 42, coach: 'Peter Rono', status: 'active', medicalClearance: true, joinedDate: '2020-05-12', pbMark: '8:05.81' },
    { id: 2, name: 'Faith Kipyegon', discipline: '1500m Gold Elite', age: 32, coach: 'Peter Rono', status: 'active', medicalClearance: true, joinedDate: '2021-08-20', pbMark: '3:49.04' },
    { id: 3, name: 'Eliud Kipchoge', discipline: 'Marathon Elite', age: 41, coach: 'Patrick Sang', status: 'active', medicalClearance: true, joinedDate: '2018-02-14', pbMark: '2:01:09' },
    { id: 4, name: 'Emmanuel Wanyonyi', discipline: '800m', age: 21, coach: 'Claudio Berardelli', status: 'active', medicalClearance: true, joinedDate: '2023-01-01', pbMark: '1:42.15' },
    { id: 5, name: 'Beatrice Chepkoech', discipline: '3000m Steeplechase', age: 34, coach: 'Peter Rono', status: 'injured', medicalClearance: false, joinedDate: '2019-11-04', pbMark: '8:44.32' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDiscipline, setFilterDiscipline] = useState('all');

  // Add form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDiscipline, setNewDiscipline] = useState('');
  const [newAge, setNewAge] = useState(22);
  const [newCoach, setNewCoach] = useState('Peter Rono');
  const [newPb, setNewPb] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newDiscipline) return;

    const newAthlete: Athlete = {
      id: athletes.length + 1,
      name: newName,
      discipline: newDiscipline,
      age: newAge,
      coach: newCoach,
      status: 'active',
      medicalClearance: true,
      joinedDate: new Date().toISOString().split('T')[0],
      pbMark: newPb || undefined
    };

    setAthletes([newAthlete, ...athletes]);
    if (onAddAthlete) onAddAthlete(newAthlete);

    // Reset Form
    setNewName('');
    setNewDiscipline('');
    setNewPb('');
    setShowAddForm(false);
  };

  const toggleMedical = (id: number) => {
    setAthletes(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, medicalClearance: !a.medicalClearance };
      }
      return a;
    }));
  };

  const filteredAthletes = athletes.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.discipline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiscipline = filterDiscipline === 'all' || a.discipline.includes(filterDiscipline);
    return matchesSearch && matchesDiscipline;
  });

  return (
    <div className="space-y-6" id="mgmt-athlete-profile-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <h2 className="text-2xl font-serif font-light text-white tracking-tight">Athlete Profiles</h2>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">High-Performance Academy Board • Roster of elite champions</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold rounded font-mono uppercase tracking-wider transition"
          id="btn-toggle-add-athlete"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          Register Athlete
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl space-y-4 font-mono text-xs">
          <div className="border-b border-neutral-800 pb-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Academy Registration Form</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-neutral-400 mb-1">Athlete Full Name</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Mary Moraa"
                className="w-full px-3 py-2 border border-neutral-800 bg-neutral-900 rounded text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Discipline (Event Name)</label>
              <input
                type="text"
                required
                value={newDiscipline}
                onChange={(e) => setNewDiscipline(e.target.value)}
                placeholder="e.g. 400m / 800m"
                className="w-full px-3 py-2 border border-neutral-800 bg-neutral-900 rounded text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Age</label>
              <input
                type="number"
                value={newAge}
                onChange={(e) => setNewAge(parseInt(e.target.value) || 18)}
                className="w-full px-3 py-2 border border-neutral-800 bg-neutral-900 rounded text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Personal Best Mark</label>
              <input
                type="text"
                value={newPb}
                onChange={(e) => setNewPb(e.target.value)}
                placeholder="e.g. 1:56.71"
                className="w-full px-3 py-2 border border-neutral-800 bg-neutral-900 rounded text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Assigned Academy Coach</label>
              <input
                type="text"
                value={newCoach}
                onChange={(e) => setNewCoach(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-800 bg-neutral-900 rounded text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded text-[11px] tracking-widest transition"
              >
                Onboard Athlete
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Search Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search elite champions by name or discipline..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded border border-neutral-800 bg-neutral-900 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <select
          value={filterDiscipline}
          onChange={(e) => setFilterDiscipline(e.target.value)}
          className="px-3 py-2 text-xs rounded border border-neutral-800 bg-neutral-900 text-white font-mono focus:outline-none focus:border-amber-500"
        >
          <option value="all">All Disciplines</option>
          <option value="Steeplechase">Steeplechase</option>
          <option value="Marathon">Marathon</option>
          <option value="800m">800m</option>
          <option value="1500m">1500m</option>
        </select>
      </div>

      {/* Grid of Athletes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAthletes.map(athlete => (
          <div key={athlete.id} className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
            {/* Medals Underlay Accent */}
            <div className="absolute top-2 right-2 p-1 text-[10px] font-mono font-bold uppercase tracking-widest bg-neutral-900 rounded border border-neutral-800 text-neutral-500">
              ID-{athlete.id}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                  <Medal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">{athlete.name}</h3>
                  <p className="text-[10px] text-amber-500 font-mono uppercase tracking-wider mt-0.5">{athlete.discipline}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono py-2.5 border-t border-b border-neutral-900">
                <div>
                  <span className="text-neutral-500 text-[9px] uppercase font-bold block">Age</span>
                  <span className="text-neutral-300">{athlete.age} years</span>
                </div>
                <div>
                  <span className="text-neutral-500 text-[9px] uppercase font-bold block">Coach</span>
                  <span className="text-neutral-300">{athlete.coach}</span>
                </div>
                <div>
                  <span className="text-neutral-500 text-[9px] uppercase font-bold block">Personal Best</span>
                  <span className="text-white font-bold">{athlete.pbMark || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-neutral-500 text-[9px] uppercase font-bold block">Joined Academy</span>
                  <span className="text-neutral-400">{athlete.joinedDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-neutral-900 pt-3">
              <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase font-mono ${
                athlete.status === 'active'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                ● {athlete.status}
              </span>

              <button
                onClick={() => toggleMedical(athlete.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] rounded uppercase font-bold font-mono transition ${
                  athlete.medicalClearance
                    ? 'bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/25'
                    : 'bg-red-500/15 border border-red-500/20 text-red-400 hover:bg-red-500/25'
                }`}
                id={`btn-medical-clear-${athlete.id}`}
              >
                <Heart className="w-3.5 h-3.5" />
                {athlete.medicalClearance ? 'Medically Cleared' : 'Needs Clearance'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
