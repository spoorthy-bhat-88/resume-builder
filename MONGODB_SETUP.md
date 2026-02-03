# MongoDB Setup Guide for Resume Builder

## Option 1: MongoDB Atlas (Cloud - Recommended for Mac without Homebrew)

### Steps:
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up" (or "Log In" if you have account)
3. Create a free account
4. Click "Create a Deployment" 
5. Choose "Free" tier
6. Select cloud provider and region (AWS us-east-1 is default)
7. Click "Create Deployment"
8. Wait for cluster to initialize (2-3 minutes)
9. Click "Connect"
10. Choose "Drivers" connection method
11. Select "Node.js" driver and version 3.6+
12. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority`)
13. Replace `<password>` with your password
14. Update `.env` file in resume-builder folder:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-builder?retryWrites=true&w=majority
```

15. Save `.env` file
16. Restart server: npm run dev

---

## Option 2: Use MongoDB Online Demo (No Sign-up - Temporary)

If you want to test quickly without signing up:
- I can temporarily modify the backend to use in-memory storage
- Data will work during this session
- You can migrate to MongoDB Atlas later

---

## What happens when MongoDB connects:

✅ User accounts (email & hashed passwords) will be stored in MongoDB
✅ Projects, Education, Experiences will be stored per user
✅ Data persists across server restarts
✅ Different users see only their own data

---

Would you like to:
A) Set up MongoDB Atlas (5 min, recommended)
B) Use in-memory storage temporarily (1 min, test now)
