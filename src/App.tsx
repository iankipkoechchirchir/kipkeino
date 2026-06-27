

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StadiumProject, HistoricalMilestone, LiveEventRace, TicketCategory, TicketReservation, ChatMessage } from './types';
import { StadiumStatusCard } from './components/StadiumStatusCard';
import { MilestoneTimeline } from './components/MilestoneTimeline';
import { LiveEventTracker } from './components/LiveEventTracker';
import { HeritageGuide } from './components/HeritageGuide';
import LandingPage from './components/LandingPage';
import { PremiumAthleticLogo } from './components/partials/PremiumAthleticLogo';
import { Medal, Trophy, Eye, HardHat, Calendar, HelpCircle, Activity, Award, Heart, Settings, Shield, ChevronRight, LayoutDashboard, Briefcase, Database, Search, Folder, Users, Landmark, ShoppingBag, DollarSign, LogOut, Bell, MessageSquare, Volume2 } from 'lucide-react';

// Import newly packaged modular management sub-pages
import Overview from './pages/dashboard/Overview';
import StaffList from './pages/staff/StaffList';
import AthleteProfile from './pages/athletes/AthleteProfile';
import Schedules from './pages/facilities/Schedules';
import DatabaseManager from './pages/admin/DatabaseManager';
import AuditLogs from './pages/admin/AuditLogs';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMessage from './pages/admin/AdminMessage';
import AdminBroadcast from './pages/admin/AdminBroadcast';
import AdminSettings from './pages/admin/AdminSettings';

// Athlete Pages
import AthleteDashboard from './pages/athletes/AthleteDashboard';
import AthleteSupport from './pages/athletes/AthleteSupport';
import AthleteNotification from './pages/athletes/AthleteNotification';
import AthleteSettings from './pages/athletes/AthleteSettings';

// Staff Pages
import StaffDashboard from './pages/staff/StaffDashboard';
import StaffSupport from './pages/staff/StaffSupport';
import StaffNotification from './pages/staff/StaffNotification';
import StaffSettings from './pages/staff/StaffSettings';

// Coach Pages
import CoachDashboard from './pages/coach/CoachDashboard';
import CoachSupport from './pages/coach/CoachSupport';
import CoachNotification from './pages/coach/CoachNotification';
import CoachSettings from './pages/coach/CoachSettings';
import { MODULE_GROUPS, PageInfo } from './pages/registry';

// Resilient Fallback Data (Client-side caches if Express API has minor delays)
const fallbackMilestones: HistoricalMilestone[] = [
  {
    year: '1965',
    title: 'Breaking World Records',
    eventCategory: 'World Record',
    description: 'Kipchoge Keino bursts onto the global athletic stage, shattering the 3000m world record by over 6 seconds (7:39.6) and setting a new mark for the 5000m (13:24.2) shortly after in Auckland, New Zealand.',
    media: 'https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    year: '1968',
    title: 'The Legendary Mexico City 1500m Gold',
    eventCategory: 'Olympics',
    description: 'Despite suffering from a severe gall bladder infection and being warned by doctors not to run, Kip Keino enters the 1500m final. Stuck in traffic on race day, he jogs 2 miles to the stadium, arrives with minutes to spare, and wins Gold over Jim Ryun by 2.98 seconds—the largest winning margin in Olympic 1500m history.',
    media: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    year: '1972',
    title: 'The Steeplechase Triumph in Munich',
    eventCategory: 'Olympics',
    description: 'In one of the greatest displays of raw athletic versatility, Keino enters the 3000m steeplechase despite having run it only a few times before. He clinches the Gold medal in Olympic record time (8:23.6), alongside a Silver medal in the 1500m.',
    media: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    year: '1984',
    title: 'Kip Keino Children\'s Home & School',
    eventCategory: 'Philanthropy',
    description: 'Following his track retirement, Kip and his wife Phyllis establish the Kip Keino Children\'s Home in Eldoret, rescuing and housing hundreds of orphaned and abandoned children. Later, they build the Kip Keino Primary and Secondary schools, providing quality education and athletic mentorship.',
    media: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600&h=400'
  }
];

const fallbackStadium: StadiumProject = {
  facilityName: 'Kipchoge Keino Stadium',
  completionPercentage: 82,
  targetHandover: '2026-12-31',
  contractor: 'Sinohydro Corporation',
  supervisingBody: 'Ministry of Defence / KDF',
  status: 'on-schedule',
  latestUpdates: [
    'Tartan track laying completed on the secondary training facility.',
    'Slab reinforcement and structural columns for the primary canopy are 95% complete.',
    'Seating installations have commenced in the East and West stands to meet AFCON 2027 specs.',
    'Advanced floodlight installation is fully completed and tested by power engineers.'
  ],
  gallery: [
    'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=600&h=400',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600&h=400',
    'https://images.unsplash.com/photo-1519766304817-4f37bda74a27?auto=format&fit=crop&q=80&w=600&h=400',
    'https://images.unsplash.com/photo-1535137838241-01314476c16a?auto=format&fit=crop&q=80&w=600&h=400'
  ]
};

const fallbackRaces: LiveEventRace[] = [
  {
    id: 'kk-1',
    eventName: 'Absa Kip Keino Classic - 800m Elite',
    category: 'Men',
    distance: '800m',
    scheduledTime: '16:45 EAT',
    status: 'completed',
    records: {
      meet: '1:43.12 (Emmanuel Wanyonyi, 2024)',
      world: '1:40.91 (David Rudisha, 2012)'
    },
    athletes: [
      { lane: 1, name: 'Emmanuel Wanyonyi', country: 'KEN', time: '1:42.15', split400m: '50.1', split800m: '1:42.15', status: 'finished', currentPosition: 1 },
      { lane: 2, name: 'Marco Arop', country: 'CAN', time: '1:42.45', split400m: '49.8', split800m: '1:42.45', status: 'finished', currentPosition: 2 },
      { lane: 3, name: 'Djamel Sedjati', country: 'ALG', time: '1:42.90', split400m: '50.4', split800m: '1:42.90', status: 'finished', currentPosition: 3 }
    ]
  },
  {
    id: 'kk-2',
    eventName: 'Absa Kip Keino Classic - 1500m Elite',
    category: 'Men',
    distance: '1500m',
    scheduledTime: '17:15 EAT',
    status: 'scheduled',
    records: {
      meet: '3:31.01 (Timothy Cheruiyot, 2021)',
      world: '3:26.00 (Hicham El Guerrouj, 1998)'
    },
    athletes: [
      { lane: 1, name: 'Timothy Cheruiyot', country: 'KEN', time: '--', status: 'running' },
      { lane: 2, name: 'Reynold Cheruiyot', country: 'KEN', time: '--', status: 'running' },
      { lane: 3, name: 'Cole Hocker', country: 'USA', time: '--', status: 'running' },
      { lane: 4, name: 'Yared Nuguse', country: 'USA', time: '--', status: 'running' }
    ]
  }
];

const fallbackCategories: TicketCategory[] = [
  { id: 't1', name: 'Terraces / General Admission', priceKES: 500, benefits: ['Standard seating', 'Merchandise access'], available: 8400 },
  { id: 't2', name: 'Main Stand VIP', priceKES: 2500, benefits: ['Covered seating', 'Finish-line view'], available: 1200 }
];

