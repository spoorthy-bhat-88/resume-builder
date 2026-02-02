# Quick Start Guide

## Running the App Locally

### Option 1: With Local MongoDB

1. **Start MongoDB** (in a new terminal):
   ```bash
   # macOS (if installed via Homebrew)
   brew services start mongodb-community
   
   # Or run directly
   mongod
   ```

2. **Start the backend** (in a new terminal):
   ```bash
   npm run dev:server
   ```

3. **Start the frontend** (in a new terminal):
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

### Option 2: With MongoDB Atlas (Cloud)

1. **Create a MongoDB Atlas cluster** (see DEPLOYMENT.md for details)

2. **Update your `.env` file** with the Atlas connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-builder
   ```

3. **Start both servers**:
   ```bash
   # Option A: Both at once
   npm run dev:all
   
   # Option B: Separately (2 terminals)
   npm run dev:server  # Terminal 1
   npm run dev         # Terminal 2
   ```

4. Open http://localhost:5173 in your browser

## Installing MongoDB Locally (Optional)

### macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Windows
1. Download from https://www.mongodb.com/try/download/community
2. Run the installer
3. MongoDB will start automatically as a service

### Linux (Ubuntu/Debian)
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

## Troubleshooting

### MongoDB not connecting?
- Make sure MongoDB is running: `ps aux | grep mongod`
- Check the connection string in `.env` file
- Try using MongoDB Atlas (cloud) instead

### Backend server not starting?
- Make sure port 3000 is not in use
- Check `.env` file exists and has correct values
- Run `npm install` again

### Frontend can't connect to backend?
- Make sure both servers are running
- Check `.env.local` file has `VITE_API_URL=http://localhost:3000/api`
- Clear browser cache and reload

## Scripts Available

- `npm run dev` - Start frontend only
- `npm run dev:server` - Start backend only
- `npm run dev:all` - Start both frontend and backend
- `npm run build` - Build for production
- `npm start` - Run production build

## Environment Files

- `.env` - Backend configuration (MongoDB, port, etc.)
- `.env.local` - Frontend configuration (API URL)
- `.env.production` - Production frontend settings (auto-used when deploying)

See `.env.example` and `.env.local.example` for templates.
