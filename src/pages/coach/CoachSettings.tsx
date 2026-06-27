import React, { useState } from 'react';
import { Settings, CheckCircle, Save, Star, ShieldAlert } from 'lucide-react';

interface CoachSettingsProps {
  coachName?: string;
  onUpdateCoach?: (name: string, bio: string) => void;
}

export default function CoachSettings({ 
  coachName = "Paul Ereng",
  onUpdateCoach 
}: CoachSettingsProps) {
  
  const [name, setName] = useState(coachName);
  const [specialty, setSpecialty] = useState('800m & 1500m Mid-Distance');
  const [experience, setExperience] = useState('18 Years Elite Training');
  const [bio, setBio] = useState('Former Olympic 800m Champion (Seoul 1988). Head Mid-Distance coach at Eldoret High-Altitude Campus.');
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateCoach) {
      onUpdateCoach(name, bio);
    }
    setSuccess('Coaching profile configurations updated successfully.');
    setTimeout(() => setSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 font-sans text-left" id="coach-settings-page">
      
      {/* HEADER SECTION */}
      <div className="border-b border-neutral-850 pb-4">
        <h2 className="text-xl font-display font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5 text-amber-500" />
          <span>Coaching Staff Configurations</span>
        </h2>
        <p className="text-xs text-neutral-400 font-mono">
          Manage your official Olympic & Academy training specialties, display credentials, and physical bio details.
        </p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-mono flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* EDIT PROFILE FORM */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-neutral-950 border border-neutral-850 rounded-2xl p-5 sm:p-6 space-y-4 font-mono text-xs">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
            Official Academy Identification
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Coaching Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Primary Specialty</label>
              <input
                type="text"
                required
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Experience Level</label>
              <input
                type="text"
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Campus Division</label>
              <div className="w-full px-3 py-2 border border-neutral-800 bg-[#141417] text-neutral-500 rounded-lg select-none">
                Eldoret Elite Track Squad
              </div>
            </div>
          </div>

          <div>
            <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Official Coaching Bio / Achievements</label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500 font-sans text-xs leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase rounded-lg text-[10px] tracking-widest transition flex items-center justify-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Credentials</span>
          </button>
        </form>

        {/* METADATA SIDEBAR */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-5 space-y-4">
            <h4 className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider font-extrabold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Bio-Inspection Audit Status</span>
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              As an official coach at Kipchoge Keino Athletic Infrastructure, your account has full read/write permissions to view runner medical clearance sheets and assign electronic training regimens.
            </p>

            <div className="p-3.5 bg-amber-500/5 border border-amber-500/10 rounded-xl space-y-1.5 text-[11px] font-mono text-amber-400/90 leading-relaxed">
              <span className="flex items-center gap-1 font-bold">
                <ShieldAlert className="w-4 h-4" />
                <span>ADAK Anti-Doping Regulations</span>
              </span>
              <span>
                All regimens designed here must fully respect the 12-hour resting window constraints under official ADAK/WADA compliance directives.
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