const ROLE_TABS: Record<string, { id: string; name: string; icon: string; description: string }[]> = {
  admin: [
    { id: 'overview', name: 'Executive Summary', icon: 'LayoutDashboard', description: 'Real-time performance metrics and overall database status summary.' },
    { id: 'admin-dashboard', name: 'Admin Dashboard', icon: 'LayoutDashboard', description: 'Real-time operational nodes, cache status, and premium administrative graphs.' },
    { id: 'admin-message', name: 'Admin Message Room', icon: 'MessageSquare', description: 'Review support requests, reply to on-duty staff, and audit chat archives.' },
    { id: 'admin-broadcast', name: 'Admin Broadcast Desk', icon: 'Volume2', description: 'Publish systemic notifications and broadcast alerts directly to everyone.' },
    { id: 'admin-settings', name: 'Admin Settings', icon: 'Settings', description: 'Configure high-altitude system parameters and database connection limits.' },
    { id: 'staff-directory', name: 'Onboard Staff & Rosters', icon: 'Users', description: 'Official registry to onboard new operators, coordinators, and KDF personnel.' },
    { id: 'athlete-directory', name: 'Academy Roster', icon: 'Trophy', description: 'High-performance athletic records, coaching assignments, and bio-clearances.' },
    { id: 'database-admin', name: 'MySQL Database Manager', icon: 'Database', description: 'Run test queries, execute migration logs, or manage active connection pools.' },
    { id: 'audit-logs', name: 'Operational Audit Ledger', icon: 'Shield', description: 'Cryptographically secured system ledger recording all CRUD administrative actions.' }
  ],
  staff: [
    { id: 'staff-dashboard', name: 'Staff Control Room', icon: 'LayoutDashboard', description: 'Check shift slots, toggle generator fuel, and complete operations tasks.' },
    { id: 'staff-support', name: 'Staff Requisitions', icon: 'HelpCircle', description: 'Submit purchase requisitions, procurement clearances, and budgets.' },
    { id: 'staff-notification', name: 'Staff Operations Alerts', icon: 'Bell', description: 'Live alerts, weather bulletins, and equipment statuses.' },
    { id: 'staff-settings', name: 'Staff Settings', icon: 'Settings', description: 'Configure active shift slots and automatic logging preferences.' },
    { id: 'overview', name: 'Operational Dashboard', icon: 'LayoutDashboard', description: 'Overview of stadium status, active operations, and operational logs.' },
    { id: 'staff-directory', name: 'Personnel Directory', icon: 'Users', description: 'View and audit operational teams, rosters, shift blocks, and duty logs.' },
    { id: 'facility-booking', name: 'Arena Bookings & Lanes', icon: 'Landmark', description: 'Verify schedules, high-altitude lane bookings, and equipment logs.' }
  ],
  coach: [
    { id: 'coach-dashboard', name: 'Coach Dashboard', icon: 'LayoutDashboard', description: 'Track high-altitude training squads, PRs, and barometric guidelines.' },
    { id: 'coach-support', name: 'Coach Support Room', icon: 'HelpCircle', description: 'Log track/hurdle repairs, medical requests, and ADAK clearance checks.' },
    { id: 'coach-notification', name: 'Coach Alerts Hub', icon: 'Bell', description: 'Real-time biological reports, weather systems, and admin directives.' },
    { id: 'coach-settings', name: 'Coach Settings', icon: 'Settings', description: 'Configure display coaching specialty, official experience, and Olympic bio.' },
    { id: 'athlete-directory', name: 'My Athlete Profiles', icon: 'Trophy', description: 'Elite rosters, high-performance training logs, and join-dates.' },
    { id: 'training-regimens', name: 'Custom Training Programs', icon: 'Activity', description: 'Formulate high-altitude programs, sprint drills, and recovery blocks.' },
    { id: 'medical-clearances', name: 'ADAK & Physio Clearances', icon: 'Heart', description: 'Verify physical fitness, medical certificates, and anti-doping records.' }
  ],
  athlete: [
    { id: 'athlete-dashboard', name: 'Athlete Dashboard', icon: 'LayoutDashboard', description: 'Track high-altitude training metrics, personal records, and elite VO2 max.' },
    { id: 'athlete-support', name: 'Athlete Support Help', icon: 'HelpCircle', description: 'Report track injuries, equipment problems, and open bio support tickets.' },
    { id: 'athlete-notification', name: 'Athlete Alerts Feed', icon: 'Bell', description: 'Systemic announcements, coach notes, and environmental alerts.' },
    { id: 'athlete-settings', name: 'Athlete Settings', icon: 'Settings', description: 'Modify display profile name, discipline selections, and consent.' },
    { id: 'athlete-directory', name: 'My Athlete Profile', icon: 'Trophy', description: 'Your personal athletic discipline, joined dates, and personal best mark.' },
    { id: 'training-regimens', name: 'My Training Schedule', icon: 'Activity', description: 'View daily sprint, interval, and high-altitude recovery regimes.' },
    { id: 'medical-clearances', name: 'My Medical Clearances', icon: 'Heart', description: 'Check your physical readiness levels and anti-doping clearance passes.' },
    { id: 'ticket-ledger', name: 'My Event Tickets', icon: 'ShoppingBag', description: 'Access reserved tickets and purchase general or VIP seats.' }
  ]
};

const getRoleTabIcon = (iconName: string) => {
  switch (iconName) {
    case 'LayoutDashboard': return <LayoutDashboard className="w-4 h-4" />;
    case 'Users': return <Users className="w-4 h-4" />;
    case 'Trophy': return <Trophy className="w-4 h-4" />;
    case 'Database': return <Database className="w-4 h-4" />;
    case 'Shield': return <Shield className="w-4 h-4" />;
    case 'HelpCircle': return <HelpCircle className="w-4 h-4" />;
    case 'Activity': return <Activity className="w-4 h-4" />;
    case 'Landmark': return <Landmark className="w-4 h-4" />;
    case 'Calendar': return <Calendar className="w-4 h-4" />;
    case 'Briefcase': return <Briefcase className="w-4 h-4" />;
    case 'Heart': return <Heart className="w-4 h-4" />;
    case 'ShoppingBag': return <ShoppingBag className="w-4 h-4" />;
    case 'MessageSquare': return <MessageSquare className="w-4 h-4" />;
    case 'Volume2': return <Volume2 className="w-4 h-4" />;
    case 'Settings': return <Settings className="w-4 h-4" />;
    case 'Bell': return <Bell className="w-4 h-4" />;
    default: return <Activity className="w-4 h-4" />;
  }
};

