-- Eldoret Sports Management System (ESMS)
-- MySQL Database Schema & Seed Data
-- Database Name: esms_db

CREATE DATABASE IF NOT EXISTS esms_db;
USE esms_db;

-- 1. Users Table (Authentication and Role-based Access Control)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('admin', 'staff', 'coach', 'athlete') NOT NULL DEFAULT 'staff',
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Staff Table (Personnel & Management)
CREATE TABLE IF NOT EXISTS staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    shift VARCHAR(50) NOT NULL,
    status ENUM('active', 'on_leave', 'terminated') NOT NULL DEFAULT 'active',
    hire_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 3. Athletes Table (Training & Academy)
CREATE TABLE IF NOT EXISTS athletes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    discipline VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    coach_id INT,
    status ENUM('active', 'injured', 'suspended', 'retired') NOT NULL DEFAULT 'active',
    medical_clearance BOOLEAN DEFAULT TRUE,
    joined_date DATE NOT NULL
);

-- 4. Athlete Performance Records
CREATE TABLE IF NOT EXISTS performance_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    athlete_id INT NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    mark VARCHAR(20) NOT NULL, -- timing (e.g., "1:42.15") or distance (e.g. "8.32m")
    wind_speed DECIMAL(3, 2),
    location VARCHAR(100) NOT NULL,
    recorded_date DATE NOT NULL,
    FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE
);

-- 5. Facilities & Venue Infrastructure Table
CREATE TABLE IF NOT EXISTS facilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    capacity INT NOT NULL,
    status ENUM('operational', 'under_maintenance', 'closed') NOT NULL DEFAULT 'operational',
    completion_percentage INT DEFAULT 100,
    last_maintained TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 6. Events & Competitions Table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(10) NOT NULL,
    venue_id INT,
    status ENUM('scheduled', 'live', 'completed', 'cancelled') NOT NULL DEFAULT 'scheduled',
    revenue KES DECIMAL(12, 2) DEFAULT 0.00,
    tickets_sold INT DEFAULT 0,
    total_tickets INT NOT NULL,
    FOREIGN KEY (venue_id) REFERENCES facilities(id) ON DELETE SET NULL
);

-- 7. Inventory & Logistics Table
CREATE TABLE IF NOT EXISTS inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    condition_status ENUM('new', 'good', 'needs_replacement') NOT NULL DEFAULT 'good',
    supplier VARCHAR(100),
    last_checked TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 8. Finance & Sponsorship Ledger Table
CREATE TABLE IF NOT EXISTS finance_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('income', 'expense') NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    reference_id VARCHAR(50),
    description TEXT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. System Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    action VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Email Verification Templates Table
CREATE TABLE IF NOT EXISTS email_verification_templates (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    preheader TEXT,
    body_text TEXT NOT NULL,
    button_text VARCHAR(100) NOT NULL,
    expiry_hours INT DEFAULT 24
);

-- 11. Users Verification Tokens Table
CREATE TABLE IF NOT EXISTS users_verification_tokens (
    id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expiry DATETIME NOT NULL,
    status ENUM('pending', 'verified', 'expired') DEFAULT 'pending'
);

-- 12. Outgoing Confirmations Table
CREATE TABLE IF NOT EXISTS outgoing_confirmations (
    id VARCHAR(50) PRIMARY KEY,
    recipient VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    merge_data TEXT NOT NULL, -- Serialized key-value block
    status ENUM('queued', 'sent', 'failed') DEFAULT 'queued'
);


-- ==================== SEED RECORDS ====================

-- Seed Users (Admin Account: admin / Kipkoech)
INSERT INTO users (id, username, password, email, role, status) VALUES
(1, 'ian', '$2b$10$gVU7CaGN8e8eIFfJazjX/OdxqkBn64FIsBX37IwFPoKbE1VrnA7eq', 'admin@kipkeino.co.ke', 'admin', 'active'),
(2, 'kipkoech_staff', '$2b$10$gVU7CaGN8e8eIFfJazjX/OdxqkBn64FIsBX37IwFPoKbE1VrnA7eq', 'kipkoech.staff@eldoretstadium.go.ke', 'staff', 'active'),
(3, 'coach_paul', '$2b$10$gVU7CaGN8e8eIFfJazjX/OdxqkBn64FIsBX37IwFPoKbE1VrnA7eq', 'paul.ereng@academy.org', 'coach', 'active'),
(4, 'athlete_kemboi', '$2b$10$gVU7CaGN8e8eIFfJazjX/OdxqkBn64FIsBX37IwFPoKbE1VrnA7eq', 'ezekiel@kemboi.com', 'athlete', 'active');

