/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import { query, getDatabaseStatus } from './db';
import cors from 'cors';
import session from 'express-session';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = 3000;

// Enable CORS with Credentials (for secure cookie session tracking)
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Set up express session with 1 day duration (86,400,000 milliseconds)
app.use(session({
  secret: 'Kipkoech-Elite-Stadium-Key-2026',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // Exactly 1 Day session duration
    secure: false, // Set to false to support easy localhost & preview iFrame cookies
    sameSite: 'lax'
  }
}));

// Helper function to query a user from database by username (MySQL / memory fallback)
async function findUserByUsername(username: string): Promise<any> {
  const dbStatus = await getDatabaseStatus();
  if (dbStatus.connected) {
    try {
      const rows: any = await query('SELECT * FROM users WHERE username = ?', [username]);
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error('Error querying user by username from MySQL:', err);
      return null;
    }
  } else {
    const { memoryDb } = await import('./db');
    const user = memoryDb.users.find((u: any) => u.username.toLowerCase() === username.toLowerCase());
    return user || null;
  }
}

// Helper function to query a user from database by email (MySQL / memory fallback)
async function findUserByEmail(email: string): Promise<any> {
  const dbStatus = await getDatabaseStatus();
  if (dbStatus.connected) {
    try {
      const rows: any = await query('SELECT * FROM users WHERE email = ?', [email]);
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error('Error querying user by email from MySQL:', err);
      return null;
    }
  } else {
    const { memoryDb } = await import('./db');
    const user = memoryDb.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
    return user || null;
  }
}

// ----------------- Real-time Session & Authentication APIs -----------------

// Fetch active session info
app.get('/api/auth/me', (req, res) => {
  if ((req.session as any).user) {
    return res.json({ authenticated: true, user: (req.session as any).user });
  }
  return res.json({ authenticated: false });
});

// Secure Password Sign-In (using Bcrypt)
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password fields' });
  }

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Verify hashed password using bcrypt
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Bind authenticated user details to session
    const sessionUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    (req.session as any).user = sessionUser;

    return res.json({ success: true, message: 'Login successful', user: sessionUser });
  } catch (err: any) {
    return res.status(500).json({ error: 'Authentication internal error: ' + err.message });
  }
});

// Secure Athlete or Coach Registration/Sign-Up on the Web
app.post('/api/auth/register', async (req, res) => {
  const { username, password, email, name, discipline, age, role } = req.body;
  
  // Resolve role (default to athlete if not specified)
  const resolvedRole = (role === 'coach') ? 'coach' : 'athlete';

  if (!username || !password || !email || !name) {
    return res.status(400).json({ error: 'Please fill in all requested fields for registration.' });
  }

  try {
    // 1. Check if username or email is already registered
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ error: 'Email address is already registered' });
    }

    // 2. Hash the password with bcrypt
    const passwordHash = bcrypt.hashSync(password, 10);

    // 3. Persist user record and optionally athlete records
    const dbStatus = await getDatabaseStatus();
    let registeredUser;

    if (dbStatus.connected) {
      const userRes: any = await query(
        'INSERT INTO users (username, password, email, role, status) VALUES (?, ?, ?, ?, "active")',
        [username, passwordHash, email, resolvedRole]
      );
      const insertedUserId = userRes.insertId || userRes.affectedRows; // Support both format types
      
      if (resolvedRole === 'athlete') {
        await query(
          'INSERT INTO athletes (name, discipline, age, coach_id, status, medical_clearance, joined_date) VALUES (?, ?, ?, 3, "active", 1, ?)',
          [name, discipline || '800m Sprint Standard', age || 22, new Date().toISOString().split('T')[0]]
        );
      }
      registeredUser = { id: insertedUserId, username, email, role: resolvedRole };
    } else {
      const { memoryDb } = await import('./db');
      const insertedUserId = memoryDb.users.length + 1;
      memoryDb.users.push({
        id: insertedUserId,
        username,
        password: passwordHash,
        email,
        role: resolvedRole,
        status: 'active',
        created_at: new Date().toISOString()
      });
      
      if (resolvedRole === 'athlete') {
        memoryDb.athletes.push({
          id: memoryDb.athletes.length + 1,
          name,
          discipline: discipline || '800m Sprint Standard',
          age: parseInt(age, 10) || 22,
          coach_id: 3,
          status: 'active',
          medical_clearance: 1,
          joined_date: new Date().toISOString().split('T')[0]
        });
      }
      registeredUser = { id: insertedUserId, username, email, role: resolvedRole };
    }

    // Log the registrant automatically in
    (req.session as any).user = registeredUser;
    return res.json({ success: true, message: `${resolvedRole === 'coach' ? 'Coach' : 'Athlete'} registration completed successfully!`, user: registeredUser });
  } catch (err: any) {
    return res.status(500).json({ error: 'Registration failed: ' + err.message });
  }
});