export default function App() {
  const [activeDashboardTab, setActiveDashboardTab] = useState<'events' | 'timeline' | 'stadium'>('events');

  // Multi-Portal Layout Toggles
  const [portalMode, setPortalMode] = useState<'memorial' | 'esms'>('esms');
  const [activeEsmsPageId, setActiveEsmsPageId] = useState<string>('overview');
  const [esmsSidebarSearch, setEsmsSidebarSearch] = useState<string>('');
  const [userRole, setUserRole] = useState<'admin' | 'staff' | 'coach' | 'athlete'>('admin');

  // Real-time Auth & Session management
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Login form fields
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  // Register form fields (Athletes and Coaches)
  const [regUsername, setRegUsername] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regName, setRegName] = useState<string>('');
  const [regDiscipline, setRegDiscipline] = useState<string>('1500m Gold Elite');
  const [regAge, setRegAge] = useState<number>(22);
  const [regRole, setRegRole] = useState<'athlete' | 'coach'>('athlete');

  // Support Tickets State
  const [supportTickets, setSupportTickets] = useState<any[]>([
    { id: 1, subject: 'Lane 4 Tartan unevenness', description: 'During speed training trials, multiple athletes noted Lane 4 has subtle bubbling near the steeplechase barrier.', urgency: 'high', status: 'In Review', date: '2026-06-27' },
    { id: 2, subject: 'VIP seat reservation confirmation', description: 'Inquire if ticket receipt merge tags can be customized for national treasury guests.', urgency: 'low', status: 'Resolved', date: '2026-06-25' }
  ]);
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketDesc, setNewTicketDesc] = useState('');
  const [newTicketUrgency, setNewTicketUrgency] = useState('medium');

  // Notifications Alerts Feed State
  const [systemNotifications, setSystemNotifications] = useState<any[]>([
    { id: 1, level: 'critical', msg: 'Secondary training track lane closure active for resurfacing.', time: '10 mins ago', date: '2026-06-27' },
    { id: 2, level: 'warning', msg: 'Eldoret oxygen levels dropping below 94% due to local humidity fluctuations.', time: '1 hour ago', date: '2026-06-27' },
    { id: 3, level: 'success', msg: 'ADAK random drug testing report released: 100% compliant roster.', time: '4 hours ago', date: '2026-06-27' },
    { id: 4, level: 'info', msg: 'Database connection pools expanded automatically to 10 limits.', time: '1 day ago', date: '2026-06-26' }
  ]);

  // Staff Duty Tasks State
  const [staffTasks, setStaffTasks] = useState<any[]>([
    { id: 1, title: 'Inspect Tartan Lane 4', description: 'Manually inspect lane 4 for bubbles and report back to groundbreaking lead.', assignedTo: 'Julius Keter', status: 'pending' },
    { id: 2, title: 'Verify VIP Hospitality list', description: 'Confirm with Ministry of Sports regarding arrival list.', assignedTo: 'Sarah Jemutai', status: 'completed' },
    { id: 3, title: 'Synchronize Seiko Starting Gates', description: 'Re-calibrate electronic starter lasers on track 2.', assignedTo: 'Peter Rono', status: 'pending' }
  ]);
  const [newStaffTaskTitle, setNewStaffTaskTitle] = useState('');
  const [newStaffTaskDesc, setNewStaffTaskDesc] = useState('');
  const [newStaffTaskAssignee, setNewStaffTaskAssignee] = useState('Julius Keter');

  // State
  const [stadiumData, setStadiumData] = useState<StadiumProject>(fallbackStadium);
  const [milestones, setMilestones] = useState<HistoricalMilestone[]>(fallbackMilestones);
  const [races, setRaces] = useState<LiveEventRace[]>(fallbackRaces);
  const [categories, setCategories] = useState<TicketCategory[]>(fallbackCategories);
  const [meetVenue, setMeetVenue] = useState('Kipchoge Keino Stadium, Eldoret');
  const [nextScheduledMeet, setNextScheduledMeet] = useState('Absa Kip Keino Classic World Tour Gold');
  
  // Loading flags
  const [isStadiumLoading, setIsStadiumLoading] = useState(false);
  const [isMilestonesLoading, setIsMilestonesLoading] = useState(false);
  const [isRacesLoading, setIsRacesLoading] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  // Dynamic state inputs for procedural general page rendering
  const [proceduralFormInputs, setProceduralFormInputs] = useState<Record<string, string>>({});
  const [notificationSuccess, setNotificationSuccess] = useState<string | null>(null);

  // Initial Fetches & Auth Checking
  useEffect(() => {
    fetchStadium();
    fetchMilestones();
    fetchEvents();

    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            setCurrentUser(data.user);
            setUserRole(data.user.role);
            if (data.user.role === 'athlete') {
              setActiveEsmsPageId('athlete-dashboard');
            } else if (data.user.role === 'staff') {
              setActiveEsmsPageId('staff-dashboard');
            } else if (data.user.role === 'admin') {
              setActiveEsmsPageId('admin-dashboard');
            } else if (data.user.role === 'coach') {
              setActiveEsmsPageId('coach-dashboard');
            } else {
              setActiveEsmsPageId('overview');
            }
          }
        }
      } catch (err) {
        console.warn('Authentication check failed, operating in fallback sandbox mode.', err);
      } finally {
        setIsAuthLoading(false);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setCurrentUser(data.user);
        setUserRole(data.user.role);
        setNotificationSuccess('Welcome back! Successfully logged into your secure session.');
        if (data.user.role === 'athlete') {
          setActiveEsmsPageId('athlete-dashboard');
        } else if (data.user.role === 'staff') {
          setActiveEsmsPageId('staff-dashboard');
        } else if (data.user.role === 'admin') {
          setActiveEsmsPageId('admin-dashboard');
        } else if (data.user.role === 'coach') {
          setActiveEsmsPageId('coach-dashboard');
        } else {
          setActiveEsmsPageId('overview');
        }
      } else {
        const data = await res.json();
        setAuthError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setAuthError('Failed to contact authentication service.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: regUsername,
          password: regPassword,
          email: regEmail,
          name: regName,
          discipline: regRole === 'athlete' ? regDiscipline : 'Coaching Elite',
          age: regAge,
          role: regRole
        })
      });
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setCurrentUser(data.user);
        setUserRole(data.user.role);
        setNotificationSuccess(`${data.user.role === 'coach' ? 'Coach' : 'Athlete'} registration completed. Welcome to Eldoret Academy!`);
        if (data.user.role === 'coach') {
          setActiveEsmsPageId('coach-dashboard');
        } else {
          setActiveEsmsPageId('athlete-dashboard');
        }
      } else {
        const data = await res.json();
        setAuthError(data.error || 'Registration failed');
      }
    } catch (err) {
      setAuthError('Failed to contact registration service.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {}
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUserRole('admin');
    setActiveEsmsPageId('overview');
    setNotificationSuccess('Logged out successfully.');
  };

  const fetchStadium = async () => {
    setIsStadiumLoading(true);
    try {
      const res = await fetch('/api/stadium');
      if (res.ok) {
        const data = await res.json();
        setStadiumData(data);
      }
    } catch (e) {
      console.warn('Could not query /api/stadium, using resilient cache.', e);
    } finally {
      setIsStadiumLoading(false);
    }
  };

  const fetchMilestones = async () => {
    setIsMilestonesLoading(true);
    try {
      const res = await fetch('/api/milestones');
      if (res.ok) {
        const data = await res.json();
        setMilestones(data);
      }
    } catch (e) {
      console.warn('Could not query /api/milestones, using resilient cache.', e);
    } finally {
      setIsMilestonesLoading(false);
    }
  };

  const fetchEvents = async () => {
    setIsRacesLoading(true);
    try {
      const res = await fetch('/api/events');
      if (res.ok) {
        const data = await res.json();
        setRaces(data.races);
        setCategories(data.ticketCategories);
        setMeetVenue(data.meetVenue);
        setNextScheduledMeet(data.nextScheduledMeet || 'Absa Kip Keino Classic World Tour Gold');
      }
    } catch (e) {
      console.warn('Could not query /api/events, using resilient cache.', e);
    } finally {
      setIsRacesLoading(false);
    }
  };

  // Simulate Track Race
  const handleSimulateRace = async (raceId: string) => {
    setIsSimulating(true);
    try {
      const res = await fetch('/api/events/simulate-race', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ raceId })
      });
      if (res.ok) {
        const updatedRace = await res.json();
        setRaces(prev => prev.map(r => r.id === raceId ? updatedRace : r));
      } else {
        simulateRaceLocal(raceId);
      }
    } catch (e) {
      console.warn('Simulation API failed, executing local script execution.', e);
      simulateRaceLocal(raceId);
    } finally {
      setIsSimulating(false);
    }
  };

  const simulateRaceLocal = (raceId: string) => {
    if (raceId === 'kk-2') {
      const finishedAthletes = [
        { lane: 1, name: 'Timothy Cheruiyot', country: 'KEN', time: '3:31.02', split400m: '55.4', split800m: '1:52.1', status: 'finished' as const, currentPosition: 1 },
        { lane: 2, name: 'Cole Hocker', country: 'USA', time: '3:31.40', split400m: '55.2', split800m: '1:52.3', status: 'finished' as const, currentPosition: 2 },
        { lane: 3, name: 'Yared Nuguse', country: 'USA', time: '3:31.95', split400m: '55.9', split800m: '1:52.0', status: 'finished' as const, currentPosition: 3 },
        { lane: 4, name: 'Reynold Cheruiyot', country: 'KEN', time: '3:32.10', split400m: '55.6', split800m: '1:52.5', status: 'finished' as const, currentPosition: 4 }
      ];
      setRaces(prev => prev.map(r => r.id === raceId ? { ...r, status: 'completed' as const, athletes: finishedAthletes } : r));
    }
  };

  // Reset Track Race Simulation
  const handleResetRace = async () => {
    try {
      const res = await fetch('/api/events/reset-race', { method: 'POST' });
      if (res.ok) {
        const resetRace = await res.json();
        setRaces(prev => prev.map(r => r.id === 'kk-2' ? resetRace : r));
      } else {
        resetRaceLocal();
      }
    } catch (e) {
      resetRaceLocal();
    }
  };

  const resetRaceLocal = () => {
    const freshAthletes = [
      { lane: 1, name: 'Timothy Cheruiyot', country: 'KEN', time: '--', status: 'running' as const },
      { lane: 2, name: 'Reynold Cheruiyot', country: 'KEN', time: '--', status: 'running' as const },
      { lane: 3, name: 'Cole Hocker', country: 'USA', time: '--', status: 'running' as const },
      { lane: 4, name: 'Yared Nuguse', country: 'USA', time: '--', status: 'running' as const }
    ];
    setRaces(prev => prev.map(r => r.id === 'kk-2' ? { ...r, status: 'scheduled' as const, athletes: freshAthletes } : r));
  };

  // Reserve ticket API call
  const handleReserveTicket = async (holderName: string, categoryId: string, quantity: number): Promise<TicketReservation> => {
    const res = await fetch('/api/tickets/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ holderName, categoryId, quantity })
    });
    if (res.ok) {
      return await res.json();
    } else {
      const errData = await res.json();
      throw new Error(errData.error || 'Failed to complete transaction.');
    }
  };

  // Send message to AI chatbot
  const handleSendChatMessage = async (messagesLog: ChatMessage[]): Promise<string> => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messagesLog })
    });
    if (res.ok) {
      const data = await res.json();
      return data.text;
    }
    throw new Error('Fallback trigger');
  };

  // Procedural Page submit handler (renders user action records in memory)
  const handleProceduralSubmit = (e: React.FormEvent, pageId: string) => {
    e.preventDefault();
    setNotificationSuccess(`Successfully updated records for page [${pageId}] in database esms_db.`);
    setTimeout(() => setNotificationSuccess(null), 4000);
  };

  const handleUpdateAthlete = (name: string, discipline: string) => {
    setCurrentUser((prev: any) => prev ? { ...prev, name, discipline } : { name, discipline });
    setNotificationSuccess('Athlete profile credentials successfully updated.');
    setTimeout(() => setNotificationSuccess(null), 4000);
  };

  const handleUpdateCoach = (name: string, bio: string) => {
    setCurrentUser((prev: any) => prev ? { ...prev, name, bio } : { name, bio });
    setNotificationSuccess('Coach profile credentials successfully updated.');
    setTimeout(() => setNotificationSuccess(null), 4000);
  };

  // Sidebar dynamic icons mapping
  const getSidebarIcon = (folder: string) => {
    switch (folder) {
      case 'dashboard': return <LayoutDashboard className="w-3.5 h-3.5" />;
      case 'staff': return <Users className="w-3.5 h-3.5" />;
      case 'athletes': return <Trophy className="w-3.5 h-3.5" />;
      case 'facilities': return <Landmark className="w-3.5 h-3.5" />;
      case 'events': return <Calendar className="w-3.5 h-3.5" />;
      case 'inventory': return <ShoppingBag className="w-3.5 h-3.5" />;
      case 'finance': return <DollarSign className="w-3.5 h-3.5" />;
      case 'admin': return <Settings className="w-3.5 h-3.5" />;
      default: return <Folder className="w-3.5 h-3.5" />;
    }
  };

  // Find the selected page in the hierarchy
  let currentSelectedPage: PageInfo | undefined;
  for (const group of MODULE_GROUPS) {
    const found = group.pages.find(p => p.id === activeEsmsPageId);
    if (found) {
      currentSelectedPage = found;
      break;
    }
  }

  // Session status load block
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#070708] flex flex-col items-center justify-center font-mono text-xs gap-4 text-neutral-400">
        <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="uppercase tracking-widest text-[10px]">Validating Secure Session...</span>
      </div>
    );
  }

  // Gate content completely until authenticated
  if (!isAuthenticated) {
    return (
      <LandingPage
        onLogin={handleLogin}
        onRegister={handleRegister}
        authError={authError}
        authMode={authMode}
        setAuthMode={setAuthMode}
        loginUsername={loginUsername}
        setLoginUsername={setLoginUsername}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        regUsername={regUsername}
        setRegUsername={setRegUsername}
        regPassword={regPassword}
        setRegPassword={setRegPassword}
        regEmail={regEmail}
        setRegEmail={setRegEmail}
        regName={regName}
        setRegName={setRegName}
        regDiscipline={regDiscipline}
        setRegDiscipline={setRegDiscipline}
        regAge={regAge}
        setRegAge={setRegAge}
        regRole={regRole}
        setRegRole={setRegRole}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-300 font-sans antialiased selection:bg-amber-500 selection:text-black" id="main-legacy-app">
      
      {/* Top Universal Navbar / Portal Toggle */}
      <nav className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-neutral-800 bg-[#070707] z-20 relative">
        <div className="flex items-center gap-4">
          <PremiumAthleticLogo className="w-9 h-9" />
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest text-white uppercase italic">KIPCHOGE KEINO <span className="text-amber-500">ELITE</span></span>
            <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-mono">Administrative & Legacy Workspace</span>
          </div>
        </div>

        {/* Portal switcher */}
        <div className="flex bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-[10px] font-mono font-bold uppercase tracking-wide">
          <button
            onClick={() => setPortalMode('memorial')}
            className={`px-3 py-1 rounded transition duration-150 flex items-center gap-1.5 ${portalMode === 'memorial' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'}`}
          >
            🌿 Memorial Portal
          </button>
          <button
            onClick={() => setPortalMode('esms')}
            className={`px-3 py-1 rounded transition duration-150 flex items-center gap-1.5 ${portalMode === 'esms' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'}`}
          >
            ⚙️ ESMS Control Panel
          </button>
        </div>

        {/* Technical Indicators & Secure Logout Session triggers */}
        <div className="hidden lg:flex items-center gap-4 text-[10px] font-mono">
          <div className="flex items-center gap-1 text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            MySQL Connected
          </div>
          <span className="text-neutral-600">|</span>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 font-bold">Active User: {currentUser?.username || 'User'}</span>
            <button
              onClick={async () => {
                await handleLogout();
                setIsAuthenticated(false);
                setCurrentUser(null);
                setNotificationSuccess('Successfully signed out of secure session.');
              }}
              className="px-2 py-1 bg-red-950/20 hover:bg-red-900/40 border border-red-500/20 text-red-400 rounded transition uppercase text-[9px] font-bold tracking-wider flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ======================================================== */}
      {/* PORTAL 1: MEMORIAL & LIVE TRACKER PORTAL                 */}
      {/* ======================================================== */}
      {portalMode === 'memorial' && (
        <>
          {/* Hero Display section using Sophisticated Dark editorial typography */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-neutral-900 pb-8">
              <div>
                <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block mb-2">// Historic Preservation Archive</span>
                <h1 className="text-4xl sm:text-7xl font-serif font-light text-white leading-none tracking-tight">
                  The Father of <br/>
                  <span className="italic font-normal text-amber-500">Kenyan Athletics</span>
                </h1>
                <p className="mt-6 text-neutral-400 max-w-xl text-sm leading-relaxed">
                  Architectural strategy for the preservation of Kipchoge Keino's historical achievements and real-time monitoring of Kenyan sporting infrastructure.
                </p>
              </div>

              {/* Core Web Vitals Status & Legacy Badges */}
              <div className="grid grid-cols-3 gap-4 max-w-sm w-full">
                <div className="bg-neutral-950 border border-neutral-900 px-4 py-3 rounded-xl flex items-center gap-2.5">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="block text-[9px] text-neutral-500 uppercase font-mono font-bold tracking-wider">Olympic Golds</span>
                    <span className="text-xs font-black text-white font-mono">1968 & 1972</span>
                  </div>
                </div>
                <div className="bg-neutral-950 border border-neutral-900 px-4 py-3 rounded-xl flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-amber-500" />
                  <div>
                    <span className="block text-[9px] text-neutral-500 uppercase font-mono font-bold tracking-wider">Honorary Medal</span>
                    <span className="text-xs font-black text-white font-mono">Laurel award</span>
                  </div>
                </div>
                <div className="bg-neutral-950 border border-neutral-900 px-4 py-3 rounded-xl flex items-center gap-2.5">
                  <Heart className="w-5 h-5 text-rose-400" />
                  <div>
                    <span className="block text-[9px] text-neutral-500 uppercase font-mono font-bold tracking-wider">Eldoret Hub</span>
                    <span className="text-xs font-black text-white font-mono">Children care</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN LAYOUT MATRICES */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
            
            {/* TAB CONTROLLERS FOR BENTO VIEW - STYLED SOPHISTICATED */}
            <div className="flex border-b border-neutral-900 mb-8 gap-6 justify-center sm:justify-start font-mono">
              <button
                onClick={() => setActiveDashboardTab('events')}
                className={`pb-3 px-1 font-semibold text-[11px] sm:text-xs flex items-center gap-2 uppercase tracking-widest border-b-2 transition duration-150 ${
                  activeDashboardTab === 'events'
                    ? 'border-amber-500 text-amber-500'
                    : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
                id="tab-btn-events"
              >
                <Activity className="w-4 h-4" />
                03 / Live Events Tracker
              </button>
              <button
                onClick={() => setActiveDashboardTab('timeline')}
                className={`pb-3 px-1 font-semibold text-[11px] sm:text-xs flex items-center gap-2 uppercase tracking-widest border-b-2 transition duration-150 ${
                  activeDashboardTab === 'timeline'
                    ? 'border-amber-500 text-amber-500'
                    : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
                id="tab-btn-timeline"
              >
                <Calendar className="w-4 h-4" />
                01 / Historical Milestones
              </button>
              <button
                onClick={() => setActiveDashboardTab('stadium')}
                className={`pb-3 px-1 font-semibold text-[11px] sm:text-xs flex items-center gap-2 uppercase tracking-widest border-b-2 transition duration-150 ${
                  activeDashboardTab === 'stadium'
                    ? 'border-amber-500 text-amber-500'
                    : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
                id="tab-btn-stadium"
              >
                <HardHat className="w-4 h-4" />
                02 / Stadium Upgrade
              </button>
            </div>

            {/* BENTO GRID MAIN SPLIT */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              
              {/* MIDDLE COLUMN: Primary Selected View */}
              <div className="xl:col-span-3 space-y-8">
                {activeDashboardTab === 'events' && (
                  <div className="space-y-4">
                    <LiveEventTracker
                      races={races}
                      categories={categories}
                      meetVenue={meetVenue}
                      nextScheduledMeet={nextScheduledMeet}
                      onSimulateRace={handleSimulateRace}
                      onResetRace={handleResetRace}
                      onReserveTicket={handleReserveTicket}
                      isSimulating={isSimulating}
                    />
                  </div>
                )}

                {activeDashboardTab === 'timeline' && (
                  <MilestoneTimeline 
                    milestones={milestones}
                    isLoading={isMilestonesLoading}
                  />
                )}

                {activeDashboardTab === 'stadium' && (
                  <div className="space-y-4">
                    <StadiumStatusCard 
                      data={stadiumData}
                      isLoading={isStadiumLoading}
                      onRefresh={fetchStadium}
                    />
                  </div>
                )}
              </div>

              {/* SIDE COLUMN: AI Assistant Widget & Performance Metrics from Sophisticated Dark design */}
              <div className="xl:col-span-1 flex flex-col gap-6">
                <HeritageGuide onSendMessage={handleSendChatMessage} />

                {/* Performance Metrics Block */}
                <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-5 shadow-2xl">
                  <div className="uppercase text-[10px] tracking-widest font-bold text-neutral-500 mb-4 font-mono">Core Web Vitals Status</div>
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="bg-neutral-900/40 border border-neutral-900 p-3 rounded-lg text-center">
                      <div className="text-[10px] text-neutral-500 mb-1 font-semibold font-mono">LCP</div>
                      <div className="text-sm font-mono text-emerald-400 font-bold">1.2s</div>
                    </div>
                    <div className="bg-neutral-900/40 border border-neutral-900 p-3 rounded-lg text-center">
                      <div className="text-[10px] text-neutral-500 mb-1 font-semibold font-mono">INP</div>
                      <div className="text-sm font-mono text-emerald-400 font-bold">48ms</div>
                    </div>
                    <div className="bg-neutral-900/40 border border-neutral-900 p-3 rounded-lg text-center">
                      <div className="text-[10px] text-neutral-500 mb-1 font-semibold font-mono">CLS</div>
                      <div className="text-sm font-mono text-emerald-400 font-bold">0.02</div>
                    </div>
                  </div>
                  
                  <div className="mt-5 flex flex-col gap-2 text-[10px] text-neutral-500 border-t border-neutral-900 pt-4 font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      Edge Cache: Stale-While-Revalidate Active
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Region: AF-NBO-1</span>
                      <span>SSL: TLS 1.3</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </main>
        </>
      )}

      {/* ======================================================== */}
      {/* PORTAL 2: 50-PAGE MASSIVE SPORTS MANAGEMENT SYSTEM (ESMS) */}
      {/* ======================================================== */}
      {portalMode === 'esms' && !isAuthenticated && (
        <div className="flex items-center justify-center min-h-[calc(100vh-69px)] bg-black p-4 relative overflow-y-auto" id="esms-auth-portal">
          <div className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative z-10 my-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-serif font-light text-white tracking-tight">Eldoret Sports Management</h2>
              <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest">
                {authMode === 'login' ? 'Board & Personnel Access' : 'Athlete Academy Registration'}
              </p>
            </div>

            {authError && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-mono text-center">
                {authError}
              </div>
            )}

            {authMode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5">Username</label>
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Enter assigned username"
                    className="w-full px-3.5 py-2.5 border border-neutral-800 bg-neutral-900 text-white rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 border border-neutral-800 bg-neutral-900 text-white rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase rounded-lg text-xs tracking-widest transition"
                >
                  Sign In to System
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5">Username</label>
                    <input
                      type="text"
                      required
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="e.g. faith_1500"
                      className="w-full px-3.5 py-2.5 border border-neutral-800 bg-neutral-900 text-white rounded-lg focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="e.g. faith@academy.org"
                      className="w-full px-3.5 py-2.5 border border-neutral-800 bg-neutral-900 text-white rounded-lg focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5">Password</label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 border border-neutral-800 bg-neutral-900 text-white rounded-lg focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5">Full Athlete Name</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Faith Kipyegon"
                      className="w-full px-3.5 py-2.5 border border-neutral-800 bg-neutral-900 text-white rounded-lg focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5">Discipline Specialty</label>
                    <select
                      value={regDiscipline}
                      onChange={(e) => setRegDiscipline(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-neutral-800 bg-neutral-900 text-neutral-300 rounded-lg focus:outline-none focus:border-amber-500"
                    >
                      <option value="1500m Gold Elite">1500m Gold Elite</option>
                      <option value="3000m Steeplechase">3000m Steeplechase</option>
                      <option value="Marathon Elite">Marathon Elite</option>
                      <option value="800m Elite">800m Elite</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1.5">Age</label>
                    <input
                      type="number"
                      required
                      min={15}
                      max={60}
                      value={regAge}
                      onChange={(e) => setRegAge(parseInt(e.target.value, 10) || 22)}
                      className="w-full px-3.5 py-2.5 border border-neutral-800 bg-neutral-900 text-white rounded-lg focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase rounded-lg text-xs tracking-widest transition"
                >
                  Submit Registration
                </button>
              </form>
            )}

            {/* QUICK SANDBOX DEV LOGINS */}
            <div className="border-t border-neutral-900 pt-4 space-y-3">
              <span className="block text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest text-center">
                Quick Dev Sandbox Login Credentials
              </span>
              <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
                <button
                  type="button"
                  onClick={() => {
                    setLoginUsername('admin');
                    setLoginPassword('Kipkoech');
                    setAuthMode('login');
                  }}
                  className="p-2 border border-neutral-850 bg-neutral-900/40 hover:bg-neutral-900 hover:border-neutral-750 text-left rounded-lg text-neutral-400 hover:text-white transition"
                >
                  <strong className="text-amber-500 block">System Admin</strong>
                  username: admin / Kipkoech
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginUsername('kipkoech_staff');
                    setLoginPassword('staff123');
                    setAuthMode('login');
                  }}
                  className="p-2 border border-neutral-850 bg-neutral-900/40 hover:bg-neutral-900 hover:border-neutral-750 text-left rounded-lg text-neutral-400 hover:text-white transition"
                >
                  <strong className="text-amber-500 block">Staff Operator</strong>
                  username: kipkoech_staff / staff123
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginUsername('coach_paul');
                    setLoginPassword('coach123');
                    setAuthMode('login');
                  }}
                  className="p-2 border border-neutral-850 bg-neutral-900/40 hover:bg-neutral-900 hover:border-neutral-750 text-left rounded-lg text-neutral-400 hover:text-white transition"
                >
                  <strong className="text-amber-500 block">Academy Coach</strong>
                  username: coach_paul / coach123
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginUsername('athlete_kemboi');
                    setLoginPassword('athlete123');
                    setAuthMode('login');
                  }}
                  className="p-2 border border-neutral-850 bg-neutral-900/40 hover:bg-neutral-900 hover:border-neutral-750 text-left rounded-lg text-neutral-400 hover:text-white transition"
                >
                  <strong className="text-amber-500 block">Elite Athlete</strong>
                  username: athlete_kemboi / athlete123
                </button>
              </div>
            </div>

            <div className="text-center pt-2">
              {authMode === 'login' ? (
                <p className="text-[10px] text-neutral-500 font-mono">
                  Are you an Athlete?{' '}
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setAuthError(null);
                    }}
                    className="text-amber-500 underline uppercase tracking-wider font-bold animate-pulse"
                  >
                    Self-Register On Web
                  </button>
                </p>
              ) : (
                <p className="text-[10px] text-neutral-500 font-mono">
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setAuthError(null);
                    }}
                    className="text-amber-500 underline uppercase tracking-wider font-bold"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {portalMode === 'esms' && isAuthenticated && (
        <div className="flex h-[calc(100vh-69px)] overflow-hidden" id="esms-dashboard-workspace">
          
          {/* ESMS SIDEBAR */}
          <aside className="w-72 bg-[#090909] border-r border-neutral-800 flex flex-col justify-between shrink-0 h-full overflow-y-auto">
            <div className="p-4 space-y-4">
              
              {/* Operator Credentials Info */}
              <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-lg">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-amber-500 text-black font-extrabold flex items-center justify-center text-xs uppercase shrink-0">
                    {currentUser?.username ? currentUser.username.substring(0, 2).toUpperCase() : 'KK'}
                  </div>
                  <div className="truncate">
                    <span className="block text-xs font-bold text-white font-mono truncate">{currentUser?.name || currentUser?.username || 'Kipkoech Kiprop'}</span>
                    <span className="text-[9px] text-amber-500 font-mono tracking-wider uppercase block truncate">{currentUser?.role || 'admin'} Portal</span>
                  </div>
                </div>

                {/* Role Switcher to simulate various administrative viewpoints */}
                <div className="mt-3 pt-2.5 border-t border-neutral-900">
                  <label className="block text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1 font-mono">Simulate Sandbox View</label>
                  <select
                    value={userRole}
                    onChange={(e) => {
                      setUserRole(e.target.value as any);
                      // Setup first page of the role
                      if (e.target.value === 'athlete') {
                        setActiveEsmsPageId('athlete-directory');
                      } else {
                        setActiveEsmsPageId('overview');
                      }
                    }}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-[9px] font-mono text-neutral-300 focus:outline-none"
                  >
                    <option value="admin">System Admin</option>
                    <option value="staff">Staff Operator</option>
                    <option value="coach">Academy Coach</option>
                    <option value="athlete">Athlete Account</option>
                  </select>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full mt-3 py-1.5 bg-red-950/20 hover:bg-red-950/50 border border-red-900/30 text-red-400 rounded text-[9px] font-mono flex items-center justify-center gap-1.5 transition"
                >
                  <LogOut className="w-3 h-3" />
                  SIGN OUT SESSION
                </button>
              </div>

              {/* Sidebar Search over all 50 Pages */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search 45 packaged modules..."
                  value={esmsSidebarSearch}
                  onChange={(e) => setEsmsSidebarSearch(e.target.value)}
                  className="w-full pl-8 pr-2 py-1 bg-neutral-950 border border-neutral-800 text-[10px] font-mono text-white placeholder-neutral-600 rounded focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Collapsible Nav Directories representing the physical pages */}
              <div className="space-y-4 pt-2">
                {MODULE_GROUPS.map((group) => {
                  // Filter pages inside the folder based on the sidebar search
                  const matchedPages = group.pages.filter(p => 
                    p.name.toLowerCase().includes(esmsSidebarSearch.toLowerCase()) ||
                    p.description.toLowerCase().includes(esmsSidebarSearch.toLowerCase()) ||
                    p.id.toLowerCase().includes(esmsSidebarSearch.toLowerCase())
                  );

                  if (matchedPages.length === 0) return null;

                  return (
                    <div key={group.folder} className="space-y-1">
                      <span className="block text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest px-1">
                        {group.name}
                      </span>
                      <div className="space-y-0.5">
                        {matchedPages.map((page) => {
                          const isActive = activeEsmsPageId === page.id;
                          return (
                            <button
                              key={page.id}
                              onClick={() => {
                                setActiveEsmsPageId(page.id);
                                setProceduralFormInputs({});
                              }}
                              className={`w-full text-left px-2 py-1.5 rounded text-[11px] font-mono flex items-center justify-between transition duration-150 ${
                                isActive 
                                  ? 'bg-amber-500/10 border border-amber-500/30 text-amber-500 font-bold' 
                                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
                              }`}
                              id={`sidebar-link-${page.id}`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                {getSidebarIcon(page.folder)}
                                <span className="truncate">{page.name}</span>
                              </div>
                              <ChevronRight className={`w-3 h-3 text-neutral-600 shrink-0 ${isActive ? 'text-amber-500' : ''}`} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Bottom System Logs Status */}
            <div className="p-4 border-t border-neutral-900 bg-neutral-950 font-mono text-[9px] text-neutral-500 space-y-1">
              <div className="flex justify-between">
                <span>MySQL DB Host:</span>
                <span className="text-neutral-300">localhost</span>
              </div>
              <div className="flex justify-between">
                <span>Admin User:</span>
                <span className="text-amber-500 font-bold">Kipkoech</span>
              </div>
              <div className="flex justify-between">
                <span>API Status:</span>
                <span className="text-emerald-400">Stable Pool</span>
              </div>
            </div>
          </aside>

          {/* ESMS WORKSPACE STAGE */}
          <main className="flex-1 bg-[#0D0D0D] p-6 sm:p-8 overflow-y-auto h-full flex flex-col">
            
            {/* Top Horizontally Scrollable Navigation Tab Bar for Role */}
            <div className="w-full border-b border-neutral-850 pb-4 mb-6 shrink-0">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block">Logged in Workspace:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <h1 className="text-xl font-serif font-light text-white leading-none">
                      {userRole === 'admin' ? 'Root Admin Console' : 
                       userRole === 'staff' ? 'Staff Control Deck' : 
                       userRole === 'coach' ? 'Academy Coach Dashboard' : 'Athlete Academy Portal'}
                    </h1>
                    <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[8px] font-mono uppercase rounded">
                      {userRole}
                    </span>
                  </div>
                </div>
                <div className="text-right text-[10px] font-mono text-neutral-500 hidden sm:block">
                  <span>Session: 24h (1 Day) Active</span>
                </div>
              </div>

              {/* HORIZONTAL SCROLLABLE BAR */}
              <div 
                className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scroll-smooth py-1 border-t border-neutral-900 pt-3" 
                id="role-tab-bar"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {ROLE_TABS[userRole]?.map((tab) => {
                  const isTabActive = activeEsmsPageId === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveEsmsPageId(tab.id);
                        setProceduralFormInputs({});
                      }}
                      className={`px-3 py-1.5 border rounded-full text-[11px] font-mono transition duration-150 flex items-center gap-1.5 select-none shrink-0 ${
                        isTabActive
                          ? 'bg-amber-500/10 border-amber-500 text-amber-500 font-bold'
                          : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                      }`}
                    >
                      {getRoleTabIcon(tab.icon)}
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-neutral-500 font-mono mt-2 italic">
                Active tab description: {ROLE_TABS[userRole]?.find(t => t.id === activeEsmsPageId)?.description || ''}
              </p>
            </div>

            {/* Success banner notifications */}
            {notificationSuccess && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-mono flex items-center gap-2 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                <span>{notificationSuccess}</span>
              </div>
            )}

            {/* ==================== PAGE DISPATCHER ==================== */}
            
            {/* 1. Core Page - Overview (Mapped to page ID: overview) */}
            {activeEsmsPageId === 'overview' && (
              <Overview stats={{
                totalAthletes: 142,
                activeStaff: 38,
                stadiumCompletion: 85,
                revenueKES: 17350000,
                dbStatus: `Connected (MySQL: ${userRole === 'admin' ? 'Kipkoech' : 'Staff'})`
              }} />
            )}

            {/* 2. Core Page - Staff List (Mapped to page ID: staff-directory) */}
            {activeEsmsPageId === 'staff-directory' && (
              <StaffList onAddStaff={async (newStaff) => {
                if (userRole !== 'admin') {
                  alert('Permission Denied: Only Administrator sessions can onboarding new staff personnel!');
                  return;
                }
                try {
                  const generatedPassword = 'Staff' + Math.floor(100 + Math.random() * 900);
                  const generatedUsername = newStaff.name.toLowerCase().replace(/\s+/g, '_') + '_' + Math.floor(10 + Math.random() * 90);
                  const generatedEmail = newStaff.name.toLowerCase().replace(/\s+/g, '') + '@eldoretstadium.go.ke';
                  
                  const res = await fetch('/api/admin/create-staff', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      username: generatedUsername,
                      password: generatedPassword,
                      email: generatedEmail,
                      name: newStaff.name,
                      role: newStaff.role,
                      department: newStaff.department,
                      salary: newStaff.salary,
                      shift: newStaff.shift
                    })
                  });
                  if (res.ok) {
                    setNotificationSuccess(`Staff registered securely in MySQL! Generated login: username="${generatedUsername}" password="${generatedPassword}"`);
                  } else {
                    const data = await res.json();
                    alert(`Failed to register staff: ${data.error}`);
                  }
                } catch (err) {
                  alert('Error contacting administrative backend endpoint.');
                }
              }} />
            )}

            {/* 3. Core Page - Athlete Directory (Mapped to page ID: athlete-directory) */}
            {activeEsmsPageId === 'athlete-directory' && (
              <AthleteProfile />
            )}

            {/* 4. Core Page - Schedules (Mapped to page ID: facility-booking) */}
            {activeEsmsPageId === 'facility-booking' && (
              <Schedules />
            )}

            {/* 5. Core Page - Database Admin (Mapped to page ID: database-admin) */}
            {activeEsmsPageId === 'database-admin' && (
              <DatabaseManager />
            )}

            {/* 5e. Admin Page - Audit Logs */}
            {activeEsmsPageId === 'audit-logs' && (
              <AuditLogs />
            )}

            {/* Admin Custom Pages */}
            {activeEsmsPageId === 'admin-dashboard' && (
              <AdminDashboard />
            )}

            {activeEsmsPageId === 'admin-message' && (
              <AdminMessage />
            )}

            {activeEsmsPageId === 'admin-broadcast' && (
              <AdminBroadcast onAddNotification={(msg, level) => {
                setNotificationSuccess(`[Broadcast System] ${level.toUpperCase()}: ${msg}`);
                setTimeout(() => setNotificationSuccess(null), 5000);
              }} />
            )}

            {activeEsmsPageId === 'admin-settings' && (
              <AdminSettings />
            )}

            {/* Athlete Custom Pages */}
            {activeEsmsPageId === 'athlete-dashboard' && (
              <AthleteDashboard 
                athleteName={currentUser?.name || "Faith Kipyegon"} 
                discipline={currentUser?.discipline || "1500m Gold Elite"} 
              />
            )}

            {activeEsmsPageId === 'athlete-support' && (
              <AthleteSupport />
            )}

            {activeEsmsPageId === 'athlete-notification' && (
              <AthleteNotification />
            )}

            {activeEsmsPageId === 'athlete-settings' && (
              <AthleteSettings 
                athleteName={currentUser?.name || "Faith Kipyegon"} 
                discipline={currentUser?.discipline || "1500m Gold Elite"} 
                onUpdateAthlete={handleUpdateAthlete} 
              />
            )}

            {/* Staff Custom Pages */}
            {activeEsmsPageId === 'staff-dashboard' && (
              <StaffDashboard />
            )}

            {activeEsmsPageId === 'staff-support' && (
              <StaffSupport />
            )}

            {activeEsmsPageId === 'staff-notification' && (
              <StaffNotification />
            )}

            {activeEsmsPageId === 'staff-settings' && (
              <StaffSettings />
            )}

            {/* Coach Custom Pages */}
            {activeEsmsPageId === 'coach-dashboard' && (
              <CoachDashboard coachName={currentUser?.name || "Paul Ereng"} />
            )}

            {activeEsmsPageId === 'coach-support' && (
              <CoachSupport />
            )}

            {activeEsmsPageId === 'coach-notification' && (
              <CoachNotification />
            )}

            {activeEsmsPageId === 'coach-settings' && (
              <CoachSettings 
                coachName={currentUser?.name || "Paul Ereng"} 
                onUpdateCoach={handleUpdateCoach} 
              />
            )}

            {/* Custom Support Page */}
            {activeEsmsPageId === 'support' && (
              <div className="space-y-6" id="custom-support-page">
                <div className="border-b border-neutral-850 pb-4">
                  <h2 className="text-2xl font-serif font-light text-white tracking-tight">Technical Helpdesk & Support</h2>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">Submit high-altitude stadium diagnostic requests or open staff/athlete tickets</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-4">Open Support Tickets</h3>
                      <div className="space-y-3">
                        {supportTickets.map((t) => (
                          <div key={t.id} className="p-4 bg-neutral-900/30 border border-neutral-800/80 rounded-lg flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">{t.subject}</span>
                                <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                                  t.urgency === 'high' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-neutral-800 text-neutral-400'
                                }`}>{t.urgency} priority</span>
                              </div>
                              <p className="text-xs text-neutral-400 mt-1">{t.description}</p>
                              <span className="block text-[9px] text-neutral-500 font-mono mt-2">Opened on {t.date}</span>
                            </div>
                            <span className={`text-[10px] font-mono uppercase font-bold ${
                              t.status === 'Resolved' ? 'text-emerald-400' : 'text-amber-500'
                            }`}>{t.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">Lodge New Ticket</h3>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!newTicketSubject || !newTicketDesc) return;
                        setSupportTickets([
                          { id: Date.now(), subject: newTicketSubject, description: newTicketDesc, urgency: newTicketUrgency, status: 'Pending Review', date: new Date().toISOString().split('T')[0] },
                          ...supportTickets
                        ]);
                        setNewTicketSubject('');
                        setNewTicketDesc('');
                        setNotificationSuccess('Support ticket submitted successfully!');
                      }} className="space-y-3 font-mono text-xs">
                        <div>
                          <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1">Subject</label>
                          <input
                            type="text"
                            required
                            value={newTicketSubject}
                            onChange={(e) => setNewTicketSubject(e.target.value)}
                            placeholder="e.g. Lane 4 Tartan unevenness"
                            className="w-full px-2.5 py-1.5 border border-neutral-800 bg-neutral-900 text-white rounded focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1">Problem Description</label>
                          <textarea
                            required
                            value={newTicketDesc}
                            onChange={(e) => setNewTicketDesc(e.target.value)}
                            placeholder="Describe your issue or technical inquiry..."
                            className="w-full h-24 px-2.5 py-1.5 border border-neutral-800 bg-neutral-900 text-white rounded focus:outline-none resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1">Urgency</label>
                          <select
                            value={newTicketUrgency}
                            onChange={(e) => setNewTicketUrgency(e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-neutral-800 bg-neutral-900 text-neutral-300 rounded focus:outline-none"
                          >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                          </select>
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded text-[10px] tracking-widest transition"
                        >
                          Submit Ticket
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Custom Notifications Page */}
            {activeEsmsPageId === 'notifications' && (
              <div className="space-y-6" id="custom-notifications-page">
                <div className="border-b border-neutral-850 pb-4">
                  <h2 className="text-2xl font-serif font-light text-white tracking-tight">System Notifications & Alerts</h2>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">Real-time alerts, weather indexes, schedule changes, and security clearance updates</p>
                </div>

                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-4 border-b border-neutral-900 pb-3">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">All System Alerts ({systemNotifications.length})</h3>
                    <button
                      onClick={() => {
                        setSystemNotifications([]);
                        setNotificationSuccess('Cleared all system notifications.');
                      }}
                      className="text-[9px] text-neutral-500 hover:text-white font-mono uppercase transition"
                    >
                      Clear All Alerts
                    </button>
                  </div>

                  {systemNotifications.length === 0 ? (
                    <div className="p-8 text-center border border-dashed border-neutral-900 rounded-lg">
                      <span className="block text-xs font-mono text-neutral-600">No active alerts. System status stable.</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {systemNotifications.map((n) => (
                        <div key={n.id} className="p-4 bg-neutral-900/20 border border-neutral-800/60 rounded-lg flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className={`w-2 h-2 rounded-full ${
                              n.level === 'critical' ? 'bg-red-500 animate-pulse' :
                              n.level === 'warning' ? 'bg-amber-500' :
                              n.level === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                            }`} />
                            <div>
                              <span className="block text-xs text-neutral-200">{n.msg}</span>
                              <span className="block text-[9px] text-neutral-500 font-mono mt-0.5">{n.time}</span>
                            </div>
                          </div>
                          <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 border rounded ${
                            n.level === 'critical' ? 'text-red-400 border-red-500/20 bg-red-500/5' :
                            n.level === 'warning' ? 'text-amber-400 border-amber-500/20 bg-amber-500/5' :
                            n.level === 'success' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' :
                            'text-blue-400 border-blue-500/20 bg-blue-500/5'
                          }`}>{n.level}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Custom Staff Tasks Page */}
            {activeEsmsPageId === 'staff-tasks' && (
              <div className="space-y-6" id="custom-staff-tasks-page">
                <div className="border-b border-neutral-850 pb-4">
                  <h2 className="text-2xl font-serif font-light text-white tracking-tight">Staff Operations Task List</h2>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">Assigned operational tasks, ground inspections, and safety checks</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-4">Current Tasks</h3>
                      <div className="space-y-3">
                        {staffTasks.map((t) => (
                          <div key={t.id} className="p-4 bg-neutral-900/30 border border-neutral-800 rounded-lg flex justify-between items-center">
                            <div>
                              <span className={`block text-xs font-bold ${t.status === 'completed' ? 'line-through text-neutral-500' : 'text-white'}`}>{t.title}</span>
                              <p className="text-xs text-neutral-400 mt-1">{t.description}</p>
                              <span className="block text-[9px] text-neutral-500 font-mono mt-1">Assigned To: <strong className="text-amber-500">{t.assignedTo}</strong></span>
                            </div>
                            <button
                              onClick={() => {
                                setStaffTasks(prev => prev.map(tk => {
                                  if (tk.id === t.id) {
                                    return { ...tk, status: tk.status === 'completed' ? 'pending' : 'completed' };
                                  }
                                  return tk;
                                }));
                                setNotificationSuccess('Task completion status updated.');
                              }}
                              className={`px-3 py-1 font-mono text-[9px] uppercase border rounded transition ${
                                t.status === 'completed'
                                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-bold'
                                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                              }`}
                            >
                              {t.status === 'completed' ? '✓ Completed' : 'Mark Done'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">Assign New Task</h3>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!newStaffTaskTitle || !newStaffTaskDesc) return;
                        setStaffTasks([
                          ...staffTasks,
                          { id: Date.now(), title: newStaffTaskTitle, description: newStaffTaskDesc, assignedTo: newStaffTaskAssignee, status: 'pending' }
                        ]);
                        setNewStaffTaskTitle('');
                        setNewStaffTaskDesc('');
                        setNotificationSuccess('New operations task assigned successfully!');
                      }} className="space-y-3 font-mono text-xs">
                        <div>
                          <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1">Task Title</label>
                          <input
                            type="text"
                            required
                            value={newStaffTaskTitle}
                            onChange={(e) => setNewStaffTaskTitle(e.target.value)}
                            placeholder="e.g. Inspect lane markers"
                            className="w-full px-2.5 py-1.5 border border-neutral-800 bg-neutral-900 text-white rounded focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1">Task Description</label>
                          <textarea
                            required
                            value={newStaffTaskDesc}
                            onChange={(e) => setNewStaffTaskDesc(e.target.value)}
                            placeholder="Detail the operational tasks or safety logs requested..."
                            className="w-full h-24 px-2.5 py-1.5 border border-neutral-800 bg-neutral-900 text-white rounded focus:outline-none resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1">Assignee</label>
                          <select
                            value={newStaffTaskAssignee}
                            onChange={(e) => setNewStaffTaskAssignee(e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-neutral-800 bg-neutral-900 text-neutral-300 rounded focus:outline-none"
                          >
                            <option value="Julius Keter">Julius Keter (Groundkeeper)</option>
                            <option value="Sarah Jemutai">Sarah Jemutai (Coordinator)</option>
                            <option value="Peter Rono">Peter Rono (Coach)</option>
                            <option value="Mercy Chelimo">Mercy Chelimo (Finance)</option>
                          </select>
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded text-[10px] tracking-widest transition"
                        >
                          Assign Task
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. Generative fallback render for the rest of the packaged sub-pages */}
            {activeEsmsPageId !== 'overview' &&
             activeEsmsPageId !== 'staff-directory' &&
             activeEsmsPageId !== 'athlete-directory' &&
             activeEsmsPageId !== 'facility-booking' &&
             activeEsmsPageId !== 'database-admin' &&
             activeEsmsPageId !== 'email-verification' &&
             activeEsmsPageId !== 'email-confirmation' &&
             activeEsmsPageId !== 'admin-users' &&
             activeEsmsPageId !== 'audit-logs' &&
             activeEsmsPageId !== 'system-settings' &&
             activeEsmsPageId !== 'support' &&
             activeEsmsPageId !== 'notifications' &&
             activeEsmsPageId !== 'staff-tasks' && (
              <div className="space-y-6">
                
                {/* Headers */}
                {currentSelectedPage && (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-amber-500 uppercase tracking-widest">
                          <span>{currentSelectedPage.folder}</span>
                          <span>/</span>
                          <span>{currentSelectedPage.subfolder}</span>
                        </div>
                        <h2 className="text-2xl font-serif font-light text-white tracking-tight mt-1">{currentSelectedPage.name}</h2>
                        <p className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-xl">{currentSelectedPage.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded text-neutral-400">
                        <span>Table Location:</span>
                        <span className="text-white font-bold">{`esms_db.${currentSelectedPage.id.replace('-', '_')}`}</span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {currentSelectedPage.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="bg-neutral-900/30 border border-neutral-800/80 p-4 rounded-xl">
                          <span className="block text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-wider">{stat.label}</span>
                          <span className="block text-xl font-serif text-white mt-1.5">{stat.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Dynamic Interactive Components */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Left: Table details or database lists */}
                      <div className="lg:col-span-2 space-y-4">
                        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
                            <Database className="w-4 h-4 text-amber-500" />
                            Relational SQL View Log
                          </h3>
                          <div className="overflow-x-auto text-xs">
                            <table className="w-full text-left">
                              <thead>
                                <tr className="border-b border-neutral-850 text-neutral-500 font-mono text-[10px] uppercase">
                                  {currentSelectedPage.tableHeaders ? (
                                    currentSelectedPage.tableHeaders.map((h, hIdx) => (
                                      <th key={hIdx} className="pb-2.5 px-2">{h}</th>
                                    ))
                                  ) : (
                                    <>
                                      <th className="pb-2.5 px-2">Record ID</th>
                                      <th className="pb-2.5 px-2">Data Registry Description</th>
                                      <th className="pb-2.5 px-2">Classification</th>
                                      <th className="pb-2.5 px-2 text-right">Metric Status</th>
                                    </>
                                  )}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                                {currentSelectedPage.tableRows ? (
                                  currentSelectedPage.tableRows.map((row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-neutral-900/20 transition">
                                      {row.map((cell, cIdx) => (
                                        <td key={cIdx} className="py-2.5 px-2">{cell}</td>
                                      ))}
                                    </tr>
                                  ))
                                ) : (
                                  <>
                                    <tr className="hover:bg-neutral-900/20 transition">
                                      <td className="py-2.5 px-2 font-mono text-neutral-500">#ES-9901</td>
                                      <td className="py-2.5 px-2 font-bold">{currentSelectedPage.name} Primary Register</td>
                                      <td className="py-2.5 px-2 text-neutral-400 font-mono text-[10px]">Operational</td>
                                      <td className="py-2.5 px-2 text-right text-emerald-400 font-mono font-bold">Stable</td>
                                    </tr>
                                    <tr className="hover:bg-neutral-900/20 transition">
                                      <td className="py-2.5 px-2 font-mono text-neutral-500">#ES-9902</td>
                                      <td className="py-2.5 px-2 font-bold">Kipkoech Audit Log Link</td>
                                      <td className="py-2.5 px-2 text-neutral-400 font-mono text-[10px]">Compliance</td>
                                      <td className="py-2.5 px-2 text-right text-emerald-400 font-mono font-bold">100% Active</td>
                                    </tr>
                                  </>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* Right: Quick Update Action Fields */}
                      <div className="space-y-4">
                        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">Database Dispatch Dispatcher</h3>
                          <form onSubmit={(e) => handleProceduralSubmit(e, activeEsmsPageId)} className="space-y-3 font-mono text-xs">
                            {currentSelectedPage.formFields ? (
                              currentSelectedPage.formFields.map((field, fIdx) => (
                                <div key={fIdx}>
                                  <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1">{field.label}</label>
                                  <input
                                    type={field.type}
                                    required
                                    placeholder={field.placeholder}
                                    className="w-full px-2.5 py-1.5 border border-neutral-800 bg-neutral-900 text-white rounded focus:outline-none"
                                  />
                                </div>
                              ))
                            ) : (
                              <>
                                <div>
                                  <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1">Update Parameter Name</label>
                                  <input
                                    type="text"
                                    required
                                    placeholder="e.g. Allocation Ceiling Level"
                                    className="w-full px-2.5 py-1.5 border border-neutral-800 bg-neutral-900 text-white rounded focus:outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-neutral-500 text-[10px] uppercase font-bold mb-1">Numeric Metric Value</label>
                                  <input
                                    type="text"
                                    required
                                    placeholder="e.g. 1500000"
                                    className="w-full px-2.5 py-1.5 border border-neutral-800 bg-neutral-900 text-white rounded focus:outline-none"
                                  />
                                </div>
                              </>
                            )}
                            <button
                              type="submit"
                              className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-bold uppercase rounded text-[10px] tracking-widest transition"
                            >
                              Dispatch SQL Update
                            </button>
                          </form>
                        </div>
                      </div>

                    </div>
                  </>
                )}

              </div>
            )}

          </main>
        </div>
      )}

      {/* BOTTOM UNIVERSAL DATA STRIP */}
      <div className="h-12 bg-[#070707] border-t border-neutral-850 flex flex-col sm:flex-row items-center px-4 sm:px-8 justify-between gap-1 text-[9px] text-neutral-500 font-mono relative z-10">
        <div className="flex gap-6 items-center">
          <div className="flex gap-1.5 items-center">
            <span className="font-bold text-neutral-600">DATABASE PLATFORM:</span>
            <span className="text-neutral-400 tracking-wide uppercase">MySQL (mysql2 connection)</span>
          </div>
          <div className="flex gap-1.5 items-center">
            <span className="font-bold text-neutral-600">ROOT CREDENTIAL:</span>
            <span className="text-amber-500 font-bold tracking-wide uppercase">Admin / Kipkoech</span>
          </div>
        </div>
        <div className="text-neutral-500 italic text-center sm:text-right">
          "The record is not mine, it is Kenya's." — Kipchoge Keino
        </div>
      </div>

    </div>
  );
}

