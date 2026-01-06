-- Kadjot Fitness Database Schema
-- MySQL Database for Progressive 12-Week Core Program

DROP DATABASE IF EXISTS kadjot_fitness;
CREATE DATABASE kadjot_fitness CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kadjot_fitness;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB;

-- Programs table (12-week training program instance)
CREATE TABLE programs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    start_date DATE NOT NULL,
    day_start_time TIME DEFAULT '05:00:00',
    current_week INT DEFAULT 1,
    current_phase VARCHAR(50) DEFAULT 'Foundation',
    status ENUM('active', 'paused', 'completed', 'reset') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_status (user_id, status),
    INDEX idx_start_date (start_date)
) ENGINE=InnoDB;

-- Activity definitions (template for all activities)
CREATE TABLE activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    activity_type ENUM('core', 'running', 'gym', 'desk_reset', 'mobility') NOT NULL,
    duration_minutes INT NOT NULL,
    description TEXT,
    instructions_url VARCHAR(255),
    day_of_cycle INT NOT NULL COMMENT '0=Monday, 1=Tuesday, etc.',
    time_of_day TIME NOT NULL,
    is_flexible BOOLEAN DEFAULT FALSE,
    is_optional BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_day_cycle (day_of_cycle),
    INDEX idx_type (activity_type)
) ENGINE=InnoDB;

-- Day plans (daily workout records)
CREATE TABLE day_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    program_id INT NOT NULL,
    plan_date DATE NOT NULL,
    program_day INT NOT NULL COMMENT 'Day number in program (0-based)',
    program_week INT NOT NULL,
    day_of_cycle INT NOT NULL COMMENT '0=Monday, 1=Tuesday, etc.',
    is_generated BOOLEAN DEFAULT FALSE,
    generated_at TIMESTAMP NULL,
    FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE,
    UNIQUE KEY unique_program_date (program_id, plan_date),
    INDEX idx_program_date (program_id, plan_date),
    INDEX idx_program_week (program_id, program_week)
) ENGINE=InnoDB;

-- Activity progress (tracks completion of individual activities)
CREATE TABLE activity_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    day_plan_id INT NOT NULL,
    activity_id INT NOT NULL,
    status ENUM('scheduled', 'upcoming', 'now', 'missed', 'completed') DEFAULT 'scheduled',
    completed_at TIMESTAMP NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (day_plan_id) REFERENCES day_plans(id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
    UNIQUE KEY unique_day_activity (day_plan_id, activity_id),
    INDEX idx_status (status),
    INDEX idx_completed (completed_at)
) ENGINE=InnoDB;

-- Program statistics (aggregated stats)
CREATE TABLE program_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    program_id INT NOT NULL,
    total_workouts INT DEFAULT 0,
    total_activities_completed INT DEFAULT 0,
    current_streak_days INT DEFAULT 0,
    longest_streak_days INT DEFAULT 0,
    weekly_completion_rate DECIMAL(5,2) DEFAULT 0.00,
    overall_completion_rate DECIMAL(5,2) DEFAULT 0.00,
    last_calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE,
    UNIQUE KEY unique_program_stats (program_id)
) ENGINE=InnoDB;

-- Calendar events (for .ics generation tracking)
CREATE TABLE calendar_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    program_id INT NOT NULL,
    event_date DATE NOT NULL,
    activity_id INT NOT NULL,
    downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
    INDEX idx_program_date (program_id, event_date)
) ENGINE=InnoDB;

