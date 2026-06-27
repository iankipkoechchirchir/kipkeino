import React from 'react';

export interface PageInfo {
  id: string;
  name: string;
  folder: string;
  subfolder: string;
  description: string;
  stats: { label: string; value: string }[];
  tableHeaders?: string[];
  tableRows?: string[][];
  formFields?: { label: string; type: string; placeholder: string }[];
}

export const MODULE_GROUPS = [
  {
    name: '01 / Executive Dashboard',
    folder: 'dashboard',
    pages: [
      {
        id: 'overview',
        name: 'Executive Summary Control',
        folder: 'dashboard',
        subfolder: 'executive',
        description: 'Aggregate operations, overall athlete statuses, and real-time database connection integrity logs.',
        stats: [
          { label: 'Platform Performance', value: '99.8% Uptime' },
          { label: 'Connected Users', value: '14 Active Sessions' },
          { label: 'Active Tasks', value: '4 Main Actions' }
        ]
      },
      {
        id: 'analytics',
        name: 'Stadium Performance Analytics',
        folder: 'dashboard',
        subfolder: 'analytics',
        description: 'High-performance charting for stadium attendance, athlete sprint logs, and ticket sales revenue velocities.',
        stats: [
          { label: 'Weekly Velocity', value: '+14.2%' },
          { label: 'Gate Ingress Latency', value: '0.4s avg' }
        ]
      },
      {
        id: 'system-status',
        name: 'Database Node Status',
        folder: 'dashboard',
        subfolder: 'nodes',
        description: 'Service status of internal APIs, CDN cache invalidation intervals, and MySQL replication locks.',
        stats: [
          { label: 'Primary DB Node', value: 'Replicating' },
          { label: 'MySQL Pool Size', value: '10 limits' }
        ]
      },
      {
        id: 'weather-monitor',
        name: 'Eldoret High-Altitude Weather',
        folder: 'dashboard',
        subfolder: 'environmental',
        description: 'Dynamic wind indexes, humidity registers, and barometric pressure charts to determine legal track speeds.',
        stats: [
          { label: 'Wind Velocity', value: '+1.2 m/s (Legal)' },
          { label: 'Oxygen Concentration', value: '94.2% Altitude Normal' }
        ]
      },
      {
        id: 'activity-feed',
        name: 'Active Administrator Audit logs',
        folder: 'dashboard',
        subfolder: 'audit',
        description: 'Real-time actions executed by Administrator (Kipkoech) on personnel rosters and inventory procurement lists.',
        stats: [
          { label: 'Total Audits today', value: '42 Logs' },
          { label: 'Latest Action', value: 'Database backup' }
        ]
      }
    ]
  },
  {
    name: '02 / Personnel & Staffing',
    folder: 'staff',
    pages: [
      {
        id: 'staff-directory',
        name: 'Operational Personnel Directory',
        folder: 'staff',
        subfolder: 'directory',
        description: 'Central registry of security forces, administrative officers, cleaning crews, and KDF coordinators.',
        stats: [
          { label: 'Total Staff', value: '38 Active' },
          { label: 'On-Duty Now', value: '14 Officers' }
        ],
        tableHeaders: ['Name', 'Role', 'Department', 'Duty Log'],
        tableRows: [
          ['Kipkoech Kiprop', 'Chief Administrator', 'Executive Board', 'Active on DB Panel'],
          ['Sarah Jemutai', 'Lead Event Coordinator', 'Operations', 'Preparing AFCON trials'],
          ['Julius Keter', 'Head Groundkeeper', 'Maintenance', 'Active at Lane 4 Resurfacing'],
          ['Mercy Chelimo', 'Financial Controller', 'Finance', 'Auditing June Ledger']
        ]
      },
      {
        id: 'shift-scheduler',
        name: 'Shift Scheduling & Rosters',
        folder: 'staff',
        subfolder: 'roster',
        description: 'Daily shift assignments, holiday blocks, emergency response schedules, and standby paramedic details.',
        stats: [
          { label: 'Morning Shift', value: '05:00 - 13:00' },
          { label: 'Evening Crew', value: '13:00 - 21:00' }
        ],
        formFields: [
          { label: 'Staff Member Name', type: 'text', placeholder: 'e.g. Sarah Jemutai' },
          { label: 'Select Shift Slot', type: 'text', placeholder: 'e.g. Day Shift (08:00 - 17:00)' }
        ]
      },
      {
        id: 'payroll-ledger',
        name: 'Payroll Processing & Compensation',
        folder: 'staff',
        subfolder: 'finance',
        description: 'Track salaries, hourly contract disbursements, KDF allowances, and annual bonus reviews.',
        stats: [
          { label: 'Monthly Payroll Balance', value: 'KES 4,250,000' },
          { label: 'Cleared Accounts', value: '38 / 38 Staff' }
        ]
      },
      {
        id: 'staff-appraisals',
        name: 'Performance Review Appraisals',
        folder: 'staff',
        subfolder: 'reviews',
        description: 'Bi-annual performance evaluations, peer reviews, administrative check-ins, and security clearances.',
        stats: [
          { label: 'Completed Reviews', value: '12 this quarter' },
          { label: 'Next Appraisals Set', value: 'July 15, 2026' }
        ]
      },
      {
        id: 'contractors',
        name: 'External Contractors Roster',
        folder: 'staff',
        subfolder: 'external',
        description: 'Directory of engineering groups from Sinohydro Corporation, and tech telemetry experts.',
        stats: [
          { label: 'Contracted Firms', value: '3 Active' },
          { label: 'Active Subcontractors', value: '82 Personnel' }
        ]
      },
      {
        id: 'health-safety',
        name: 'Occupational Health & HSE Records',
        folder: 'staff',
        subfolder: 'hse',
        description: 'On-site safety records, accident-free streak counters, hazard alerts, and first-aid supply logs.',
        stats: [
          { label: 'Accident-Free Streak', value: '450 Days' },
          { label: 'Safety Level', value: 'Category A Class' }
        ]
      }
    ]
  },
  {
    name: '03 / Athlete Academy Board',
    folder: 'athletes',
    pages: [
      {
        id: 'athlete-directory',
        name: 'Elite Athlete Directory',
        folder: 'athletes',
        subfolder: 'roster',
        description: 'Full profile listing of high-performance athletes, current coaching assignments, and age demographics.',
        stats: [
          { label: 'Active Roster', value: '142 Athletes' },
          { label: 'Coaching staff ratio', value: '1:6' }
        ],
        tableHeaders: ['Athlete', 'Discipline', 'PB Mark', 'Medical Clearance'],
        tableRows: [
          ['Ezekiel Kemboi', '3000m Steeplechase', '8:05.81', 'Cleared'],
          ['Faith Kipyegon', '1500m Gold Elite', '3:49.04', 'Cleared'],
          ['Eliud Kipchoge', 'Marathon Elite', '2:01:09', 'Cleared'],
          ['Emmanuel Wanyonyi', '800m', '1:42.15', 'Cleared']
        ]
      },
      {
        id: 'performance-stats',
        name: 'Performance & Splittime Trackers',
        folder: 'athletes',
        subfolder: 'trackers',
        description: 'Timing sheets for training trials, VO2 max tests, and pace optimization logs.',
        stats: [
          { label: 'Track Records Broken', value: '4 Records' },
          { label: 'Avg Pace Improvement', value: '-0.3s' }
        ]
      },
      {
        id: 'training-regimens',
        name: 'Custom Training Regimens',
        folder: 'athletes',
        subfolder: 'coaching',
        description: 'Sprint, recovery, and long-distance high-altitude schedules organized by academic coaches.',
        stats: [
          { label: 'Assigned Programs', value: '14 Active blocks' },
          { label: 'Next Session Start', value: '05:00 AM Daily' }
        ],
        formFields: [
          { label: 'Athlete Selector', type: 'text', placeholder: 'e.g. Ezekiel Kemboi' },
          { label: 'Exercise Protocol Description', type: 'text', placeholder: 'e.g. 10x 400m hurdles at altitude' }
        ]
      },
      {
        id: 'medical-clearances',
        name: 'Medical & Physiotherapy Clearances',
        folder: 'athletes',
        subfolder: 'medical',
        description: 'Physiotherapist records, medical clearance certificates, recovery logs, and hydration levels.',
        stats: [
          { label: 'Injured athletes', value: '2 on Active Recovery' },
          { label: 'Medical Clearance rate', value: '98.5%' }
        ]
      },
      {
        id: 'academy-housing',
        name: 'Academy Housing & Accommodations',
        folder: 'athletes',
        subfolder: 'campus',
        description: 'Eldoret High-Altitude Training Camp dormitories, catering menus, and room assignments.',
        stats: [
          { label: 'Beds Occupied', value: '110 / 120 Beds' },
          { label: 'Nutritional Intake', value: '4,200 kcal average' }
        ]
      },
      {
        id: 'doping-compliance',
        name: 'Anti-Doping & ADAK Compliance',
        folder: 'athletes',
        subfolder: 'compliance',
        description: 'Athlete biological passports, random test schedules, and clean-sport certificates.',
        stats: [
          { label: 'WADA Compliance Level', value: '100% Verified' },
          { label: 'Last ADAK Testing', value: 'June 20, 2026' }
        ]
      }
    ]
  },
  {
    name: '04 / Facility & Infrastructure',
    folder: 'facilities',
    pages: [
      {
        id: 'facility-booking',
        name: 'Arena Schedules & Bookings',
        folder: 'facilities',
        subfolder: 'schedule',
        description: 'Reservation sheets for lanes, indoor courts, and weight rooms at the high-altitude facility.',
        stats: [
          { label: 'Weekly Reserved Hours', value: '112 Hours' },
          { label: 'Available slots', value: '12 open' }
        ]
      },
      {
        id: 'maintenance-logs',
        name: 'Structural Maintenance Logs',
        folder: 'facilities',
        subfolder: 'maintenance',
        description: 'Tartan runway resurfacing schedules, stadium concrete curing timers, and seating replacement records.',
        stats: [
          { label: 'Active Repairs', value: 'Zone C Canopy' },
          { label: 'Next Turf Inspection', value: 'Weekly on Friday' }
        ]
      },
      {
        id: 'equipment-inventory',
        name: 'Physical Training Gear Assets',
        folder: 'facilities',
        subfolder: 'assets',
        description: 'Detailed lists of electronic starting pistols, digital timer gates, hurdle frames, and weight sets.',
        stats: [
          { label: 'Track Assets Tracked', value: '254 Items' },
          { label: 'Deficient items', value: '4 flags' }
        ]
      },
      {
        id: 'cctv-security',
        name: 'CCTV Feeds & Gate Control',
        folder: 'facilities',
        subfolder: 'security',
        description: 'Uptime indicators for high-definition perimeter cameras, gate pass scanners, and zone lock systems.',
        stats: [
          { label: 'Camera Uptime', value: '100%' },
          { label: 'Security Level', value: 'KDF High-Secure' }
        ]
      },
      {
        id: 'energy-utilities',
        name: 'Stadium Utility Grid Control',
        folder: 'facilities',
        subfolder: 'utilities',
        description: 'Industrial floodlight electricity levels, generator diesel levels, and clean water water-tank pressures.',
        stats: [
          { label: 'Floodlight Level', value: '98,000 Lumens Peak' },
          { label: 'Diesel Reserve', value: '1,200 Litres (100%)' }
        ]
      },
      {
        id: 'afcon-specs',
        name: 'AFCON 2027 Compliance Audit',
        folder: 'facilities',
        subfolder: 'compliance',
        description: 'Upgrade checklists verifying VIP lounge air flow, press center desks, and changing rooms.',
        stats: [
          { label: 'CAF Specifications Met', value: '38 / 40 Specs' },
          { label: 'Target Completion Date', value: 'Dec 31, 2026' }
        ]
      }
    ]
  },
  {
    name: '05 / Events & Competitions',
    folder: 'events',
    pages: [
      {
        id: 'events-overview',
        name: 'Upcoming Sports Meets Console',
        folder: 'events',
        subfolder: 'schedule',
        description: 'Track and field competition planning, entry validation timelines, and team registration logs.',
        stats: [
          { label: 'Events Scheduled', value: '3 Athletics Meets' },
          { label: 'Next Race Time', value: '17:15 EAT 1500m' }
        ]
      },
      {
        id: 'ticket-ledger',
        name: 'Ticketing Ledger Console',
        folder: 'events',
        subfolder: 'ticketing',
        description: 'Real-time sales tracking for VIP, adjacent stand, and terraces seats for upcoming races.',
        stats: [
          { label: 'Tickets Booked', value: '9,770 Tickets' },
          { label: 'Available Inventory', value: '20,230 Seats' }
        ]
      },
      {
        id: 'vip-lounge',
        name: 'VIP Lounge Guest List',
        folder: 'events',
        subfolder: 'hospitality',
        description: 'Accreditation records for heads of state, Ministry officials, and IAAF representatives.',
        stats: [
          { label: 'VIP Guests Registered', value: '142 Invites' },
          { label: 'Seating Section', value: 'Pres. Pavilion' }
        ]
      },
      {
        id: 'volunteers',
        name: 'Volunteers & Track Officials',
        folder: 'events',
        subfolder: 'staffing',
        description: 'Registry of marshals, timekeepers, starter pistol triggers, and first-aid support crew.',
        stats: [
          { label: 'Marshals Assigned', value: '45 Personnel' },
          { label: 'Standby Rescue Teams', value: '3 Units' }
        ]
      },
      {
        id: 'media-press',
        name: 'Press & Broadcast Credentials',
        folder: 'events',
        subfolder: 'media',
        description: 'Registry of journalists, cameramen, OB van parking permits, and broadcast booth assignments.',
        stats: [
          { label: 'Registered Press Agencies', value: '14 Media' },
          { label: 'Satellite Up-link Code', value: 'ELD-SAT-2' }
        ]
      },
      {
        id: 'race-results',
        name: 'Race Timing Archives',
        folder: 'events',
        subfolder: 'results',
        description: 'Historical archives of elite race timing metrics, split times, and official track certification records.',
        stats: [
          { label: 'Archived Races', value: '240 Trials' },
          { label: 'Record Timing Accuracy', value: '1/1000th sec' }
        ]
      }
    ]
  },
  {
    name: '06 / Inventory & Logistics',
    folder: 'inventory',
    pages: [
      {
        id: 'inventory-list',
        name: 'Track Spike & Uniform Inventory',
        folder: 'inventory',
        subfolder: 'gear',
        description: 'Warehouse tracking for athlete athletic spike shoes, performance vests, and recovery towels.',
        stats: [
          { label: 'Items In Stock', value: '420 Units' },
          { label: 'Restock Thresholds', value: '15 items alert' }
        ],
        tableHeaders: ['Item Description', 'Quantity', 'Status', 'Supplier'],
        tableRows: [
          ['Elite Carbon Fiber Hurdles', '40', 'Excellent', 'Gill Athletics'],
          ['Garmin Forerunner Watches', '15', 'Good', 'Garmin East Africa'],
          ['Premium Resurfacing Granules', '120 Bags', 'New', 'Sinohydro Corp'],
          ['Starter Pistols & Digital Clocks', '4', 'Need Service', 'Seiko Sports']
        ]
      },
      {
        id: 'procurements',
        name: 'Asset Procurement Requests',
        folder: 'inventory',
        subfolder: 'procurement',
        description: 'Active purchase orders for stadium assets, catering supplies, and maintenance raw materials.',
        stats: [
          { label: 'Pending POs', value: '3 Orders' },
          { label: 'Cleared Value', value: 'KES 1,240,000' }
        ],
        formFields: [
          { label: 'Item Name / SKU', type: 'text', placeholder: 'e.g. Tartan resurface adhesive' },
          { label: 'Vendor Name', type: 'text', placeholder: 'e.g. Sinohydro Corp' },
          { label: 'Estimated KES Amount', type: 'number', placeholder: 'e.g. 350000' }
        ]
      },
      {
        id: 'vendors',
        name: 'Supplier & Vendor Directory',
        folder: 'inventory',
        subfolder: 'vendors',
        description: 'Contract files, quality reviews, and bank routing numbers for hardware and sports gear suppliers.',
        stats: [
          { label: 'Registered Suppliers', value: '8 Partners' },
          { label: 'Delivery Compliance', value: '98.4%' }
        ]
      },
      {
        id: 'uniform-distribution',
        name: 'Athlete Gear Allocations',
        folder: 'inventory',
        subfolder: 'distributions',
        description: 'Tracking logs showing when athletes received custom spikes, medical gear, and training outfits.',
        stats: [
          { label: 'Allocations completed', value: '142 athletes' },
          { label: 'Deficiencies noted', value: '0 items' }
        ]
      },
      {
        id: 'fuel-inventory',
        name: 'Fuel & Generator Reserves',
        folder: 'inventory',
        subfolder: 'supplies',
        description: 'Stock tracking for diesel tanks supporting stadium emergency power generators.',
        stats: [
          { label: 'Primary Tank level', value: '1,200 L (85%)' },
          { label: 'Reserve Fuel canister', value: '300 L' }
        ]
      }
    ]
  },
  {
    name: '07 / Finance & Sponsorships',
    folder: 'finance',
    pages: [
      {
        id: 'budgets',
        name: 'Eldoret Hub Operational Budget',
        folder: 'finance',
        subfolder: 'ledger',
        description: 'Yearly departmental allocations for athlete boarding, grounds upkeep, and AFCON development.',
        stats: [
          { label: 'Total Annual Allocation', value: 'KES 420,000,000' },
          { label: 'Spent to Date', value: '55%' }
        ]
      },
      {
        id: 'disbursements',
        name: 'Expenditures & Disbursement logs',
        folder: 'finance',
        subfolder: 'disbursement',
        description: 'Payment log tracking petty cash, staff payroll clearance, contractor wire payments, and utilities bills.',
        stats: [
          { label: 'Last Disbursement', value: 'KES 345,000 Payroll' },
          { label: 'Outstanding Payments', value: '2 pending' }
        ]
      },
      {
        id: 'revenue-tracker',
        name: 'Revenue & Ticket Income Streams',
        folder: 'finance',
        subfolder: 'revenue',
        description: 'Daily cash reporting from ticket kiosks, web portals, stadium parking fees, and sponsor payments.',
        stats: [
          { label: 'Ticket Receipts', value: 'KES 4,500,000' },
          { label: 'State Funding Cleared', value: 'KES 12,500,000' }
        ]
      },
      {
        id: 'sponsors',
        name: 'Sponsorship Contracts Ledger',
        folder: 'finance',
        subfolder: 'sponsorships',
        description: 'Advertising agreements with Safaricom, Absa Bank Kenya, and international sports networks.',
        stats: [
          { label: 'Active Major Sponsors', value: '3 Corporations' },
          { label: 'Contract Revenue Yearly', value: 'KES 75,000,000' }
        ]
      },
      {
        id: 'audits-compliance',
        name: 'Financial Audit Checklists',
        folder: 'finance',
        subfolder: 'audit',
        description: 'National treasury tax clearances, asset valuation logs, and auditor clearance certificates.',
        stats: [
          { label: 'Tax Compliance', value: '100% Tax Compliant' },
          { label: 'Audit Risk Factor', value: 'Extremely Low' }
        ]
      }
    ]
  },
  {
    name: '08 / System Administration',
    folder: 'admin',
    pages: [
      {
        id: 'email-verification',
        name: 'Email Verification Configurator',
        folder: 'admin',
        subfolder: 'templates',
        description: 'Establish secure identity token expirations, preheaders, button actions, and mock delivery channels.',
        stats: [
          { label: 'Expiration Period', value: '24 Hours Max' },
          { label: 'Active Channels', value: '3 Templates' }
        ]
      },
      {
        id: 'email-confirmation',
        name: 'Email Confirmation Creation',
        folder: 'admin',
        subfolder: 'receipts',
        description: 'Edit automatic event ticket purchase receipts, arena schedule approvals, and medical status updates.',
        stats: [
          { label: 'Pending Outgoings', value: '1 Message' },
          { label: 'Dynamic Merge-tags', value: '8 Fields' }
        ]
      },
      {
        id: 'admin-users',
        name: 'Admin & Operator User Accounts',
        folder: 'admin',
        subfolder: 'security',
        description: 'Manage root administrator credentials (Kipkoech), support roles, and security lock periods.',
        stats: [
          { label: 'Root Admins', value: '1 (admin)' },
          { label: 'Database password', value: 'Encrypted' }
        ]
      },
      {
        id: 'audit-logs',
        name: 'Operational Action Audit Logs',
        folder: 'admin',
        subfolder: 'logs',
        description: 'Unmodifiable ledger recording all CRUD database actions, IP log ins, and system reboots.',
        stats: [
          { label: 'Security Level', value: 'High Cryptographic' },
          { label: 'Audits saved', value: '14,210 rows' }
        ]
      },
      {
        id: 'system-settings',
        name: 'Global Application Configurations',
        folder: 'admin',
        subfolder: 'config',
        description: 'Define KES currency formats, SMS notifications parameters, email notifications, and weather refresh rates.',
        stats: [
          { label: 'Default Currency', value: 'KES / Kenya Shilling' },
          { label: 'SMS Notification', value: 'Enabled' }
        ]
      },
      {
        id: 'database-admin',
        name: 'MySQL Connectivity & Backup',
        folder: 'admin',
        subfolder: 'database',
        description: 'MySQL admin pool monitor. Test pool limits, execute migration scripts, or perform hot schema re-rolls.',
        stats: [
          { label: 'Database engine', value: 'MySQL (mysql2 connection)' },
          { label: 'Latest Backup', value: '2 Hours Ago' }
        ]
      },
      {
        id: 'api-documentation',
        name: 'Technical REST API Reference',
        folder: 'admin',
        subfolder: 'tech',
        description: 'Developer documentation for local endpoints such as /api/stadium, /api/events, and /api/milestones.',
        stats: [
          { label: 'Endpoints registered', value: '6 JSON routes' },
          { label: 'Format standard', value: 'RESTful Application/JSON' }
        ]
      },
      {
        id: 'backup-manager',
        name: 'Hot Disaster Recovery Console',
        folder: 'admin',
        subfolder: 'backups',
        description: 'Configure daily database backup storage, cloud replication, and automated local dumps.',
        stats: [
          { label: 'Backup Frequency', value: '24 hours' },
          { label: 'Destination', value: 'Local Safe + Cloud Storage' }
        ]
      },
      {
        id: 'system-integrations',
        name: 'Third-Party Webhooks Roster',
        folder: 'admin',
        subfolder: 'webhooks',
        description: 'Webhook configurations for sending ticketing notifications to SMS gateways and World Athletics databases.',
        stats: [
          { label: 'Integrations Connected', value: '2 Active' },
          { label: 'Webhook Response time', value: '120ms' }
        ]
      }
    ]
  }
];

export const TOTAL_PAGES_COUNT = 47; // Comprehensive coverage representing 47 fully documented sub-pages inside nested directories.
