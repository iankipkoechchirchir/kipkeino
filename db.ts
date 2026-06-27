import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

dotenv.config();

// Load connection details from process.env or defaults requested by user
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'Kipkoech';
const DB_PASSWORD = process.env.DB_PASSWORD || 'Kipkoech';
const DB_NAME = process.env.DB_NAME || 'esms_db';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);

export interface DbStatus {
  connected: boolean;
  type: 'mysql' | 'memory-fallback';
  host: string;
  user: string;
  database: string;
  error?: string;
}

let pool: mysql.Pool | null = null;
let connectionError: string | null = null;
let isConnected = false;
let isBootstrapped = false;

// Secure any plain passwords in memoryDb and MySQL
export async function hashPasswordsOnStartup(activePool: mysql.Pool | null): Promise<void> {
  // First, secure memory database passwords
  if (memoryDb && memoryDb.users) {
    memoryDb.users.forEach(user => {
      if (user.password && !user.password.startsWith('$2a$') && !user.password.startsWith('$2b$')) {
        user.password = bcrypt.hashSync(user.password, 10);
      }
    });
  }

  if (activePool) {
    try {
      const [users]: any = await activePool.query('SELECT id, password FROM users');
      for (const user of users) {
        if (user.password && !user.password.startsWith('$2a$') && !user.password.startsWith('$2b$')) {
          const hashed = bcrypt.hashSync(user.password, 10);
          await activePool.query('UPDATE users SET password = ? WHERE id = ?', [hashed, user.id]);
        }
      }
      console.log('Automated Password Protection: Verified that all users in MySQL are fully bcrypt hashed.');
    } catch (err: any) {
      console.warn('Could not run automated user password hashing update:', err.message || err);
    }
  }
}

// Automatically run schema.sql if database is empty on connect
async function bootstrapDatabaseIfEmpty(activePool: mysql.Pool): Promise<void> {
  if (isBootstrapped) return;
  try {
    // Check if users table exists
    const [rows]: any = await activePool.query(`SHOW TABLES LIKE 'users'`);
    if (rows && rows.length > 0) {
      isBootstrapped = true;
      console.log('Database tables already exist. Skipping bootstrap.');
      return;
    }

    console.log('Database esms_db appears to be empty. Bootstrapping tables from schema.sql...');
    const schemaPath = path.join(process.cwd(), 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const sqlContent = fs.readFileSync(schemaPath, 'utf8');
      
      // Clean up file and split statements. Remove comments, split by semicolon.
      const statements = sqlContent
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

      const connection = await activePool.getConnection();
      try {
        await connection.beginTransaction();
        for (const statement of statements) {
          // Avoid executing USE esms_db or CREATE DATABASE statements if they might fail in certain permissions contexts,
          // but allow standard CREATE TABLE and INSERT statements.
          if (
            statement.toLowerCase().startsWith('create database') ||
            statement.toLowerCase().startsWith('use ')
          ) {
            continue;
          }
          await connection.query(statement);
        }
        await connection.commit();
        console.log('Successfully completed schema bootstrap and seeded default records in MySQL.');
      } catch (runErr) {
        await connection.rollback();
        throw runErr;
      } finally {
        connection.release();
      }
    } else {
      console.warn('schema.sql file not found at path:', schemaPath);
    }
    isBootstrapped = true;
  } catch (err: any) {
    console.error('Error bootstrapping database from schema.sql:', err.message || err);
  }
}

// Attempt to initialize connection pool lazily
export async function getPool(): Promise<mysql.Pool | null> {
  if (pool) return pool;

  try {
    // Create connection pool using mysql2/promise
    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      multipleStatements: true, // Allow multiple statements if needed
    });

    // Test the connection to make sure it's valid
    const conn = await pool.getConnection();
    conn.release();
    isConnected = true;
    connectionError = null;
    console.log(`Successfully connected to MySQL database: ${DB_NAME} on ${DB_HOST}:${DB_PORT}`);
    
    // Bootstrap if connection is successful
    await bootstrapDatabaseIfEmpty(pool);
    await hashPasswordsOnStartup(pool);
    
    return pool;
  } catch (err: any) {
    pool = null;
    isConnected = false;
    connectionError = err.message || 'Unknown database error';
    console.warn(`MySQL Connection failed (falling back to in-memory esms_db engine): ${connectionError}`);
    // Hash memory fallback passwords on failure
    await hashPasswordsOnStartup(null);
    return null;
  }
}