// Admin-Restricted Staff User Creation (Onboarding via Admin interface)
app.post('/api/admin/create-staff', async (req, res) => {
  const currentUser = (req.session as any).user;
  // Strictly enforce admin authorization
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin access required to onboard personnel.' });
  }

  const { username, password, email, name, role, department, salary, shift } = req.body;
  if (!username || !password || !email || !name || !role || !department || !salary || !shift) {
    return res.status(400).json({ error: 'All fields are required to onboard new personnel.' });
  }

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already registered.' });
    }

    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ error: 'Email address is already registered.' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const dbStatus = await getDatabaseStatus();
    let newStaffId;

    if (dbStatus.connected) {
      const userRes: any = await query(
        'INSERT INTO users (username, password, email, role, status) VALUES (?, ?, ?, "staff", "active")',
        [username, passwordHash, email]
      );
      const insertedUserId = userRes.insertId || userRes.affectedRows;
      
      await query(
        'INSERT INTO staff (user_id, name, role, department, salary, shift, status, hire_date) VALUES (?, ?, ?, ?, ?, ?, "active", ?)',
        [insertedUserId, name, role, department, parseFloat(salary), shift, new Date().toISOString().split('T')[0]]
      );
      newStaffId = insertedUserId;
    } else {
      const { memoryDb } = await import('./db');
      const insertedUserId = memoryDb.users.length + 1;
      memoryDb.users.push({
        id: insertedUserId,
        username,
        password: passwordHash,
        email,
        role: 'staff',
        status: 'active',
        created_at: new Date().toISOString()
      });
      memoryDb.staff.push({
        id: memoryDb.staff.length + 1,
        user_id: insertedUserId,
        name,
        role,
        department,
        salary: parseFloat(salary) || 50000,
        shift,
        status: 'active',
        hire_date: new Date().toISOString().split('T')[0]
      });
      newStaffId = insertedUserId;
    }

    return res.json({ success: true, message: 'Operational staff onboarded successfully!', staffId: newStaffId });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to onboard staff: ' + err.message });
  }
});

// Logout Session termination
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    return res.json({ success: true, message: 'Logged out successfully' });
  });
});

// Initialize Gemini Client
// We check for the API key to avoid crashing the server on boot if the key is missing,
// complying with the lazy-initialization and robust key-check constraints.
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('Gemini AI initialized successfully.');
  } else {
    console.warn('GEMINI_API_KEY is not configured or uses the placeholder. AI Assistant will operate in simulation mode.');
  }
} catch (error) {
  console.error('Failed to initialize Gemini AI:', error);
}

// ----------------- Mock Headless CMS Data (Schemas) -----------------

// Content Type: historicalMilestone (Timeline Data)
const historicalMilestones = [
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
  },
  {
    year: '2016',
    title: 'First-Ever Olympic Laurel Award',
    eventCategory: 'Philanthropy',
    description: 'At the Rio 2016 Olympic Opening Ceremony, Kipchoge Keino is awarded the historic first-ever Olympic Laurel, honoring his immense global contributions to education, culture, development, and peace through sport.',
    media: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600&h=400'
  }
];

