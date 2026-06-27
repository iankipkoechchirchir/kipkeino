# The Kipchoge Keino Legacy Platform & High-Altitude Athletic Hub
> **Official Legacy Portal & Operational System** celebrating the athletic, philanthropic, and physical infrastructure achievements of Kipchoge Keino, located in Eldoret, Kenya.

---

## 🏛️ Project Vision
This platform serves a dual purpose:
1. **Historical Legacy & Public Portal**: A high-fidelity public space featuring an AI Heritage Assistant (powered by the Gemini API), interactive Olympic timeline archives, and stadium progress updates.
2. **High-Altitude Academy & Stadium Management**: A full-featured operational dashboard supporting four roles (Root Admin, Staff, Coach, and Athlete) to manage elite rosters, VO2 max metrics, anti-doping clearances (ADAK), weather hazards, and physical stadium logistics.

---

## 👥 Role Matrix & Authentication
Following recent security audits, public landing quick-logins have been tailored for elite sport-specific roles.

| Role | Username | Password | Access Rights & Purpose |
| :--- | :--- | :--- | :--- |
| **Root Admin** | `admin` | `Kipkoech` | Overall system operational graphs, audit log ledger, MySQL database queries, broadcast alerts. |
| **Staff Deck** | `kipkoech_staff` | `StaffPass` | Duty roster, generator fuel metrics, arena lane bookings, and procurement requisitions. |
| **Academy Coach** | `coach_paul` | `CoachPass` | Squad lists, altitude barometric training schedules (2,400m), maintenance requests, bio clearances. |
| **Elite Athlete** | `athlete_kemboi` | `AthletePass` | Personal Best tracking, high-altitude training block view, medical/ADAK tickets, and event bookings. |

---

## 🛠️ Key Technical Features

### 1. **AI Heritage Assistant**
- **Core Technology**: Server-side proxy API integration utilizing `Gemini 3.5-flash`.
- **Predefined Archives**: Interactive quick-prompts covering:
  - The **1968 Mexico City Gallbladder Gold** final (and 2-mile jog to the stadium).
  - The **1972 Munich Steeplechase** gold medal debut.
  - The **Kip Keino Children's Home & Philanthropic Schools** in Eldoret.
  - The **AFCON 2027 Upgrade Timelines** for the main stadium.

### 2. **Stadium Construction Progress Tracker**
- Monitors the current 82%+ refurbishment works of the **Kipchoge Keino Stadium (Eldoret)** managed by the **Kenya Defence Forces (KDF)** and **Sinohydro Corporation**.
- Displays interactive completion metrics by sector (VIP Pavilions, Tartan Track, Parking, Terraces) and next scheduled inspections.

### 3. **High-Altitude Training Engine (2,400m)**
- Tailored for Eldoret's unique high-altitude barometric air density parameters (approx. 76% of sea-level oxygen density).
- Real-time coach-to-athlete training plan dispatcher, anti-doping clearance indicators (ADAK compliance flags), and extreme meteorological warnings (e.g. afternoon hailstorms).

### 4. **Live Event Seat & Ticket Booking**
- Real-time virtual general admission and VIP Main Stand ticket bookings for upcoming athletic classic events.

---

## 📂 System Architecture & File Structure

```
├── README.md               # [THIS FILE] Project specifications and user manual
├── metadata.json           # Application title, permissions, and major capabilities
├── package.json            # NPM dependencies and bundler configurations
├── db.ts                   # In-memory relational database & persistent caches
├── schema.sql              # Database schema tables (users, staff, athletes, logs, tickets)
├── server.ts               # Express backend serving client assets & server-side Gemini API
└── src
    ├── App.tsx             # Central route router and module switchboard
    ├── types.ts            # Type definitions for athletes, coaches, tickets, logs
    ├── index.css           # Global typography, colors, and Tailwind configuration
    ├── components          # Reusable visualization panels
    │   ├── HeritageGuide.tsx       # AI Heritage chat companion with Gemini fallback
    │   ├── LandingPage.tsx         # Gatekeeper entry portal with sports-role quick logins
    │   ├── LiveEventTracker.tsx    # Live classic race runner monitors
    │   ├── MilestoneTimeline.tsx   # Curated life journey historical database timeline
    │   └── StadiumStatusCard.tsx   # Dynamic engineering status panels
    └── pages
        ├── admin           # Administrative tools, DB console, audit ledger
        ├── staff           # Shift controls, logistics, arena bookings
        ├── coach           # Coach dashboard, altitude regimens, maintenance logs
        └── athlete         # Personal metrics, daily programs, ADAK clearance passes
```

---

## 📦 Local Installation & Developer Workflow

### Prerequisites
- Node.js (v18+)
- NPM (v9+)

### Installation
1. Install initial dependencies:
   ```bash
   npm install
   ```
2. Set up the local environment variables in `.env` (refer to `.env.example`):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

### Execution
- **Run Development Server**:
  ```bash
  npm run dev
  ```
- **Build Production Assets**:
  ```bash
  npm run build
  ```
- **Run Production Server**:
  ```bash
  npm run start
  ```

---
*Created on June 27, 2026. Managed by Kipchoge Keino Foundation & Ministry of Sports Athletics Directorate.*
