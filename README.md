# 🏋️ Kadjot Fitness - Progressive 12-Week Core Strength Program

**A complete standalone fitness tracking app with vintage magazine aesthetics, powered by Next.js + TypeScript + Node.js + MySQL**

> 📱 **Works on any device** - Desktop, laptop, tablet, or mobile  
> 🌍 **Standalone localhost app** - No cloud hosting required  
> 💾 **Your data, your device** - Full privacy and control

---

## 📖 What Is This?

Kadjot Fitness is a comprehensive **12-week progressive core strength program** designed for:
- Office workers with lower back issues
- Anyone wanting functional core strength
- People seeking a balanced training approach (cardio + strength + mobility)

**Program includes:**
- 🏃 Core workouts (Dead Bug, Glute Bridge, Side Plank, Bird Dog)
- 🏖️ Beach/sand running sessions
- 💪 Gym workouts (Leg Press, Cable Row, Goblet Squat, Back Extension)
- 🪑 Desk reset exercises (throughout your workday)
- 🧘 Mobility & stretching routines

**3 Progressive Phases:**
1. **Foundation (Weeks 1-2)** - Learn form, establish routine
2. **Building (Weeks 3-6)** - Increase weights 5-10%, build endurance
3. **Strength (Weeks 7-12)** - Maximum development, peak performance

---

## 🚀 Quick Start (3 Steps)

### ✅ Step 1: Install Prerequisites

You need these installed on your computer:

**Required:**
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MySQL](https://dev.mysql.com/downloads/mysql/) (v8 or higher)

**Check if installed:**
```bash
node --version   # Should show v18.x or higher
npm --version    # Should show 9.x or higher
mysql --version  # Should show 8.x or higher
```

### ✅ Step 2: Download & Setup

```bash
# 1. Clone this repository
git clone https://github.com/carlo-manuel-molina/kadjot-next.git
cd kadjot-next

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd backend
npm install
cd ..

# 4. Setup database configuration
cp backend/config.example.js backend/config.js
# Edit backend/config.js with your MySQL credentials (see below)

# 5. Create database
mysql -u root -p < backend/schema.sql
# Enter your MySQL password when prompted
```

**Edit `backend/config.js`:**
```javascript
module.exports = {
  database: {
    host: 'localhost',
    user: 'root',           // Your MySQL username
    password: 'your_password_here',  // Your MySQL password
    database: 'kadjot_fitness'
  },
  session: {
    secret: 'change-this-to-a-random-string'
  },
  cors: {
    origin: 'http://localhost:3001'
  }
};
```

### ✅ Step 3: Start the App

```bash
# Make start script executable (Mac/Linux)
chmod +x start.sh

# Start both frontend and backend
./start.sh
```

**Windows users:**
```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start frontend (in new terminal)
npm run dev
```

**The app is now running! 🎉**
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000/api

**To stop:**
```bash
./stop.sh
```

---

## 📱 Access From Any Device

### On the Same Computer
Just open: http://localhost:3001

### From Mobile/Tablet on Same Network

1. **Find your computer's IP address:**
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. **On your mobile device:**
   - Open browser
   - Go to: `http://YOUR_IP_ADDRESS:3001`
   - Example: `http://192.168.1.100:3001`

3. **Bookmark it!** Add to home screen for app-like experience

---

## ✨ Features

### 🎯 Core Features
- ✅ **12-Week Progressive Program** - Complete 84-day program with 3 phases
- ✅ **Real Exercise Library** - Actual workouts with detailed instructions
- ✅ **Smart Activity Status** - Automatically shows Missed, Ongoing, or Upcoming
- ✅ **Progress Tracking** - Current week, phase, daily/weekly/overall completion
- ✅ **Visual Feedback** - Check off activities, see progress bars update in real-time
- ✅ **Export Tools** - Generate daily plans (HTML) and calendar events (.ics)
- ✅ **Guest Mode** - Use without account, data saved locally
- ✅ **User Accounts** - Optional login for cross-device sync
- ✅ **Vintage Magazine Design** - Beautiful, elegant serif typography
- ✅ **Fully Responsive** - Works on mobile, tablet, and desktop
- ✅ **Offline Capable** - Works without internet (after initial setup)

### 📅 Weekly Schedule
- **Monday & Thursday**: Core Workout (Dead Bug, Glute Bridge, Side Plank, Bird Dog)
- **Tuesday**: Beach/Sand Running + Desk Resets
- **Wednesday**: Gym Workout (Leg Press, Cable Row, Goblet Squat, Back Extension) + Desk Resets
- **Friday**: Mobility & Stretching + Desk Resets
- **Saturday**: Optional Beach Running + Gym Workout
- **Sunday**: Optional Mobility & Stretching (rest day)

## 📁 Project Structure

```
kadjot-next/
├── app/              # Next.js pages (dashboard, login, register)
├── backend/          # Node.js + Express API server
│   ├── server.js    # Main server file
│   ├── config.js    # Database & CORS configuration
│   ├── schema.sql   # Database schema
│   └── README.md    # Backend documentation
├── components/       # React components
│   ├── auth/        # Authentication UI
│   └── dashboard/   # Dashboard components
├── contexts/         # State management (Auth, Program)
├── lib/
│   ├── hooks/       # Custom React hooks
│   ├── types/       # TypeScript types
│   └── utils/       # Helper functions & API client
├── start.sh          # Start both frontend & backend
└── stop.sh           # Stop all servers
```

## 📚 Documentation

- **[MIGRATION_COMPLETE.md](./MIGRATION_COMPLETE.md)** - Full feature list, screenshots, deployment guide
- **[NEXTJS_MIGRATION_STATUS.md](./NEXTJS_MIGRATION_STATUS.md)** - Migration progress and architecture

## 🔧 Tech Stack

### Frontend
- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Context API** - State management

### Backend
- **Node.js + Express** - API server
- **MySQL 2** - Database
- **bcrypt** - Password hashing
- **express-session** - Session management
- **CORS** - Cross-origin resource sharing

## 🎯 Key Features Tested

- ✅ Program start/reset
- ✅ Progress tracking (week, phase, days)
- ✅ Activity completion with checkboxes
- ✅ Real-time progress updates
- ✅ Export to HTML and calendar
- ✅ Responsive design
- ✅ Guest mode (localStorage)

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel (recommended)
vercel
```

## 🎨 Features in Detail

### Program Tracking
- Set your start date
- Automatic week and phase calculation
- 12-week (84-day) progress tracking
- 4 Phases: Foundation (1-2), Building (3-6), Strength (7-10), Peak (11-12)

### Activities
- Morning Routine (05:00)
- Core Strength Workout (06:30)
- Desk Reset 1 (09:00)
- Desk Reset 2 (12:00)
- Desk Reset 3 (15:00)
- Evening Stretch (20:00)

### Status System
- **Missed** (Red) - Past the activity window
- **Ongoing** (Blue) - Currently in the activity window
- **Upcoming** (Blue) - Future activity
- **Completed** (Green) - Checked off

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001 (frontend)
lsof -ti:3001 | xargs kill -9

# Kill process on port 3000 (backend)
lsof -ti:3000 | xargs kill -9
```

### MySQL Connection Error
```bash
# Check if MySQL is running
mysql -u root -p

# If not running (Mac):
brew services start mysql

# If not running (Linux):
sudo systemctl start mysql

# Windows: Start MySQL from Services
```

### Can't Access from Mobile
1. Check firewall settings
2. Make sure both devices are on same WiFi network
3. Use computer's IP address, not "localhost"

### Database Already Exists Error
```bash
# Drop and recreate database
mysql -u root -p -e "DROP DATABASE IF EXISTS kadjot_fitness;"
mysql -u root -p < backend/schema.sql
```

---

## ❓ Frequently Asked Questions

**Q: Do I need internet connection?**  
A: Only for initial download. After setup, works completely offline!

**Q: Is my data private?**  
A: 100% private. Everything runs on YOUR device. No data leaves your computer.

**Q: Can I use without MySQL?**  
A: Yes! Use Guest Mode - data saves in browser localStorage (no account needed).

**Q: Will this work on my phone?**  
A: Yes! Access via your computer's IP address on same WiFi network.

**Q: Can I customize the exercises?**  
A: Yes! Edit `/lib/utils/constants.ts` to modify activities.

**Q: How much disk space needed?**  
A: About 500MB (including Node.js dependencies).

**Q: Is this free?**  
A: Yes! Open source under MIT license.

---

## 🌐 Deployment Options

### Option 1: Localhost Only (Default)
Perfect for personal use. Runs on your computer.

### Option 2: Cloud Hosting
Deploy to cloud for access from anywhere:

**Frontend (Vercel - Free):**
```bash
npm install -g vercel
vercel
```

**Backend (Railway/Render/Heroku):**
- Deploy backend separately
- Update `NEXT_PUBLIC_API_URL` in `.env.local`

**Database (PlanetScale/AWS RDS):**
- Use cloud MySQL database
- Update `backend/config.js` with cloud credentials

### Option 3: Home Server
Run on Raspberry Pi or always-on computer:
```bash
# Install PM2 for process management
npm install -g pm2

# Start with PM2
pm2 start start.sh --name kadjot-fitness
pm2 save
pm2 startup
```

---

## 📚 Additional Documentation

**📑 [Complete Documentation Index](./md/DOCUMENTATION_INDEX.md)** - Full guide to all docs

**Main Guides:**
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed beginner's setup guide
- **[QUICK_REFERENCE.md](./md/QUICK_REFERENCE.md)** - Quick commands for developers

**Technical Docs (`/md` folder):**
- **[MIGRATION_COMPLETE.md](./md/MIGRATION_COMPLETE.md)** - Feature showcase with screenshots
- **[BACKEND_MIGRATION.md](./md/BACKEND_MIGRATION.md)** - Backend architecture details
- **[NEXTJS_MIGRATION_STATUS.md](./md/NEXTJS_MIGRATION_STATUS.md)** - Migration progress tracker
- **[PUSH_TO_GITHUB.md](./md/PUSH_TO_GITHUB.md)** - GitHub deployment instructions
- **[backend/README.md](./backend/README.md)** - Backend API documentation

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📊 Program Effectiveness

This program is based on evidence-based exercise science:
- **Core exercises** proven effective for lower back health
- **12-week timeline** optimal for measurable strength gains
- **Progressive overload** follows research recommendations
- **Multi-modal approach** addresses all aspects of fitness

Expected results (with 70-80% adherence):
- ✅ 30-50% core strength improvement
- ✅ Significant reduction in lower back discomfort
- ✅ Better posture and movement quality
- ✅ Improved functional fitness for daily activities

---

## 🔗 Links & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

## 📄 License

MIT License - Free to use and modify for personal or commercial use.

---

## 👤 Author

**Carlo Manuel Molina**  
📍 Philippines 🇵🇭  
📧 Contact via GitHub Issues

---

## 🙏 Acknowledgments

- Exercise references from various fitness research sources
- Built with love for functional fitness and progressive training
- Designed for real people with real goals

---

**Built with ❤️ using Next.js, React, TypeScript, Tailwind CSS, Node.js, and MySQL**

**⭐ Star this repo if you find it helpful!**