// Content Type: stadiumProject (Infrastructure Tracker)
let stadiumProjectState = {
  facilityName: 'Kipchoge Keino Stadium',
  completionPercentage: 82, // Dynamic progress tracker
  targetHandover: '2026-12-31',
  contractor: 'Sinohydro Corporation',
  supervisingBody: 'Ministry of Defence / KDF',
  status: 'on-schedule' as const,
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

// Live Event State (Absa Kip Keino Classic)
const athletesListMen = [
  { lane: 1, name: 'Emmanuel Wanyonyi', country: 'KEN', time: '1:42.15', split400m: '50.1', split800m: '1:42.15', status: 'finished' },
  { lane: 2, name: 'Marco Arop', country: 'CAN', time: '1:42.45', split400m: '49.8', split800m: '1:42.45', status: 'finished' },
  { lane: 3, name: 'Djamel Sedjati', country: 'ALG', time: '1:42.90', split400m: '50.4', split800m: '1:42.90', status: 'finished' },
  { lane: 4, name: 'Wyclife Kinyamal', country: 'KEN', time: '1:43.20', split400m: '50.3', split800m: '1:43.20', status: 'finished' },
  { lane: 5, name: 'Gabriel Tual', country: 'FRA', time: '1:43.80', split400m: '50.7', split800m: '1:43.80', status: 'finished' },
  { lane: 6, name: 'Ben Pattison', country: 'GBR', time: '1:44.10', split400m: '51.1', split800m: '1:44.10', status: 'finished' },
  { lane: 7, name: 'Tshepo Tshite', country: 'RSA', time: '1:44.95', split400m: '51.3', split800m: '1:44.95', status: 'finished' },
  { lane: 8, name: 'Koitatoi Kidali', country: 'KEN', time: '1:45.30', split400m: '50.6', split800m: '1:45.30', status: 'finished' }
];

let liveRaces: any[] = [
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
    athletes: athletesListMen
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
      { lane: 3, name: 'Abdelatif Sadiki', country: 'MAR', time: '--', status: 'running' },
      { lane: 4, name: 'Narve Gilje Nordås', country: 'NOR', time: '--', status: 'running' },
      { lane: 5, name: 'Cole Hocker', country: 'USA', time: '--', status: 'running' },
      { lane: 6, name: 'Brian Komen', country: 'KEN', time: '--', status: 'running' },
      { lane: 7, name: 'Yared Nuguse', country: 'USA', time: '--', status: 'running' },
      { lane: 8, name: 'Kiprugut Choge', country: 'KEN', time: '--', status: 'running' }
    ]
  }
];

// Ticketing Data
const ticketCategories = [
  { id: 't1', name: 'Terraces / General Admission', priceKES: 500, benefits: ['Standard stadium seating', 'Access to food and merchandise zone', 'Digital ticket pass'], available: 8420 },
  { id: 't2', name: 'Main Stand (VIP adjacent)', priceKES: 2500, benefits: ['Covered seating section', 'Excellent finish-line visibility', 'Dedicated stadium entrance'], available: 1200 },
  { id: 't3', name: 'Presidential VIP Lounge', priceKES: 10000, benefits: ['Catered gourmet Kenyan buffet', 'Meet & greet with Kip Keino & world-class athletes', 'Air-conditioned lounge', 'VIP parking & shuttle service'], available: 150 }
];

// Active reservations in memory
let reservations: any[] = [];

// ----------------- API Routes -----------------

// Stadium endpoint (Bypasses caching with real-time simulated progress fluctuation)
app.get('/api/stadium', (req, res) => {
  // Set headers demonstrating Edge/CDN bypass & SSR stale revalidation
  res.setHeader('Cache-Control', 'no-store, must-revalidate');
  res.setHeader('X-Render-Strategy', 'SSR-Dynamic-Direct-Fetch');

  // Let's dynamically simulate tiny updates or structural progress shifts based on the time
  const seconds = new Date().getSeconds();
  // Fluctuates slightly between 82% and 85% based on actual clock cycle to show "Live Event Operational Data"
  const dynamicPercentage = 82 + (seconds % 4);
  
  res.json({
    ...stadiumProjectState,
    completionPercentage: dynamicPercentage,
    lastChecked: new Date().toISOString()
  });
});

// Milestones timeline endpoint (SSG-ready structure)
app.get('/api/milestones', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400');
  res.setHeader('X-Render-Strategy', 'SSG-ISR-Active');
  res.json(historicalMilestones);
});

// Events & Live tracker details
app.get('/api/events', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.json({
    races: liveRaces,
    ticketCategories,
    meetVenue: 'Kipchoge Keino Stadium, Eldoret (AFCON 2027 Upgrade site)',
    nextScheduledMeet: 'Absa Kip Keino Classic World Tour Gold'
  });
});

// Simulate race completion or tick updates
app.post('/api/events/simulate-race', (req, res) => {
  const { raceId } = req.body;
  const race = liveRaces.find(r => r.id === raceId);
  
  if (!race) {
    return res.status(404).json({ error: 'Race not found' });
  }

  if (raceId === 'kk-2') {
    // Simulate finishing times for 1500m
    const baseSeconds = 210; // 3:30.00
    const updatedAthletes = race.athletes.map((a: any, index: number) => {
      const offset = (index * 0.45) + Math.random() * 0.8;
      const finalSecs = baseSeconds + offset;
      const mins = Math.floor(finalSecs / 60);
      const secs = (finalSecs % 60).toFixed(2);
      const finalTime = `${mins}:${secs.padStart(5, '0')}`;
      return {
        ...a,
        time: finalTime,
        status: 'finished' as const,
        split400m: '55.4',
        split800m: '1:52.1'
      };
    }).sort((a: any, b: any) => parseFloat(a.time.replace(':', '')) - parseFloat(b.time.replace(':', '')));

    // Re-assign positions
    updatedAthletes.forEach((a: any, index: number) => {
      a.currentPosition = index + 1;
    });

    race.athletes = updatedAthletes;
    race.status = 'completed';
  }

  res.json(race);
});