-- Seed Staff
INSERT INTO staff (user_id, name, role, department, salary, shift, status, hire_date) VALUES
(1, 'Kipkoech Kiprop', 'Chief Administrator', 'Executive Board', 150000.00, 'Day-Shift (08:00 - 17:00)', 'active', '2024-01-15'),
(2, 'Sarah Jemutai', 'Lead Event Coordinator', 'Operations', 85000.00, 'Flexible (Event-driven)', 'active', '2024-06-01'),
(3, 'Julius Keter', 'Head Facility Groundkeeper', 'Maintenance', 45000.00, 'Day-Shift (06:00 - 15:00)', 'active', '2023-03-10'),
(NULL, 'Mercy Chelimo', 'Financial Controller', 'Finance Department', 110000.00, 'Day-Shift (08:00 - 17:00)', 'active', '2025-01-10');

-- Seed Athletes
INSERT INTO athletes (id, name, discipline, age, coach_id, status, medical_clearance, joined_date) VALUES
(1, 'Ezekiel Kemboi', '3000m Steeplechase', 42, 3, 'active', TRUE, '2020-05-12'),
(2, 'Faith Kipyegon', '1500m Gold Elite', 32, 3, 'active', TRUE, '2021-08-20'),
(3, 'Eliud Kipchoge', 'Marathon Elite', 41, 3, 'active', TRUE, '2018-02-14'),
(4, 'Emmanuel Wanyonyi', '800m', 21, 3, 'active', TRUE, '2023-01-01'),
(5, 'Kelvin Kiptum', 'Marathon Elite', 24, 3, 'retired', FALSE, '2022-11-05');

-- Seed Performance Records
INSERT INTO performance_records (athlete_id, event_name, mark, wind_speed, location, recorded_date) VALUES
(1, 'Olympic Games Athens', '8:05.81', NULL, 'Athens, Greece', '2004-08-24'),
(2, 'Paris Diamond League', '3:49.04', NULL, 'Paris, France', '2024-07-07'),
(3, 'Berlin Marathon', '2:01:09', NULL, 'Berlin, Germany', '2022-09-25'),
(4, 'Absa Kip Keino Classic', '1:42.15', 1.2, 'Eldoret, Kenya', '2024-04-20');

-- Seed Facilities
INSERT INTO facilities (id, name, type, capacity, status, completion_percentage) VALUES
(1, 'Kipchoge Keino Main Stadium', 'Athletics & Soccer Arena', 30000, 'operational', 85),
(2, 'Secondary Tartan Training Track', 'Track & Field Complex', 5000, 'operational', 100),
(3, 'Eldoret High-Altitude Gym', 'Gymnasium & Medical Center', 500, 'operational', 100),
(4, 'VIP Presidential Pavillion', 'Hospitality Box', 200, 'under_maintenance', 95);

-- Seed Events
INSERT INTO events (name, date, time, venue_id, status, revenue, tickets_sold, total_tickets) VALUES
('Absa Kip Keino Classic - Athletics Gold', '2026-04-25', '16:00', 1, 'completed', 4500000.00, 18500, 20000),
('Eldoret Marathon - Junior Trials', '2026-07-15', '07:00', 2, 'scheduled', 120000.00, 400, 1000),
('AFCON 2027 Ingress Capacity Dress Rehearsal', '2026-10-10', '14:00', 1, 'scheduled', 0.00, 0, 30000);

-- Seed Inventory
INSERT INTO inventory (item_name, category, quantity, condition_status, supplier) VALUES
('Elite Carbon Fiber Hurdles', 'Track Equipment', 40, 'good', 'Gill Athletics'),
('Garmin Forerunner GPS Watches', 'Wearables & IoT', 15, 'good', 'Garmin East Africa'),
('Premium Tartan Resurfacing Granules', 'Building Materials', 120, 'new', 'Sinohydro Corp'),
('Starter Pistol & Digital Timing Boxes', 'Timing Gear', 4, 'needs_replacement', 'Seiko Sports');

