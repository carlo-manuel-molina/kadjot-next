# ⚡ Quick Reference - Kadjot Fitness

**For developers and experienced users**

---

## 🚀 TL;DR Setup

```bash
# Prerequisites: Node.js 18+, MySQL 8+

# Clone & Install
git clone https://github.com/carlo-manuel-molina/kadjot-next.git
cd kadjot-next
npm install && cd backend && npm install && cd ..

# Database
mysql -u root -p < backend/schema.sql

# Config
cp backend/config.example.js backend/config.js
# Edit backend/config.js with your MySQL credentials

# Run
./start.sh  # Mac/Linux
# or run backend and frontend separately on Windows

# Access
http://localhost:3001
```

---

## 📂 Project Structure

```
kadjot-next/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main dashboard
│   ├── login/page.tsx     # Login page
│   ├── register/page.tsx  # Registration page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── auth/AuthUI.tsx           # Auth buttons & user greeting
│   ├── dashboard/
│   │   ├── ProgramSetup.tsx      # Start date/time picker
│   │   ├── ProgressStats.tsx     # Week/phase/progress cards
│   │   ├── TodaysActivities.tsx  # Daily activity list
│   │   ├── QuickActions.tsx      # Export/calendar buttons
│   │   └── ActivityCard.tsx      # Individual activity display
│   └── ui/Modal.tsx              # Modal component
├── contexts/
│   ├── AuthContext.tsx    # Authentication state
│   └── ProgramContext.tsx # Program data & activities
├── lib/
│   ├── hooks/
│   │   ├── useActivities.ts      # Activity status logic
│   │   └── useProgramStats.ts    # Progress calculations
│   ├── types/index.ts            # TypeScript definitions
│   └── utils/
│       ├── api.ts                # API client
│       ├── constants.ts          # Activities & phases
│       └── activityHelpers.ts    # Status/UI helpers
├── backend/
│   ├── server.js          # Express API server
│   ├── schema.sql         # MySQL database schema
│   └── config.js          # DB & CORS config (create from example)
└── public/                # Static files & exercise guides
```

---

## 🔧 Tech Stack

**Frontend:**
- Next.js 16.1.1 (App Router)
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4
- Context API

**Backend:**
- Node.js + Express
- MySQL 2
- bcrypt (password hashing)
- express-session
- CORS

---

## 🌐 API Endpoints

**Base URL:** `http://localhost:3000/api`

### Auth
- `POST /auth/register` - Create account
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `GET /auth/me` - Get current user

### Program
- `POST /programs` - Create program
- `GET /programs/:userId` - Get user's program
- `PUT /programs/:id` - Update program
- `DELETE /programs/:id` - Delete program

### Activities
- `POST /programs/:programId/activities` - Complete activity
- `GET /programs/:programId/activities/:date` - Get day's activities

---

## 🎯 Key Files to Modify

### Add/Modify Exercises
**File:** `lib/utils/constants.ts`
```typescript
export const WEEK_ACTIVITIES: WeekActivities = {
  monday: [
    { id: 'core', name: 'Core Workout', time: '05:15', ... }
  ],
  // ...
};
```

### Change Phases
**File:** `lib/utils/constants.ts`
```typescript
export const PHASES: Phases = {
  1: { name: 'Foundation Phase', weeks: '1-2', color: '#84cc16' },
  // ...
};
```

### Modify Styling
**Files:**
- `app/globals.css` - Global styles & fonts
- `app/page.tsx` - Main layout & header
- Component files - Individual component styles

---

## 🐛 Common Issues

### Port Conflicts
```bash
# Kill processes
lsof -ti:3000 | xargs kill -9  # Backend
lsof -ti:3001 | xargs kill -9  # Frontend
```

### Database Errors
```bash
# Reset database
mysql -u root -p -e "DROP DATABASE IF EXISTS kadjot_fitness;"
mysql -u root -p < backend/schema.sql
```

### Module Errors
```bash
# Clean install
rm -rf node_modules backend/node_modules
npm install && cd backend && npm install
```

---

## 📦 Build & Deploy

### Production Build
```bash
npm run build
npm start  # Runs on port 3000
```

### Environment Variables

**`.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
# For production: https://your-api.com/api
```

**`backend/config.js`:**
```javascript
module.exports = {
  database: { /* MySQL config */ },
  session: { secret: 'random-string' },
  cors: { origin: 'http://localhost:3001' }
};
```

---

## 🔐 Security Notes

- Session secret should be random & secure in production
- Use HTTPS in production
- Set proper CORS origins
- Don't commit `config.js` or `.env.local`
- Use environment variables for secrets

---

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

---

## 📱 Mobile Access

1. Find IP: `ifconfig | grep "inet "`
2. Access: `http://YOUR_IP:3001`
3. Allow firewall: Port 3001

---

## 🚢 Deployment Options

### Vercel (Frontend)
```bash
vercel
```

### Railway/Render (Backend + DB)
1. Create new service
2. Connect GitHub repo
3. Set environment variables
4. Deploy

### Docker (Optional)
```dockerfile
# Create Dockerfile for containerization
FROM node:18
# ... docker config
```

---

## 📊 Database Schema

**Tables:**
- `users` - User accounts
- `programs` - User programs
- `program_activity` - Activity completions
- `sessions` - Session store

**See:** `backend/schema.sql` for full schema

---

## 🛠️ Development Commands

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Production build
npm start            # Run production
npm run lint         # Lint code

# Backend
cd backend
npm start            # Start API server
npm run dev          # With nodemon (if configured)

# Both
./start.sh           # Start both (Mac/Linux)
./stop.sh            # Stop both
```

---

## 📚 Additional Resources

- [Full Setup Guide](../SETUP_GUIDE.md)
- [Main README](../README.md)
- [Migration Documentation](./MIGRATION_COMPLETE.md)
- [Backend Documentation](../backend/README.md)
- [GitHub Repository](https://github.com/carlo-manuel-molina/kadjot-next)

---

**For detailed walkthrough, see SETUP_GUIDE.md**