// Reset simulation
app.post('/api/events/reset-race', (req, res) => {
  liveRaces[1] = {
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
      { lane: 3, name: 'Abdelatif Sadiki', country: 'MAR', time: '--', status: 'running' },
      { lane: 4, name: 'Narve Gilje Nordås', country: 'NOR', time: '--', status: 'running' },
      { lane: 5, name: 'Cole Hocker', country: 'USA', time: '--', status: 'running' },
      { lane: 6, name: 'Brian Komen', country: 'KEN', time: '--', status: 'running' },
      { lane: 7, name: 'Yared Nuguse', country: 'USA', time: '--', status: 'running' },
      { lane: 8, name: 'Kiprugut Choge', country: 'KEN', time: '--', status: 'running' }
    ]
  };
  res.json(liveRaces[1]);
});

// Book digital ticket
app.post('/api/tickets/reserve', (req, res) => {
  const { holderName, categoryId, quantity } = req.body;

  if (!holderName || !categoryId || !quantity) {
    return res.status(400).json({ error: 'Missing required reservation fields' });
  }

  const category = ticketCategories.find(c => c.id === categoryId);
  if (!category) {
    return res.status(404).json({ error: 'Ticket category not found' });
  }

  if (category.available < quantity) {
    return res.status(400).json({ error: 'Not enough tickets available' });
  }

  category.available -= quantity;

  const ticketId = `KK-${Math.floor(100000 + Math.random() * 900000)}`;
  const totalCost = category.priceKES * quantity;
  
  // Custom QR string format containing athletic validation details
  const qrCode = `TICKET_ID:${ticketId}|HOLDER:${encodeURIComponent(holderName)}|CAT:${category.name}|QTY:${quantity}|SECURE_AUTH:KIP_KEINO_CLASSIC_2026`;

  const newReservation = {
    ticketId,
    holderName,
    categoryName: category.name,
    quantity,
    totalCost,
    qrCode,
    timestamp: new Date().toISOString()
  };

  reservations.push(newReservation);
  res.json(newReservation);
});

