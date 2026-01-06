const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const config = require('./config');

const app = express();

// Middleware
app.use(cors({
    origin: config.cors?.origin || ['http://localhost:8080', 'http://localhost:3001'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: config.session?.secret || 'kadjot-fitness-secret-change-this',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // set to true if using HTTPS
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
}));

// Database connection pool
let pool;

async function initDatabase() {
    try {
        pool = mysql.createPool(config.database);
        console.log('✅ MySQL connection pool created');
        
        // Test connection
        const connection = await pool.getConnection();
        console.log('✅ Database connected successfully');
        connection.release();
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1);
    }
}

// Helper function to get database connection
function getPool() {
    return pool;
}

// ======================
// API ROUTES
// ======================

// Authentication middleware
function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: 'Authentication required' });
    }
}

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        database: pool ? 'connected' : 'disconnected',
        authenticated: !!req.session?.userId
    });
});

// ====================
// AUTHENTICATION ROUTES
// ====================

// Register new user
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }
        
        // Check if user already exists
        const [existing] = await pool.query(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username, email]
        );
        
        if (existing.length > 0) {
            return res.status(409).json({ error: 'Username or email already exists' });
        }
        
        // Hash password
        const password_hash = await bcrypt.hash(password, 10);
        
        // Create user
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, password_hash]
        );
        
        // Create session
        req.session.userId = result.insertId;
        req.session.username = username;
        
        res.json({ 
            success: true, 
            user: {
                id: result.insertId,
                username,
                email
            },
            message: 'Registration successful' 
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        
        // Find user
        const [users] = await pool.query(
            'SELECT id, username, email, password_hash FROM users WHERE username = ? OR email = ?',
            [username, username]
        );
        
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        
        const user = users[0];
        
        // Verify password
        const isValid = await bcrypt.compare(password, user.password_hash);
        
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        
        // Create session
        req.session.userId = user.id;
        req.session.username = user.username;
        
        res.json({ 
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            message: 'Login successful'
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Get current user
app.get('/api/auth/me', requireAuth, async (req, res) => {
    try {
        const [users] = await pool.query(
            'SELECT id, username, email, created_at FROM users WHERE id = ?',
            [req.session.userId]
        );
        
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({ user: users[0] });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// ====================
// PROGRAM ROUTES
// ====================

// Get active program (guest mode: user_id = 1, or logged-in user)
app.get('/api/programs/active', async (req, res) => {
    try {
        const userId = req.session.userId || 1; // Guest user ID = 1
        const [rows] = await pool.query(
            'SELECT * FROM programs WHERE user_id = ? AND status = ? ORDER BY created_at DESC LIMIT 1',
            [userId, 'active']
        );
        
        if (rows.length === 0) {
            return res.json({ program: null });
        }
        
        res.json({ program: rows[0] });
    } catch (error) {
        console.error('Error fetching program:', error);
        res.status(500).json({ error: 'Failed to fetch program' });
    }
});

// Create new program (guest mode or logged-in user)
app.post('/api/programs', async (req, res) => {
    try {
        const { start_date, day_start_time } = req.body;
        const user_id = req.session.userId || 1; // Guest user ID = 1
        
        // Set any existing active programs to 'reset'
        await pool.query(
            'UPDATE programs SET status = ? WHERE user_id = ? AND status = ?',
            ['reset', user_id, 'active']
        );
        
        const [result] = await pool.query(
            'INSERT INTO programs (user_id, start_date, day_start_time, status) VALUES (?, ?, ?, ?)',
            [user_id, start_date, day_start_time || '05:00:00', 'active']
        );
        
        // Create initial stats record
        await pool.query(
            'INSERT INTO program_stats (program_id) VALUES (?)',
            [result.insertId]
        );
        
        res.json({ 
            success: true, 
            program_id: result.insertId,
            message: 'Program created successfully'
        });
    } catch (error) {
        console.error('Error creating program:', error);
        res.status(500).json({ error: 'Failed to create program' });
    }
});

// Update program (week, phase, etc.)
app.put('/api/programs/:id', async (req, res) => {
    try {
        const { current_week, current_phase, status } = req.body;
        
        await pool.query(
            'UPDATE programs SET current_week = ?, current_phase = ?, status = ?, updated_at = NOW() WHERE id = ?',
            [current_week, current_phase, status, req.params.id]
        );
        
        res.json({ success: true, message: 'Program updated' });
    } catch (error) {
        console.error('Error updating program:', error);
        res.status(500).json({ error: 'Failed to update program' });
    }
});

// ====================
// DAY PLAN ROUTES
// ====================

// Get day plan for specific date
app.get('/api/programs/:programId/day-plans/:date', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM day_plans WHERE program_id = ? AND plan_date = ?',
            [req.params.programId, req.params.date]
        );
        
        res.json({ day_plan: rows[0] || null });
    } catch (error) {
        console.error('Error fetching day plan:', error);
        res.status(500).json({ error: 'Failed to fetch day plan' });
    }
});

// Get all day plans for a program
app.get('/api/programs/:programId/day-plans', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM day_plans WHERE program_id = ? ORDER BY plan_date DESC',
            [req.params.programId]
        );
        
        res.json({ day_plans: rows });
    } catch (error) {
        console.error('Error fetching day plans:', error);
        res.status(500).json({ error: 'Failed to fetch day plans' });
    }
});

// Create day plan
app.post('/api/programs/:programId/day-plans', async (req, res) => {
    try {
        const { plan_date, program_day, program_week, day_of_cycle } = req.body;
        
        const [result] = await pool.query(
            'INSERT INTO day_plans (program_id, plan_date, program_day, program_week, day_of_cycle, is_generated, generated_at) VALUES (?, ?, ?, ?, ?, TRUE, NOW())',
            [req.params.programId, plan_date, program_day, program_week, day_of_cycle]
        );
        
        // Get activities for this day of cycle
        const [activities] = await pool.query(
            'SELECT * FROM activities WHERE day_of_cycle = ?',
            [day_of_cycle]
        );
        
        // Create activity progress records
        for (const activity of activities) {
            await pool.query(
                'INSERT INTO activity_progress (day_plan_id, activity_id, status) VALUES (?, ?, ?)',
                [result.insertId, activity.id, 'scheduled']
            );
        }
        
        res.json({ 
            success: true, 
            day_plan_id: result.insertId,
            activities_count: activities.length
        });
    } catch (error) {
        console.error('Error creating day plan:', error);
        res.status(500).json({ error: 'Failed to create day plan' });
    }
});

// ====================
// ACTIVITY ROUTES
// ====================

// Get all activities (templates)
app.get('/api/activities', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM activities ORDER BY day_of_cycle, time_of_day');
        res.json({ activities: rows });
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});