-- Insert default activity templates (7-day cycle)
INSERT INTO activities (name, activity_type, duration_minutes, description, instructions_url, day_of_cycle, time_of_day, is_flexible, is_optional) VALUES
-- Day 1 (Monday)
('Core Workout', 'core', 15, 'Dead Bug, Glute Bridge, Side Plank, Bird Dog', '../DETAILED_CORE_PROGRAM.html#core-workout', 0, '05:15:00', FALSE, FALSE),
('Lunch Desk Reset', 'desk_reset', 8, 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', '../DETAILED_CORE_PROGRAM.html#daily-desk-reset', 0, '12:00:00', FALSE, FALSE),
('Afternoon Desk Reset', 'desk_reset', 8, 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', '../DETAILED_CORE_PROGRAM.html#daily-desk-reset', 0, '15:00:00', FALSE, FALSE),

-- Day 2 (Tuesday)
('Beach/Sand Running', 'running', 30, 'Packed sand, easy pace, midfoot landing - Run both directions', '../DETAILED_CORE_PROGRAM.html#running-protocol', 1, '05:15:00', FALSE, FALSE),
('Lunch Desk Reset', 'desk_reset', 8, 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', '../DETAILED_CORE_PROGRAM.html#daily-desk-reset', 1, '12:00:00', FALSE, FALSE),
('Afternoon Desk Reset', 'desk_reset', 8, 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', '../DETAILED_CORE_PROGRAM.html#daily-desk-reset', 1, '15:00:00', FALSE, FALSE),

-- Day 3 (Wednesday)
('Lunch Desk Reset', 'desk_reset', 8, 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', '../DETAILED_CORE_PROGRAM.html#daily-desk-reset', 2, '12:00:00', FALSE, FALSE),
('Afternoon Desk Reset', 'desk_reset', 8, 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', '../DETAILED_CORE_PROGRAM.html#daily-desk-reset', 2, '15:00:00', FALSE, FALSE),
('Gym Workout', 'gym', 60, 'Leg Press, Cable Row, Goblet Squat, Back Extension', '../DETAILED_CORE_PROGRAM.html#gym-workout', 2, '18:00:00', FALSE, FALSE),

-- Day 4 (Thursday)
('Core Workout', 'core', 15, 'Dead Bug, Glute Bridge, Side Plank, Bird Dog', '../DETAILED_CORE_PROGRAM.html#core-workout', 3, '05:15:00', FALSE, FALSE),
('Lunch Desk Reset', 'desk_reset', 8, 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', '../DETAILED_CORE_PROGRAM.html#daily-desk-reset', 3, '12:00:00', FALSE, FALSE),
('Afternoon Desk Reset', 'desk_reset', 8, 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', '../DETAILED_CORE_PROGRAM.html#daily-desk-reset', 3, '15:00:00', FALSE, FALSE),

-- Day 5 (Friday)
('Lunch Desk Reset', 'desk_reset', 8, 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', '../DETAILED_CORE_PROGRAM.html#daily-desk-reset', 4, '12:00:00', FALSE, FALSE),
('Afternoon Desk Reset', 'desk_reset', 8, 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', '../DETAILED_CORE_PROGRAM.html#daily-desk-reset', 4, '15:00:00', FALSE, FALSE),
('Mobility & Stretching', 'mobility', 12, 'Cat-Cow, Child\'s Pose, Knees-to-Chest', '../DETAILED_CORE_PROGRAM.html#mobility-stretching', 4, '19:00:00', FALSE, FALSE),

-- Day 6 (Saturday)
('Beach/Sand Running (Flexible)', 'running', 30, 'Packed or soft sand, easy pace - Do anytime today', '../DETAILED_CORE_PROGRAM.html#running-protocol', 5, '09:00:00', TRUE, FALSE),
('Gym Workout (Flexible)', 'gym', 60, 'Leg Press, Cable Row, Goblet Squat - Do anytime today', '../DETAILED_CORE_PROGRAM.html#gym-workout', 5, '10:00:00', TRUE, FALSE),

-- Day 7 (Sunday)
('Mobility & Stretching (Optional)', 'mobility', 12, 'Light stretching - Do if you feel like it', '../DETAILED_CORE_PROGRAM.html#mobility-stretching', 6, '10:00:00', TRUE, TRUE);

-- Create a default demo user (password: 'demo123')
-- Note: In production, use proper password hashing (bcrypt)
INSERT INTO users (username, email, password_hash) VALUES
('demo', 'demo@kadjot.fitness', '$2b$10$K7L/xqRlXM1j5K5K5K5K5K5K5K5K5K5K5K5K5K5K5K5K5K5K5K5K5');

-- Create views for common queries

-- View: Daily activities for a program
CREATE VIEW v_daily_activities AS
SELECT 
    dp.id as day_plan_id,
    dp.program_id,
    dp.plan_date,
    dp.program_day,
    dp.program_week,
    a.id as activity_id,
    a.name as activity_name,
    a.activity_type,
    a.duration_minutes,
    a.description,
    a.instructions_url,
    a.time_of_day,
    a.is_flexible,
    a.is_optional,
    COALESCE(ap.status, 'scheduled') as status,
    ap.completed_at,
    ap.notes
FROM day_plans dp
CROSS JOIN activities a ON a.day_of_cycle = dp.day_of_cycle
LEFT JOIN activity_progress ap ON ap.day_plan_id = dp.id AND ap.activity_id = a.id;

-- View: Program progress summary
CREATE VIEW v_program_progress AS
SELECT 
    p.id as program_id,
    p.user_id,
    p.start_date,
    p.current_week,
    p.current_phase,
    p.status,
    DATEDIFF(CURDATE(), p.start_date) as days_in_program,
    COUNT(DISTINCT dp.id) as total_days_generated,
    COUNT(DISTINCT CASE WHEN ap.status = 'completed' THEN ap.id END) as total_activities_completed,
    COUNT(DISTINCT dp.id) as total_activities_scheduled,
    ROUND(COUNT(DISTINCT CASE WHEN ap.status = 'completed' THEN ap.id END) * 100.0 / NULLIF(COUNT(DISTINCT dp.id), 0), 2) as completion_percentage
FROM programs p
LEFT JOIN day_plans dp ON dp.program_id = p.id
LEFT JOIN activity_progress ap ON ap.day_plan_id = dp.id
WHERE p.status = 'active'
GROUP BY p.id, p.user_id, p.start_date, p.current_week, p.current_phase, p.status;

-- Indexes for performance
CREATE INDEX idx_activity_progress_status ON activity_progress(day_plan_id, status);
CREATE INDEX idx_day_plans_program_week ON day_plans(program_id, program_week);

COMMIT;