// Chatbot - AI Heritage Guide
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages format is invalid' });
  }

  const promptText = messages[messages.length - 1]?.text || 'Hello';

  // Construct context rich with historical knowledge to inject into system instruction or chat flow
  const systemInstruction = `You are the Official Kipchoge Keino AI Heritage Guide. Your goal is to inspire and educate users about the life, record-breaking athletic feats, and philanthropic legacy of legendary Kenyan runner Kipchoge "Kip" Keino (Olympic champion in 1968 and 1972).
  
  Provide rich, inspiring answers reflecting his humility, his struggles, and his grand vision. Key facts you must know intimately:
  - 1968 Mexico City Olympics: Suffering severe gallbladder pain, he collapsed in the 10,000m, yet ran the 5,000m to take Silver. In the 1500m, stuck in traffic on race day, he got out of the car and ran 2 miles to the stadium, arriving just before the gun. He won Gold, setting an Olympic record and beating heavy favorite Jim Ryun by 2.98 seconds.
  - 1972 Munich Olympics: Entered the 3000m Steeplechase with virtually no prior experience, trained by jumping logs and water ditches, and won Gold in Olympic record time (8:23.6). Also claimed Silver in the 1500m.
  - Philanthropy: Founded the Kip Keino Children's Home (orphanage in Eldoret), the Kip Keino Primary/Secondary Schools, and championed sports as a tool for peace, earning the first-ever Olympic Laurel Award at the Rio  Rio 2016 Games.
  - Stadium Tracker: Kipchoge Keino Stadium in Eldoret is undergoing massive upgrades led by the Ministry of Defence / KDF and Sinohydro Corporation. It is 82-85% complete and on schedule for target handover on December 31, 2026, aimed at hosting AFCON 2027.
  - Absa Kip Keino Classic: Named in his honor, this annual track and field meet is part of the World Athletics Continental Tour Gold, hosting world-class stars like Emmanuel Wanyonyi, Timothy Cheruiyot, and global elite runners in Eldoret.
  
  Respond in a warm, respectful, storytelling tone. Keep responses within 2 to 3 concise, readable paragraphs to prevent scrolling overload. Do not use complex technical jargon. Ensure your output is formatted in clean markdown.`;

  if (ai) {
    try {
      // Structure chat context correctly for the official @google/genai SDK
      // Map previous messages to format: { role: 'user' | 'model', parts: [{ text: ... }] }
      const formattedContents = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || 'My apologies, I could not generate a response at this moment. Please ask another question about Kipchoge Keino\'s legendary career.';
      return res.json({ text: responseText });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      return res.status(500).json({ error: 'Failed to query legacy assistant: ' + error.message });
    }
  } else {
    // Simulation / Fallback Mode when GEMINI_API_KEY is not configured
    setTimeout(() => {
      let reply = 'I am currently operating in legacy archives mode (Simulation). ';
      const lowerText = promptText.toLowerCase();

      if (lowerText.includes('1968') || lowerText.includes('mexico')) {
        reply += 'In the 1968 Mexico City Olympics, despite suffering from a painful gallbladder infection, Kip Keino jogged 2 miles to the stadium because of a traffic jam, arriving with minutes to spare. He went on to win the 1500m Gold in an Olympic record time of 3:34.9, defeating the legendary Jim Ryun by almost 3 seconds!';
      } else if (lowerText.includes('1972') || lowerText.includes('munich') || lowerText.includes('steeplechase')) {
        reply += 'At the 1972 Munich Olympics, Kip entered the 3000m Steeplechase—an event he had run only once or twice before. Training by leaping hurdles and local water pools, he won Gold by setting an Olympic record of 8:23.6, securing his status as Kenya\'s ultimate track pioneer.';
      } else if (lowerText.includes('stadium') || lowerText.includes('construction') || lowerText.includes('eldoret')) {
        reply += 'The Kipchoge Keino Stadium in Eldoret is undergoing a magnificent world-class upgrade managed by Sinohydro Corporation and the Kenya Defence Forces (KDF). The project is currently at approximately 82-84% completion, on track for the target handover on December 31, 2026, ahead of AFCON 2027!';
      } else if (lowerText.includes('classic') || lowerText.includes('absa') || lowerText.includes('race')) {
        reply += 'The Absa Kip Keino Classic is a prestigious World Athletics Continental Tour Gold meet held in Nairobi/Eldoret. It gathers global sprinting and distance icons to honor Kip\'s athletic trail. You can track races, view live updates, or generate digital VIP tickets directly on our live dashboard!';
      } else if (lowerText.includes('child') || lowerText.includes('philanthr') || lowerText.includes('laurel')) {
        reply += 'In 1984, Kip and Phyllis Keino founded the Kip Keino Children\'s Home, providing a loving family to orphaned children. In 2016, the International Olympic Committee recognized his humanitarian service by awarding him the first-ever Olympic Laurel at the Rio Olympics.';
      } else {
        reply += 'Kipchoge Keino is a true trailblazer of Kenyan athletics. Ask me about his 1968 Mexico City triumph, his incredible 1972 Steeplechase debut, his philanthropy in Eldoret, or the progress on his legacy stadium!';
      }

      res.json({ text: reply });
    }, 800);
  }
});

// ----------------- Relational Database API Integration -----------------

// Fetch database connection health and pool configuration
app.get('/api/db/status', async (req, res) => {
  try {
    const dbStatus = await getDatabaseStatus();
    res.json(dbStatus);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to retrieve database status' });
  }
});

// Execute arbitrary queries from SQL query terminal, supporting direct MySQL or fallback sandbox
app.post('/api/db/query', async (req, res) => {
  const { sql } = req.body;
  if (!sql) {
    return res.status(400).json({ error: 'Missing SQL statement in request body' });
  }

  try {
    const dbStatus = await getDatabaseStatus();
    let queryResult;

    if (dbStatus.connected) {
      // Execute on real MySQL connection pool
      queryResult = await query(sql);
      res.json({
        success: true,
        source: 'mysql',
        dbStatus,
        result: queryResult
      });
    } else {
      // Execute in sandbox simulation mode
      const { simulateQuery } = await import('./db');
      const simResult = simulateQuery(sql);
      res.json({
        success: true,
        source: 'memory-fallback',
        dbStatus,
        result: simResult.rows.length > 0 ? simResult.rows : { affectedRows: simResult.affectedRows }
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message || 'Database query execution failed'
    });
  }
});

// ----------------- Vite Integration & Static Assets -----------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // In development mode, mount the Vite development middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in development mode.');
  } else {
    // In production, serve built static assets from the `dist` directory
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production static assets from dist/.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Kipchoge Keino Legacy Platform server running at http://localhost:${PORT}`);
  });
}

startServer();
