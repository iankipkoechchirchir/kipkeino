import React, { useState } from 'react';
import { User, Settings, Check, Award, Bell } from 'lucide-react';

interface AthleteSettingsProps {
  athleteName?: string;
  discipline?: string;
  onUpdateAthlete?: (name: string, discipline: string) => void;
}

export default function AthleteSettings({ 
  athleteName = "Faith Kipyegon", 
  discipline = "1500m Gold Elite",
  onUpdateAthlete
}: AthleteSettingsProps) {
  
  const [nameInput, setNameInput] = useState(athleteName);
  const [disciplineInput, setDisciplineInput] = useState(discipline);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [adakDisclosure, setAdakDisclosure] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    if (onUpdateAthlete) {
      onUpdateAthlete(nameInput, disciplineInput);
    }
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans text-left" id="athlete-settings-page">
      <div className="border-b border-[#1f1f24] pb-4">
        <h2 className="text-2xl font-display font-bold uppercase italic text-white tracking-tight">
          Athlete Profile Settings
        </h2>
        <p className="text-xs text-neutral-500 font-mono mt-0.5">
          Modify your displayed athlete name, high-altitude athletic discipline selection, and compliance flags
        </p>
      </div>

      <div className="max-w-xl">
        <form onSubmit={handleSave} className="bg-neutral-950 border border-neutral-850 rounded-2xl p-6 space-y-6">
          
          {/* PROFILE DATA */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500" />
              <span>Personal Identity Metadata</span>
            </h3>

            <div className="space-y-3 font-mono text-xs text-neutral-300">
              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Displayed Athlete Name</label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">High-Altitude Discipline</label>
                <select
                  value={disciplineInput}
                  onChange={(e) => setDisciplineInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-neutral-800 bg-[#0d0d0f] text-neutral-300 rounded-lg focus:outline-none focus:border-amber-500"
                >
                  <option value="1500m Gold Elite">1500m Gold Elite</option>
                  <option value="800m Sprint Standard">800m Sprint Standard</option>
                  <option value="3000m Steeplechase Pioneer">3000m Steeplechase Pioneer</option>
                  <option value="5000m High Altitude Marathon">5000m Marathon</option>
                </select>
              </div>
            </div>
          </div>

          {/* PREFERENCES SECTION */}
          <div className="space-y-4 border-t border-neutral-900 pt-5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              <span>Communication & Compliance Disclosure</span>
            </h3>

            <div className="space-y-3 font-mono text-xs text-neutral-300">
              <div className="flex items-center justify-between p-3.5 bg-neutral-900/30 border border-neutral-850 rounded-xl">
                <div>
                  <span className="block text-white font-bold">In-App Push Bulletins</span>
                  <p className="text-[9px] text-neutral-500 mt-0.5">Toggle live alerts for weather barometer forecasts.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPushNotifs(!pushNotifs)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                    pushNotifs ? 'bg-amber-500' : 'bg-neutral-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-black transition-transform duration-200 ${
                    pushNotifs ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-neutral-900/30 border border-neutral-850 rounded-xl">
                <div>
                  <span className="block text-white font-bold">ADAK Disclosure Consent</span>
                  <p className="text-[9px] text-neutral-500 mt-0.5">Allow sports academies to verify biometric records.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAdakDisclosure(!adakDisclosure)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                    adakDisclosure ? 'bg-amber-500' : 'bg-neutral-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-black transition-transform duration-200 ${
                    adakDisclosure ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* SUBMIT ROW */}
          <div className="border-t border-neutral-900 pt-6 flex items-center justify-between">
            <span className="text-[9px] font-mono text-neutral-500 uppercase">Status: ADAK Passport Active</span>
            
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase rounded-lg text-xs tracking-widest transition flex items-center gap-1.5"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Profile Saved</span>
                </>
              ) : (
                <>
                  <Settings className="w-4 h-4" />
                  <span>Update Profile</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