-- Seed Finance Logs
INSERT INTO finance_logs (type, amount, category, reference_id, description) VALUES
('income', 4500000.00, 'Ticket Sales', 'TX-10029', 'Absa Kip Keino Classic 2026 Gate Receipts'),
('income', 12500000.00, 'Government Grant', 'GR-2026-A', 'Ministry of Sports allocation for AFCON 2027 runway resurfacing'),
('expense', 120000.00, 'Equipment Procurement', 'PO-90221', 'Purchase of 15 high-altitude training spikes'),
('expense', 345000.00, 'Staff Payroll', 'PAY-2026-06', 'June 2026 Staff Salaries Disbursement');

-- Seed System Audit Logs
INSERT INTO audit_logs (username, action, ip_address) VALUES
('admin', 'Authorized database initial seed scripts execution', '127.0.0.1'),
('admin', 'Added athlete Faith Kipyegon to roster', '192.168.1.100'),
('kipkoech_staff', 'Updated completion_percentage on VIP Pavilion to 95%', '192.168.1.105');

-- Seed Email Verification Templates
INSERT INTO email_verification_templates (id, name, subject, preheader, body_text, button_text, expiry_hours) VALUES
('athlete-welcome', 'Athlete Welcome & Verification', 'Verify your Eldoret Academy Athlete Profile', 'Welcome to the High-Altitude Elite Training Hub. Finish setting up your portal.', 'We are thrilled to welcome you to the Eldoret High-Altitude Athlete Academy. Your administrator has registered your elite profile. Click below to confirm your email, complete your bio, and view your assigned high-altitude training block.', 'Verify Profile & Set Password', 24),
('staff-onboarding', 'Administrative Personnel Verification', 'Action Required: Activate your ESMS Staff Account', 'You have been added as an administrator/staff for Eldoret Sports Management.', 'Your administrative profile has been successfully provisioned. To access the executive control decks, database panels, and scheduling calendars, please click below to confirm your identity and configure your multi-factor access credentials.', 'Activate Officer Account', 12),
('contractor-invitation', 'External Engineering Access invitation', 'Security Invitation: Sinohydro/KDF Construction Portal', 'Verify your credentials to submit physical facility completion updates.', 'You have been granted temporary external contractor write privileges. Please verify your email below to access structural upgrade logs, AFCON spec sheets, and floodlight grid controllers.', 'Verify Contractor Access', 48);

-- Seed Users Verification Tokens
INSERT INTO users_verification_tokens (id, email, role, token, expiry, status) VALUES
('tok-771a', 'faith.kipyegon@academy.org', 'Athlete', 'v_88192a_0918', '2026-06-28 12:00:00', 'verified'),
('tok-902b', 'sarah.jemutai@eldoretstadium.go.ke', 'Staff Coordinator', 'v_44901b_1102', '2026-06-28 14:30:00', 'pending'),
('tok-118c', 'wang.wei@sinohydro.com', 'Contractor', 'v_11893c_5490', '2026-06-26 09:15:00', 'expired');

-- Seed Outgoing Confirmations
INSERT INTO outgoing_confirmations (id, recipient, type, timestamp, merge_data, status) VALUES
('tx-229', 'eluid.kipchoge@marathon.org', 'Medical Clearance', '2026-06-27 12:45:00', '{"name":"Eliud Kipchoge","date":"2026-06-25","doctor_name":"Dr. Kiprop"}', 'sent'),
('tx-230', 'faith.kipyegon@academy.org', 'Ticket Purchase', '2026-06-27 13:12:00', '{"name":"Faith Kipyegon","code":"MP-88129-KES","kes_amount":"2,500","event_name":"Absa Kip Keino Classic"}', 'sent'),
('tx-231', 'paul.ereng@coach.org', 'Facility Booking', '2026-06-27 14:15:00', '{"name":"Paul Ereng","facility":"Secondary Tartan Training Track","date":"2026-07-02","time":"08:00 EAT"}', 'queued');
