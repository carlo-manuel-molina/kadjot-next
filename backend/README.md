# Kadjot Fitness Backend API

Node.js/Express backend with MySQL for state management.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd ~/Sites/kadjot/backend
npm install
```

### 2. Initialize Database
```bash
mysql -u root -proot < schema.sql
```

Or from MySQL command line:
```sql
source schema.sql;
```

### 3. Start Server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## 📊 Database Schema

### Tables:
- **users** - User accounts
- **programs** - 12-week program instances
- **activities** - Activity templates (7-day cycle)
- **day_plans** - Daily workout records
- **activity_progress** - Individual activity completion tracking
- **program_stats** - Aggregated statistics
- **calendar_events** - Calendar download tracking

### Views:
- **v_daily_activities** - All activities for a day with progress
- **v_program_progress** - Program completion summary

## 🔌 API Endpoints

### Health
- `GET /api/health` - Server health check

### Programs
- `GET /api/programs/:userId/active` - Get active program for user
- `POST /api/programs` - Create new program
- `PUT /api/programs/:id` - Update program

### Day Plans
- `GET /api/programs/:programId/day-plans` - Get all day plans
- `GET /api/programs/:programId/day-plans/:date` - Get specific day plan
- `POST /api/programs/:programId/day-plans` - Create day plan

### Activities
- `GET /api/activities` - Get all activity templates
- `GET /api/activities/day/:dayOfCycle` - Get activities for specific day (0-6)

### Activity Progress
- `GET /api/day-plans/:dayPlanId/progress` - Get progress for day
- `PUT /api/activity-progress/:id` - Update activity status
- `POST /api/activity-progress/toggle` - Toggle completion

### Statistics
- `GET /api/programs/:programId/stats` - Get program statistics

## 🧪 Testing API

### Using curl:

**Create a program:**
```bash
curl -X POST http://localhost:3000/api/programs \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "start_date": "2026-01-06",
    "day_start_time": "05:00:00"
  }'
```

**Get active program:**
```bash
curl http://localhost:3000/api/programs/1/active
```

**Create today's day plan:**
```bash
curl -X POST http://localhost:3000/api/programs/1/day-plans \
  -H "Content-Type: application/json" \
  -d '{
    "plan_date": "2026-01-06",
    "program_day": 0,
    "program_week": 1,
    "day_of_cycle": 0
  }'
```

**Toggle activity completion:**
```bash
curl -X POST http://localhost:3000/api/activity-progress/toggle \
  -H "Content-Type: application/json" \
  -d '{
    "day_plan_id": 1,
    "activity_id": 1,
    "completed": true
  }'
```

## 🔧 Configuration

Edit `config.js` to change:
- Server port (default: 3000)
- Database credentials
- CORS settings

## 📦 Dependencies

- **express** - Web framework
- **mysql2** - MySQL client with promises
- **cors** - Cross-origin resource sharing
- **bcrypt** - Password hashing (for future auth)
- **express-validator** - Input validation

## 🗄️ Default Data

The schema includes:
- ✅ 18 activity templates (7-day cycle)
- ✅ Demo user (username: `demo`)
- ✅ Views for common queries

## 🔐 Security Notes

- Change password hashing in production
- Add JWT authentication
- Validate all inputs
- Use HTTPS in production
- Add rate limiting

## 📊 Database Queries

### Check program progress:
```sql
SELECT * FROM v_program_progress WHERE user_id = 1;
```

### See today's activities:
```sql
SELECT * FROM v_daily_activities 
WHERE program_id = 1 AND plan_date = CURDATE();
```

### Get completion stats:
```sql
SELECT 
    status, 
    COUNT(*) as count 
FROM activity_progress 
WHERE day_plan_id IN (SELECT id FROM day_plans WHERE program_id = 1)
GROUP BY status;
```

## 🚨 Troubleshooting

### Can't connect to database?
1. Check MySQL is running: `mysql.server status`
2. Verify credentials in `config.js`
3. Test connection: `mysql -u root -proot`

### Database doesn't exist?
```bash
mysql -u root -proot < schema.sql
```

### Port 3000 in use?
Change port in `config.js` or:
```bash
PORT=3001 npm start
```

## 📝 Next Steps

1. Update frontend to use API instead of localStorage
2. Add user authentication
3. Add data validation
4. Add error logging
5. Add unit tests
6. Deploy to production server

---

**Server Ready!** Access at: http://localhost:3000/api/health