// Check real connection status
export async function getDatabaseStatus(): Promise<DbStatus> {
  await getPool();
  return {
    connected: isConnected,
    type: isConnected ? 'mysql' : 'memory-fallback',
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    error: connectionError || undefined
  };
}

// ----------------- IN-MEMORY FALLBACK DATABASE STORE -----------------
// This maintains full interactive compatibility for simple frontend preview clients

export const memoryDb: Record<string, any[]> = {
  users: [
    { id: 1, username: 'admin', password: '$2b$10$v8916CpR60fOYt2Xz6V5jOWlPk7I4hfDOP.v7O5xBEeHK4j82ycze', email: 'admin@eldoretstadium.go.ke', role: 'admin', status: 'active', created_at: '2026-06-27 12:00:00' },
    { id: 2, username: 'kipkoech_staff', password: '$2b$10$ucd2Gq9AiF730FL3pYZQ..5a1ES/hF7R60ZKQym7.8cj2N8nt.gQ.', email: 'kipkoech.staff@eldoretstadium.go.ke', role: 'staff', status: 'active', created_at: '2026-06-27 12:04:22' },
    { id: 3, username: 'coach_paul', password: '$2b$10$/LyNoIXf1HTzxEd8ps.9X.wZ3kVBKAHx1B2KLxsZMD.UKKMtNiYhu', email: 'paul.ereng@academy.org', role: 'coach', status: 'active', created_at: '2026-06-27 09:12:00' },
    { id: 4, username: 'athlete_kemboi', password: '$2b$10$gIlzXnMQWfjZB8FHCwV69uYTr44eZQl4jWojtxsKg0OPOFxOrIAM6', email: 'ezekiel@kemboi.com', role: 'athlete', status: 'active', created_at: '2026-06-26 15:30:00' }
  ],
  staff: [
    { id: 1, user_id: 1, name: 'Kipkoech Kiprop', role: 'Chief Administrator', department: 'Executive Board', salary: 150000.00, shift: 'Day-Shift (08:00 - 17:00)', status: 'active', hire_date: '2024-01-15' },
    { id: 2, user_id: 2, name: 'Sarah Jemutai', role: 'Lead Event Coordinator', department: 'Operations', salary: 85000.00, shift: 'Flexible (Event-driven)', status: 'active', hire_date: '2024-06-01' },
    { id: 3, user_id: null, name: 'Julius Keter', role: 'Head Facility Groundkeeper', department: 'Maintenance', salary: 45000.00, shift: 'Day-Shift (06:00 - 15:00)', status: 'active', hire_date: '2023-03-10' },
    { id: 4, user_id: null, name: 'Mercy Chelimo', role: 'Financial Controller', department: 'Finance Department', salary: 110000.00, shift: 'Day-Shift (08:00 - 17:00)', status: 'active', hire_date: '2025-01-10' }
  ],
  athletes: [
    { id: 1, name: 'Ezekiel Kemboi', discipline: '3000m Steeplechase', age: 42, coach_id: 3, status: 'active', medical_clearance: 1, joined_date: '2020-05-12' },
    { id: 2, name: 'Faith Kipyegon', discipline: '1500m Gold Elite', age: 32, coach_id: 3, status: 'active', medical_clearance: 1, joined_date: '2021-08-20' },
    { id: 3, name: 'Eliud Kipchoge', discipline: 'Marathon Elite', age: 41, coach_id: 3, status: 'active', medical_clearance: 1, joined_date: '2018-02-14' },
    { id: 4, name: 'Emmanuel Wanyonyi', discipline: '800m', age: 21, coach_id: 3, status: 'active', medical_clearance: 1, joined_date: '2023-01-01' },
    { id: 5, name: 'Kelvin Kiptum', discipline: 'Marathon Elite', age: 24, coach_id: 3, status: 'retired', medical_clearance: 0, joined_date: '2022-11-05' }
  ],
  performance_records: [
    { id: 1, athlete_id: 1, event_name: 'Olympic Games Athens', mark: '8:05.81', wind_speed: null, location: 'Athens, Greece', recorded_date: '2004-08-24' },
    { id: 2, athlete_id: 2, event_name: 'Paris Diamond League', mark: '3:49.04', wind_speed: null, location: 'Paris, France', recorded_date: '2024-07-07' },
    { id: 3, athlete_id: 3, event_name: 'Berlin Marathon', mark: '2:01:09', wind_speed: null, location: 'Berlin, Germany', recorded_date: '2022-09-25' },
    { id: 4, athlete_id: 4, event_name: 'Absa Kip Keino Classic', mark: '1:42.15', wind_speed: 1.2, location: 'Eldoret, Kenya', recorded_date: '2024-04-20' }
  ],
  facilities: [
    { id: 1, name: 'Kipchoge Keino Main Stadium', type: 'Athletics & Soccer Arena', capacity: 30000, status: 'operational', completion_percentage: 85 },
    { id: 2, name: 'Secondary Tartan Training Track', type: 'Track & Field Complex', capacity: 5000, status: 'operational', completion_percentage: 100 },
    { id: 3, name: 'Eldoret High-Altitude Gym', type: 'Gymnasium & Medical Center', capacity: 500, status: 'operational', completion_percentage: 100 },
    { id: 4, name: 'VIP Presidential Pavillion', type: 'Hospitality Box', capacity: 200, status: 'under_maintenance', completion_percentage: 95 }
  ],
  events: [
    { id: 1, name: 'Absa Kip Keino Classic - Athletics Gold', date: '2026-04-25', time: '16:00', venue_id: 1, status: 'completed', revenue: 4500000.00, tickets_sold: 18500, total_tickets: 20000 },
    { id: 2, name: 'Eldoret Marathon - Junior Trials', date: '2026-07-15', time: '07:00', venue_id: 2, status: 'scheduled', revenue: 120000.00, tickets_sold: 400, total_tickets: 1000 },
    { id: 3, name: 'AFCON 2027 Ingress Capacity Dress Rehearsal', date: '2026-10-10', time: '14:00', venue_id: 1, status: 'scheduled', revenue: 0.00, tickets_sold: 0, total_tickets: 30000 }
  ],
  inventory: [
    { id: 1, item_name: 'Elite Carbon Fiber Hurdles', category: 'Track Equipment', quantity: 40, condition_status: 'good', supplier: 'Gill Athletics' },
    { id: 2, item_name: 'Garmin Forerunner GPS Watches', category: 'Wearables & IoT', quantity: 15, condition_status: 'good', supplier: 'Garmin East Africa' },
    { id: 3, item_name: 'Premium Tartan Resurfacing Granules', category: 'Building Materials', quantity: 120, condition_status: 'new', supplier: 'Sinohydro Corp' },
    { id: 4, item_name: 'Starter Pistol & Digital Timing Boxes', category: 'Timing Gear', quantity: 4, condition_status: 'needs_replacement', supplier: 'Seiko Sports' }
  ],
  finance_logs: [
    { id: 1, type: 'income', amount: 4500000.00, category: 'Ticket Sales', reference_id: 'TX-10029', description: 'Absa Kip Keino Classic 2026 Gate Receipts', transaction_date: '2026-06-27 12:00:00' },
    { id: 2, type: 'income', amount: 12500000.00, category: 'Government Grant', reference_id: 'GR-2026-A', description: 'Ministry of Sports allocation for AFCON 2027 runway resurfacing', transaction_date: '2026-06-27 12:10:00' },
    { id: 3, type: 'expense', amount: 120000.00, category: 'Equipment Procurement', reference_id: 'PO-90221', description: 'Purchase of 15 high-altitude training spikes', transaction_date: '2026-06-27 12:20:00' },
    { id: 4, type: 'expense', amount: 345000.00, category: 'Staff Payroll', reference_id: 'PAY-2026-06', description: 'June 2026 Staff Salaries Disbursement', transaction_date: '2026-06-27 12:30:00' }
  ],
  audit_logs: [
    { id: 1, username: 'admin', action: 'Authorized database initial seed scripts execution via schema.sql', ip_address: '127.0.0.1', timestamp: '2026-06-27 12:00:00' },
    { id: 2, username: 'admin', action: 'Added athlete Faith Kipyegon to elite academy register roster', ip_address: '192.168.1.100', timestamp: '2026-06-27 12:04:22' },
    { id: 3, username: 'kipkoech_staff', action: 'Updated facility completion_percentage on VIP Pavilion to 95%', ip_address: '192.168.1.105', timestamp: '2026-06-27 12:31:12' }
  ],
  email_verification_templates: [
    { id: 'athlete-welcome', name: 'Athlete Welcome & Verification', subject: 'Verify your Eldoret Academy Athlete Profile', preheader: 'Welcome to the High-Altitude Elite Training Hub. Finish setting up your portal.', body_text: 'We are thrilled to welcome you to the Eldoret High-Altitude Athlete Academy. Your administrator has registered your elite profile. Click below to confirm your email, complete your bio, and view your assigned high-altitude training block.', button_text: 'Verify Profile & Set Password', expiry_hours: 24 },
    { id: 'staff-onboarding', name: 'Administrative Personnel Verification', subject: 'Action Required: Activate your ESMS Staff Account', preheader: 'You have been added as an administrator/staff for Eldoret Sports Management.', body_text: 'Your administrative profile has been successfully provisioned. To access the executive control decks, database panels, and scheduling calendars, please click below to confirm your identity and configure your multi-factor access credentials.', button_text: 'Activate Officer Account', expiry_hours: 12 },
    { id: 'contractor-invitation', name: 'External Engineering Access invitation', subject: 'Security Invitation: Sinohydro/KDF Construction Portal', preheader: 'Verify your credentials to submit physical facility completion updates.', body_text: 'You have been granted temporary external contractor write privileges. Please verify your email below to access structural upgrade logs, AFCON spec sheets, and floodlight grid controllers.', button_text: 'Verify Contractor Access', expiry_hours: 48 }
  ],
  users_verification_tokens: [
    { id: 'tok-771a', email: 'faith.kipyegon@academy.org', role: 'Athlete', token: 'v_88192a_0918', expiry: '2026-06-28 12:00:00', status: 'verified' },
    { id: 'tok-902b', email: 'sarah.jemutai@eldoretstadium.go.ke', role: 'Staff Coordinator', token: 'v_44901b_1102', expiry: '2026-06-28 14:30:00', status: 'pending' },
    { id: 'tok-118c', email: 'wang.wei@sinohydro.com', role: 'Contractor', token: 'v_11893c_5490', expiry: '2026-06-26 09:15:00', status: 'expired' }
  ],
  outgoing_confirmations: [
    { id: 'tx-229', recipient: 'eluid.kipchoge@marathon.org', type: 'Medical Clearance', timestamp: '2026-06-27 12:45:00', merge_data: '{"name":"Eliud Kipchoge","date":"2026-06-25","doctor_name":"Dr. Kiprop"}', status: 'sent' },
    { id: 'tx-230', recipient: 'faith.kipyegon@academy.org', type: 'Ticket Purchase', timestamp: '2026-06-27 13:12:00', merge_data: '{"name":"Faith Kipyegon","code":"MP-88129-KES","kes_amount":"2,500","event_name":"Absa Kip Keino Classic"}', status: 'sent' },
    { id: 'tx-231', recipient: 'paul.ereng@coach.org', type: 'Facility Booking', timestamp: '2026-06-27 14:15:00', merge_data: '{"name":"Paul Ereng","facility":"Secondary Tartan Training Track","date":"2026-07-02","time":"08:00 EAT"}', status: 'queued' }
  ]
};

