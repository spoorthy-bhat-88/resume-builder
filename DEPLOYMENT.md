# Deployment Guide for Resume Builder

This guide will walk you through deploying your Resume Builder application to Render with MongoDB Atlas.

## Prerequisites

- GitHub account
- Render account (free tier available)
- MongoDB Atlas account (free tier available)

## Part 1: Set Up MongoDB Atlas (Database)

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and sign up for a free account
3. Verify your email address

### Step 2: Create a Cluster

1. After logging in, click "Build a Database"
2. Choose the **FREE** tier (M0 Sandbox)
3. Select a cloud provider (AWS recommended)
4. Choose a region closest to you
5. Name your cluster (default is fine)
6. Click "Create"

### Step 3: Configure Database Access

1. Once the cluster is created, click "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and strong password (save these!)
5. Under "Database User Privileges", select "Read and write to any database"
6. Click "Add User"

### Step 4: Configure Network Access

1. Click "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (adds `0.0.0.0/0`)
   - This is necessary for Render to connect
4. Click "Confirm"

### Step 5: Get Connection String

1. Click "Database" in the left sidebar
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Select "Node.js" as driver and version "4.1 or later"
5. Copy the connection string (looks like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` with your database username
7. Replace `<password>` with your database password
8. Add your database name after `.net/`, for example:
   ```
   mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/resume-builder?retryWrites=true&w=majority
   ```
9. Save this connection string - you'll need it for Render!

## Part 2: Deploy to GitHub

### Step 1: Initialize Git Repository (if not already done)

```bash
cd /Users/spoorthybhat/Desktop/vibe-coding/resume-builder
git init
```

### Step 2: Create GitHub Repository

1. Go to https://github.com
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it "resume-builder" (or whatever you prefer)
5. Make it **Public** or **Private**
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### Step 3: Push Code to GitHub

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: Resume Builder with MongoDB"

# Set main branch
git branch -M main

# Add remote (replace with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/resume-builder.git

# Push to GitHub
git push -u origin main
```

## Part 3: Deploy to Render

### Step 1: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (recommended for easy integration)
3. Authorize Render to access your GitHub repositories

### Step 2: Create New Web Service

1. From your Render dashboard, click "New +"
2. Select "Web Service"
3. Click "Connect" next to your `resume-builder` repository
   - If you don't see it, click "Configure account" and give Render access

### Step 3: Configure Web Service

Fill in the following details:

**Basic Settings:**
- **Name**: `resume-builder` (or your preferred name)
- **Region**: Choose one closest to you (e.g., Oregon for US West)
- **Branch**: `main`
- **Root Directory**: (leave blank)
- **Runtime**: `Node`

**Build & Deploy:**
- **Build Command**: 
  ```
  npm install && npm run build
  ```
- **Start Command**: 
  ```
  npm start
  ```

**Plan:**
- Select **Free** (sufficient for personal use)

### Step 4: Add Environment Variables

Scroll down to "Environment Variables" and add these:

1. **NODE_ENV**
   - Value: `production`

2. **MONGODB_URI**
   - Value: `<your-mongodb-atlas-connection-string-from-part-1>`
   - Example: `mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/resume-builder?retryWrites=true&w=majority`

3. **FRONTEND_URL**
   - Value: (leave empty for now, we'll add it after deployment)

Click "Create Web Service"

### Step 5: Wait for Deployment

1. Render will now build and deploy your app
2. This takes 3-5 minutes for the first deployment
3. Watch the logs to see progress
4. Once complete, you'll see "Your service is live 🎉"

### Step 6: Update FRONTEND_URL

1. Copy your app's URL from Render (e.g., `https://resume-builder-abcd.onrender.com`)
2. Go to "Environment" tab in your Render service
3. Add or update **FRONTEND_URL**:
   - Value: `https://your-app-name.onrender.com` (your actual URL)
4. Click "Save Changes"
5. Render will automatically redeploy

## Part 4: Test Your Deployed App

1. Open your Render app URL in a browser
2. Try adding a project in the Master List
3. Build a resume
4. Export a resume

## Troubleshooting

### "Cannot connect to MongoDB"
- Check that your MongoDB connection string is correct
- Verify IP whitelist includes `0.0.0.0/0` in MongoDB Atlas
- Ensure database user has read/write permissions

### "CORS Error"
- Make sure `FRONTEND_URL` environment variable is set to your Render URL
- Check that the URL doesn't have a trailing slash

### "Application Error" or Build Fails
- Check the logs in Render dashboard
- Verify all environment variables are set
- Ensure `package.json` has correct scripts

### App is slow on first load
- This is normal for Render free tier
- Free tier apps "spin down" after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds

## Updating Your Deployed App

Whenever you make changes:

```bash
# Commit your changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

Render will automatically detect the push and redeploy your app!

## Cost

- **MongoDB Atlas (Free Tier)**: 512MB storage, completely free
- **Render (Free Tier)**: 750 hours/month, completely free
  - Note: Free apps spin down after 15 min of inactivity

## Security Notes

1. **Never commit `.env` files** to GitHub (already in `.gitignore`)
2. Use strong passwords for MongoDB
3. Rotate MongoDB passwords periodically
4. For production apps with sensitive data, consider paid tiers with additional security

## Next Steps

- Set up custom domain (Render Pro plan)
- Add authentication for multi-user support
- Set up automated backups for MongoDB
- Add email notifications
- Implement PDF export

## Support

If you encounter issues:
1. Check Render logs: Dashboard → Your Service → Logs tab
2. Check MongoDB Atlas: Metrics → see connection attempts
3. Open an issue on GitHub with error logs

---

🎉 **Congratulations!** Your Resume Builder is now live on the internet!