// Get activities for specific day of cycle
app.get('/api/activities/day/:dayOfCycle', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM activities WHERE day_of_cycle = ? ORDER BY time_of_day',
            [req.params.dayOfCycle]
        );
        res.json({ activities: rows });
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});

// ====================
// ACTIVITY PROGRESS ROUTES
// ====================

// Get progress for a day plan
app.get('/api/day-plans/:dayPlanId/progress', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                ap.*,
                a.name, a.activity_type, a.duration_minutes, a.description, 
                a.instructions_url, a.time_of_day, a.is_flexible, a.is_optional
            FROM activity_progress ap
            JOIN activities a ON a.id = ap.activity_id
            WHERE ap.day_plan_id = ?
            ORDER BY a.time_of_day
        `, [req.params.dayPlanId]);
        
        res.json({ progress: rows });
    } catch (error) {
        console.error('Error fetching progress:', error);
        res.status(500).json({ error: 'Failed to fetch progress' });
    }
});

// Update activity progress (mark complete/incomplete)
app.put('/api/activity-progress/:id', async (req, res) => {
    try {
        const { status, notes } = req.body;
        const completed_at = status === 'completed' ? new Date() : null;
        
        await pool.query(
            'UPDATE activity_progress SET status = ?, completed_at = ?, notes = ?, updated_at = NOW() WHERE id = ?',
            [status, completed_at, notes, req.params.id]
        );
        
        res.json({ success: true, message: 'Progress updated' });
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({ error: 'Failed to update progress' });
    }
});

// Toggle activity completion
app.post('/api/activity-progress/toggle', async (req, res) => {
    try {
        const { day_plan_id, activity_id, completed } = req.body;
        
        // Check if progress record exists
        const [existing] = await pool.query(
            'SELECT id, status FROM activity_progress WHERE day_plan_id = ? AND activity_id = ?',
            [day_plan_id, activity_id]
        );
        
        if (existing.length === 0) {
            // Create new progress record
            await pool.query(
                'INSERT INTO activity_progress (day_plan_id, activity_id, status, completed_at) VALUES (?, ?, ?, ?)',
                [day_plan_id, activity_id, completed ? 'completed' : 'scheduled', completed ? new Date() : null]
            );
        } else {
            // Update existing
            await pool.query(
                'UPDATE activity_progress SET status = ?, completed_at = ?, updated_at = NOW() WHERE id = ?',
                [completed ? 'completed' : 'missed', completed ? new Date() : null, existing[0].id]
            );
        }
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error toggling progress:', error);
        res.status(500).json({ error: 'Failed to toggle progress' });
    }
});

// ====================
// STATISTICS ROUTES
// ====================

// Get program statistics
app.get('/api/programs/:programId/stats', async (req, res) => {
    try {
        const [stats] = await pool.query(
            'SELECT * FROM program_stats WHERE program_id = ?',
            [req.params.programId]
        );
        
        // Calculate real-time stats
        const [progress] = await pool.query(`
            SELECT 
                COUNT(DISTINCT dp.id) as total_days,
                COUNT(DISTINCT ap.id) as total_activities,
                COUNT(DISTINCT CASE WHEN ap.status = 'completed' THEN ap.id END) as completed_activities,
                ROUND(COUNT(DISTINCT CASE WHEN ap.status = 'completed' THEN ap.id END) * 100.0 / NULLIF(COUNT(DISTINCT ap.id), 0), 2) as completion_rate
            FROM day_plans dp
            LEFT JOIN activity_progress ap ON ap.day_plan_id = dp.id
            WHERE dp.program_id = ?
        `, [req.params.programId]);
        
        res.json({ 
            stats: stats[0] || {},
            real_time: progress[0]
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// ====================
// START SERVER
// ====================

async function startServer() {
    await initDatabase();
    
    app.listen(config.server.port, () => {
        console.log(`
╔═══════════════════════════════════════╗
║   🏋️  Kadjot Fitness API Server      ║
╠═══════════════════════════════════════╣
║   Port: ${config.server.port}                        ║
║   Environment: ${config.server.env}           ║
║   Database: ${config.database.database}    ║
║   CORS: ${config.cors.origin}   ║
╚═══════════════════════════════════════╝
        `);
    });
}

// Error handling
process.on('unhandledRejection', (error) => {
    console.error('Unhandled rejection:', error);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\nShutting down gracefully...');
    if (pool) {
        await pool.end();
    }
    process.exit(0);
});

// Start the server
startServer();

module.exports = { app, getPool };
