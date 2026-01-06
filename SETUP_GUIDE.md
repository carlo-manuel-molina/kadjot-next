# 📘 Complete Setup Guide - Kadjot Fitness

**A step-by-step guide for complete beginners to get Kadjot Fitness running on any device.**

---

## 📋 Table of Contents

1. [What You Need](#what-you-need)
2. [Installation Walkthrough](#installation-walkthrough)
3. [Configuration](#configuration)
4. [Starting the App](#starting-the-app)
5. [Accessing from Mobile](#accessing-from-mobile)
6. [Troubleshooting](#troubleshooting)

---

## 🛠️ What You Need

Before starting, install these on your computer:

### 1. Node.js (JavaScript Runtime)
**What it is:** Software that runs the app  
**Download:** https://nodejs.org/  
**Choose:** LTS version (Long Term Support)

**After installing, verify:**
```bash
node --version
# Should show: v18.x.x or higher
```

### 2. MySQL (Database)
**What it is:** Stores your workout data and user accounts  
**Download:**
- **Mac:** `brew install mysql` or https://dev.mysql.com/downloads/mysql/
- **Windows:** https://dev.mysql.com/downloads/installer/
- **Linux:** `sudo apt-get install mysql-server`

**After installing, verify:**
```bash
mysql --version
# Should show: 8.0.x or higher
```

### 3. Git (Optional but recommended)
**What it is:** Downloads code from GitHub  
**Download:** https://git-scm.com/downloads

---

## 📥 Installation Walkthrough

### Step 1: Download the App

**Option A: Using Git (Recommended)**
```bash
# Open Terminal (Mac/Linux) or Command Prompt (Windows)
# Navigate to where you want to install
cd ~/Desktop

# Clone the repository
git clone https://github.com/carlo-manuel-molina/kadjot-next.git

# Go into the folder
cd kadjot-next
```

**Option B: Download ZIP**
1. Go to https://github.com/carlo-manuel-molina/kadjot-next
2. Click green "Code" button
3. Click "Download ZIP"
4. Extract ZIP file
5. Open Terminal/Command Prompt in that folder

---

### Step 2: Install Dependencies

**Install Frontend Dependencies:**
```bash
# Make sure you're in kadjot-next folder
npm install
```

This will download ~500MB of required packages. Takes 2-5 minutes.

**Install Backend Dependencies:**
```bash
cd backend
npm install
cd ..
```

---

### Step 3: Setup MySQL Database

**Start MySQL:**
```bash
# Mac (if using Homebrew):
brew services start mysql

# Linux:
sudo systemctl start mysql

# Windows:
# Start MySQL from Services or MySQL Workbench
```

**Create the Database:**
```bash
# Login to MySQL (you'll be prompted for password)
mysql -u root -p

# In MySQL prompt, run:
CREATE DATABASE kadjot_fitness;
exit;

# Import the schema
mysql -u root -p kadjot_fitness < backend/schema.sql
```

**Default MySQL credentials:**
- Username: `root`
- Password: (the one you set during MySQL installation)

---

## ⚙️ Configuration

### Step 1: Configure Backend

**Copy the example config:**
```bash
cp backend/config.example.js backend/config.js
```

**Edit backend/config.js:**
```javascript
module.exports = {
  database: {
    host: 'localhost',
    user: 'root',                    // Your MySQL username
    password: 'your_mysql_password', // YOUR ACTUAL PASSWORD HERE
    database: 'kadjot_fitness'
  },
  session: {
    secret: 'your-random-secret-key-change-this' // Change to random string
  },
  cors: {
    origin: 'http://localhost:3001'
  }
};
```

### Step 2: Configure Frontend

**Create .env.local file:**
```bash
# In the kadjot-next root folder
touch .env.local
```

**Edit .env.local:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 🚀 Starting the App

### Mac/Linux:

```bash
# Make scripts executable
chmod +x start.sh
chmod +x stop.sh

# Start everything
./start.sh
```

### Windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

---

### ✅ Success!

You should see:
```
╔═══════════════════════════════════════════╗
║   🏋️  Kadjot Fitness is now running!    ║
╠═══════════════════════════════════════════╣
║   Backend:  http://localhost:3000/api    ║
║   Frontend: http://localhost:3001        ║
╚═══════════════════════════════════════════╝
```

**Open in browser:** http://localhost:3001

---

## 📱 Accessing from Mobile

### Find Your Computer's IP Address:

**Mac:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig
# Look for "IPv4 Address"
```

**Linux:**
```bash
hostname -I
```

### Access from Mobile/Tablet:

1. **Connect mobile to SAME WiFi** as your computer
2. **Open mobile browser**
3. **Go to:** `http://YOUR_IP:3001`
   - Example: `http://192.168.1.100:3001`
4. **Bookmark it!** Or add to home screen

---

## 🆘 Troubleshooting

### "Port 3001 already in use"
```bash
# Kill the process
lsof -ti:3001 | xargs kill -9
# Or on Windows:
netstat -ano | findstr :3001
taskkill /PID [PID_NUMBER] /F
```

### "Cannot connect to MySQL"
```bash
# Check if MySQL is running
mysql -u root -p

# If error, start MySQL:
# Mac:
brew services start mysql

# Linux:
sudo systemctl start mysql

# Windows: Start from Services
```

### "ECONNREFUSED" Error
- Backend isn't running
- Check `backend.log` for errors
- Make sure MySQL is running
- Verify database credentials in `backend/config.js`

### "Module not found" Error
```bash
# Reinstall dependencies
rm -rf node_modules
npm install

cd backend
rm -rf node_modules
npm install
cd ..
```

### Can't Access from Mobile
1. **Check firewall** - Allow port 3001
2. **Same network** - Both devices on same WiFi
3. **Use IP not localhost** - `192.168.x.x` not `localhost`

---

## 📧 Still Need Help?

1. **Check logs:**
   ```bash
   tail -f backend.log
   tail -f frontend.log
   ```

2. **Open GitHub Issue:**
   https://github.com/carlo-manuel-molina/kadjot-next/issues

3. **Include in issue:**
   - Operating System
   - Node.js version (`node --version`)
   - MySQL version (`mysql --version`)
   - Error messages from logs
   - What you tried

---

## ✅ Next Steps

Once running:

1. **Create an account** or use **Guest Mode**
2. **Set your program start date**
3. **Begin your 12-week journey!**
4. **Check off activities** as you complete them
5. **Export to calendar** for reminders
6. **Track your progress** week by week

---

**Good luck with your fitness journey! 💪**
