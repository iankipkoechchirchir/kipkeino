import React from 'react';
import { 
  Trophy, 
  Activity, 
  Shield, 
  Users, 
  Landmark, 
  Calendar, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  MapPin, 
  Clock, 
  Tv, 
  Database,
  ChevronsRight
} from 'lucide-react';
import { PremiumAthleticLogo } from './partials/PremiumAthleticLogo';
import { RegionStatus } from './partials/RegionStatus';

interface LandingPageProps {
  onLogin: (e: React.FormEvent) => Promise<void>;
  onRegister: (e: React.FormEvent) => Promise<void>;
  authError: string | null;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  loginUsername: string;
  setLoginUsername: (val: string) => void;
  loginPassword: string;
  setLoginPassword: (val: string) => void;
  regUsername: string;
  setRegUsername: (val: string) => void;
  regPassword: string;
  setRegPassword: (val: string) => void;
  regEmail: string;
  setRegEmail: (val: string) => void;
  regName: string;
  setRegName: (val: string) => void;
  regDiscipline: string;
  setRegDiscipline: (val: string) => void;
  regAge: number;
  setRegAge: (val: number) => void;
  regRole: 'athlete' | 'coach';
  setRegRole: (role: 'athlete' | 'coach') => void;
}

export default function LandingPage({
  onLogin,
  onRegister,
  authError,
  authMode,
  setAuthMode,
  loginUsername,
  setLoginUsername,
  loginPassword,
  setLoginPassword,
  regUsername,
  setRegUsername,
  regPassword,
  setRegPassword,
  regEmail,
  setRegEmail,
  regName,
  setRegName,
  regDiscipline,
  setRegDiscipline,
  regAge,
  setRegAge,
  regRole,
  setRegRole
}: LandingPageProps) {

  // Auto-filler helper to test sandbox demo accounts immediately and sign in instantly
  const handleQuickLogin = (user: string, pass: string) => {
    setLoginUsername(user);
    setLoginPassword(pass);
    setAuthMode('login');
    // Allow state flush, then trigger login submit action
    setTimeout(() => {
      const submitBtn = document.getElementById('authorize-session-btn');
      if (submitBtn) {
        (submitBtn as HTMLButtonElement).click();
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#070708] text-neutral-200 selection:bg-amber-500 selection:text-black flex flex-col relative overflow-hidden font-sans">
      
      {/* Background aesthetic grid / glowing sports track element */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#110c0a] to-[#070708] opacity-60 z-0 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute -top-[10%] right-[10%] w-[400px] h-[400px] bg-red-500/5 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* HEADER NAVBAR */}
      <header className="w-full border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PremiumAthleticLogo className="w-10 h-10 shrink-0" />
            <div>
              <span className="text-sm font-display font-extrabold text-white tracking-wider block uppercase italic">
                KIP KEINO <span className="text-amber-500">ELITE</span>
              </span>
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block">
                Eldoret High-Altitude Hub
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="#portal-section"
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-xs font-mono text-white transition font-bold uppercase tracking-wider"
            >
              Sign In
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* HERO CONTENT */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span>Altitude Optimization: 2,400m Above Sea Level</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white leading-tight uppercase tracking-tight italic">
                  Where Champions <br />
                  Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-amber-500">Engineered</span>.
                </h1>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
                  The ultimate elite training ecosystem in Eldoret, Kenya. Access state-of-the-art IAAF-spec Tartan tracks, track real-time stadium infrastructure status, manage high-altitude academy profiles, and preserve the golden legacy of pioneer Kipchoge Keino.
                </p>
              </div>

              {/* TELEMETRY BAR INDEX */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-neutral-950/90 border border-neutral-900 rounded-xl">
                <div>
                  <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Altitude Base</span>
                  <span className="text-xl font-display font-bold text-white">2,400m</span>
                  <span className="block text-[8px] font-mono text-emerald-500 mt-0.5">VO2 Max Gold standard</span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-widest">IAAF Tracks</span>
                  <span className="text-xl font-display font-bold text-white">Grade A</span>
                  <span className="block text-[8px] font-mono text-neutral-400 mt-0.5">Seiko Timed Lanes</span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Active Roster</span>
                  <span className="text-xl font-display font-bold text-white">142 Elite</span>
                  <span className="block text-[8px] font-mono text-amber-500 mt-0.5">National & Global</span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Upgrade Status</span>
                  <span className="text-xl font-display font-bold text-emerald-400">82% - 85%</span>
                  <span className="block text-[8px] font-mono text-neutral-500 mt-0.5">KDF Supervised</span>
                </div>
              </div>

              {/* DYNAMIC SYSTEM FEATURES GRID */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                  Fully Integrated Workspace Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="p-4 bg-neutral-950/40 border border-neutral-900 rounded-lg hover:border-neutral-800 transition">
                    <div className="flex gap-3">
                      <Tv className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Live Track Telemetry</h4>
                        <p className="text-[11px] text-neutral-400 mt-1">Simulate live races on Kip Keino classic blocks, and reserve spectator general or VIP tickets securely.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-950/40 border border-neutral-900 rounded-lg hover:border-neutral-800 transition">
                    <div className="flex gap-3">
                      <Users className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Multilingual Academy Registry</h4>
                        <p className="text-[11px] text-neutral-400 mt-1">Roles for Administrators, staff, coaches, and athletes to track training logs, and anti-doping certifications.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-950/40 border border-neutral-900 rounded-lg hover:border-neutral-800 transition">
                    <div className="flex gap-3">
                      <Trophy className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Heritage Archive Vault</h4>
                        <p className="text-[11px] text-neutral-400 mt-1">Curated Olympic history timelines, honorary medal logs, and custom AI Heritage assistant.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-950/40 border border-neutral-900 rounded-lg hover:border-neutral-800 transition">
                    <div className="flex gap-3">
                      <Shield className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Enterprise MySQL Auditor</h4>
                        <p className="text-[11px] text-neutral-400 mt-1">Full database status query terminal, secure bcrypt password hashing, and active log ledgers.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* AUTH CONSOLE CARD */}
            <div className="lg:col-span-5" id="portal-section">
              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
                
                {/* Header of auth box */}
                <div className="text-center space-y-2">
                  <div className="inline-flex justify-center mb-1">
                    <PremiumAthleticLogo className="w-12 h-12" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider">
                    Secure Workspace Gate
                  </h2>
                  <p className="text-xs text-neutral-500 font-mono">
                    {authMode === 'login' ? 'Board, Staff & Athletes Sign-In' : 'Join high-altitude athlete academy'}
                  </p>
                </div>

                {/* Error Box */}
                {authError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-mono text-center">
                    ⚠️ {authError}
                  </div>
                )}

                {/* TAB SELECTOR */}
                <div className="grid grid-cols-2 gap-2 bg-neutral-900 p-1 rounded-lg border border-neutral-800 font-mono text-xs font-bold uppercase tracking-wider">
                  <button
                    onClick={() => setAuthMode('login')}
                    className={`py-2 rounded transition ${authMode === 'login' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'}`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setAuthMode('register')}
                    className={`py-2 rounded transition ${authMode === 'register' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'}`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* LOGIN FORM */}
                {authMode === 'login' ? (
                  <form onSubmit={onLogin} className="space-y-4 font-mono text-xs">
                    <div>
                      <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Username</label>
                      <input
                        type="text"
                        required
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        placeholder="Enter username"
                        className="w-full px-3.5 py-2.5 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Password</label>
                      <input
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <button
                      id="authorize-session-btn"
                      type="submit"
                      className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase rounded-lg text-xs tracking-widest transition flex items-center justify-center gap-1.5"
                    >
                      <span>Authorize Session</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  // REGISTRATION FORM
                  <form onSubmit={onRegister} className="space-y-4 font-mono text-xs">
                    {/* Role Selection tab inside Sign Up form */}
                    <div>
                      <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Join Academy As</label>
                      <div className="grid grid-cols-2 gap-2 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
                        <button
                          type="button"
                          onClick={() => setRegRole('athlete')}
                          className={`py-1.5 rounded text-[11px] font-bold transition ${regRole === 'athlete' ? 'bg-neutral-800 text-amber-500 border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200'}`}
                        >
                          Elite Athlete
                        </button>
                        <button
                          type="button"
                          onClick={() => setRegRole('coach')}
                          className={`py-1.5 rounded text-[11px] font-bold transition ${regRole === 'coach' ? 'bg-neutral-800 text-amber-500 border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200'}`}
                        >
                          Academy Coach
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Username</label>
                        <input
                          type="text"
                          required
                          value={regUsername}
                          onChange={(e) => setRegUsername(e.target.value)}
                          placeholder="e.g. faith_k"
                          className="w-full px-3 py-2 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Password</label>
                        <input
                          type="password"
                          required
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-3 py-2 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Email Address</label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder={regRole === 'coach' ? 'paul.ereng@academy.org' : 'faith.k@eldoretstadium.go.ke'}
                        className="w-full px-3 py-2 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">
                        {regRole === 'coach' ? 'Full Coach Name' : 'Full Athlete Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder={regRole === 'coach' ? 'e.g. Paul Ereng' : 'e.g. Faith Kipyegon'}
                        className="w-full px-3 py-2 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Discipline</label>
                        {regRole === 'coach' ? (
                          <div className="w-full px-3 py-2 border border-neutral-800 bg-[#16161a] text-neutral-500 rounded-lg select-none font-sans text-xs">
                            Academy Coaching Staff
                          </div>
                        ) : (
                          <select
                            value={regDiscipline}
                            onChange={(e) => setRegDiscipline(e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-800 bg-[#0d0d0f] text-neutral-300 rounded-lg focus:outline-none focus:border-amber-500"
                          >
                            <option value="1500m Gold Elite">1500m Gold Elite</option>
                            <option value="800m Sprint Standard">800m Sprint Standard</option>
                            <option value="3000m Steeplechase Pioneer">3000m Steeplechase Pioneer</option>
                            <option value="5000m High Altitude Marathon">5000m Marathon</option>
                          </select>
                        )}
                      </div>
                      <div>
                        <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5 tracking-wider">Age</label>
                        <input
                          type="number"
                          required
                          value={regAge}
                          onChange={(e) => setRegAge(parseInt(e.target.value, 10) || 22)}
                          className="w-full px-3 py-2 border border-neutral-800 bg-[#0d0d0f] text-white rounded-lg focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase rounded-lg text-xs tracking-widest transition flex items-center justify-center gap-1.5"
                    >
                      <span>Register & Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {/* QUICK-ACCESS DEVS / TESTING SANDBOX */}
                <div className="border-t border-neutral-900 pt-4 space-y-2.5">
                  <div className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-bold">
                      Testing Sandbox Quick Login:
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[9px] font-mono">
                    <button
                      onClick={() => handleQuickLogin('coach_paul', 'CoachPass')}
                      className="p-1.5 bg-neutral-900 border border-neutral-800 hover:border-amber-500 text-neutral-300 hover:text-amber-400 rounded transition text-left flex items-center justify-between"
                    >
                      <span>Academy Coach</span>
                      <ChevronsRight className="w-3 h-3 text-amber-500 opacity-60" />
                    </button>
                    <button
                      onClick={() => handleQuickLogin('athlete_kemboi', 'AthletePass')}
                      className="p-1.5 bg-neutral-900 border border-neutral-800 hover:border-amber-500 text-neutral-300 hover:text-amber-400 rounded transition text-left flex items-center justify-between"
                    >
                      <span>Elite Athlete</span>
                      <ChevronsRight className="w-3 h-3 text-amber-500 opacity-60" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-neutral-950 border-t border-neutral-900 py-6 text-center text-xs font-mono text-neutral-500 z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Kipchoge Keino Athletic Infrastructure & High-Altitude Hub. All rights reserved.</p>
          <RegionStatus />
        </div>
      </footer>

    </div>
  );
}