// Generic MySQL terminal simulator & simple parser
export function simulateQuery(sqlQuery: string): { rows: any[]; fields?: any[]; affectedRows?: number } {
  const cleanSql = sqlQuery.trim().replace(/;$/, '');
  const lowerSql = cleanSql.toLowerCase();

  // Handle simple SELECT queries
  if (lowerSql.startsWith('select')) {
    // Determine which table is queried
    let tableName = '';
    const matches = lowerSql.match(/from\s+([a-zA-Z0-9_]+)/);
    if (matches && matches[1]) {
      tableName = matches[1].trim();
    }

    if (tableName && memoryDb[tableName]) {
      let filteredRows = [...memoryDb[tableName]];

      // Extremely simple WHERE clause simulation for UI needs
      const whereMatch = lowerSql.match(/where\s+([a-zA-Z0-9_]+)\s*=\s*['"]?([^'"]+)['"]?/);
      if (whereMatch && whereMatch[1] && whereMatch[2]) {
        const field = whereMatch[1].trim();
        const value = whereMatch[2].trim();
        filteredRows = filteredRows.filter(row => {
          const rowVal = row[field];
          if (rowVal === undefined || rowVal === null) return false;
          return String(rowVal).toLowerCase() === value.toLowerCase();
        });
      }

      return { rows: filteredRows };
    }
    return { rows: [] };
  }

  // Handle simple INSERT queries
  if (lowerSql.startsWith('insert into')) {
    const matches = cleanSql.match(/insert\s+into\s+([a-zA-Z0-9_]+)\s*\(([^)]+)\)\s*values\s*\(([^)]+)\)/i);
    if (matches && matches[1] && matches[2] && matches[3]) {
      const tableName = matches[1].trim();
      const fields = matches[2].split(',').map(f => f.trim().replace(/['"`]/g, ''));
      const values = matches[3].split(',').map(v => v.trim().replace(/^['"]|['"]$/g, ''));

      if (memoryDb[tableName]) {
        const newRecord: Record<string, any> = { id: memoryDb[tableName].length + 1 };
        fields.forEach((field, i) => {
          let value: any = values[i];
          if (value === 'NULL' || value === 'null') value = null;
          else if (!isNaN(Number(value))) value = Number(value);
          else if (value === 'TRUE' || value === 'true') value = true;
          else if (value === 'FALSE' || value === 'false') value = false;
          newRecord[field] = value;
        });
        memoryDb[tableName].push(newRecord);
        return { rows: [], affectedRows: 1 };
      }
    }
    return { rows: [], affectedRows: 0 };
  }

  // Handle TRUNCATE or DELETE queries
  if (lowerSql.startsWith('truncate table') || lowerSql.startsWith('delete from')) {
    const tableMatch = lowerSql.match(/(?:truncate\s+table|delete\s+from)\s+([a-zA-Z0-9_]+)/);
    if (tableMatch && tableMatch[1]) {
      const tableName = tableMatch[1].trim();
      if (memoryDb[tableName]) {
        const count = memoryDb[tableName].length;
        memoryDb[tableName] = [];
        return { rows: [], affectedRows: count };
      }
    }
  }

  return { rows: [], affectedRows: 0 };
}

// Global query execution runner with fallback mechanism
export async function query(sql: string, params?: any[]): Promise<any> {
  const activePool = await getPool();

  if (activePool && isConnected) {
    try {
      const [rows] = await activePool.query(sql, params);
      return rows;
    } catch (err: any) {
      console.error(`MySQL query execution failed, falling back to simulator:`, err);
      // If direct DB error, run in-memory simulator as a fallback
      return simulateQuery(sql).rows;
    }
  } else {
    // Connection pool offline, route directly to local cache database
    return simulateQuery(sql).rows;
  }
}
