# TaskPilot Deployment Guide

This guide will help you deploy both the frontend and backend of TaskPilot.

## Prerequisites

1. GitHub repository with your code pushed
2. MongoDB Atlas account (free tier available)
3. Render account (for backend)
4. Netlify account (for frontend)

---

## Part 1: Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Click "Build a Database" → Choose **FREE** tier
4. Select your cloud provider and region
5. Click "Create Cluster"

### Step 2: Configure Database Access

1. In the left sidebar, click **Database Access**
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Enter username and password (save these!)
5. Set **Database User Privileges** to "Read and write to any database"
6. Click **Add User**

### Step 3: Configure Network Access

1. In the left sidebar, click **Network Access**
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

### Step 4: Get Connection String

1. Click **Database** in the left sidebar
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/`)
5. Replace `<password>` with your actual password
6. Add `/taskpilot` at the end before the `?`

Example: `mongodb+srv://user:pass123@cluster0.abc123.mongodb.net/taskpilot?retryWrites=true&w=majority`

---

## Part 2: Backend Deployment (Render)

### Step 1: Create Render Account

1. Go to [Render](https://render.com)
2. Sign up using your GitHub account

### Step 2: Deploy Backend

1. Click **New** → **Web Service**
2. Connect your GitHub repository
3. Select your repository (Kumaripriynka/Taskpilot)
4. Configure the service:
   - **Name**: `taskpilot-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Add Environment Variables

In the **Environment** section, add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGO_URI` | Your MongoDB connection string from Part 1 |
| `JWT_SECRET` | Generate a random 32+ character string |

**To generate JWT_SECRET**, run this in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Deploy

1. Click **Create Web Service**
2. Wait for deployment to complete (5-10 minutes)
3. Once deployed, copy your backend URL (e.g., `https://taskpilot-backend.onrender.com`)

**Important**: Render's free tier may spin down after inactivity. The first request after inactivity may take 30-60 seconds.

---

## Part 3: Frontend Deployment (Netlify)

### Step 1: Create Netlify Account

1. Go to [Netlify](https://www.netlify.com)
2. Sign up using your GitHub account

### Step 2: Deploy Frontend

1. Click **Add new site** → **Import an existing project**
2. Choose **GitHub**
3. Select your repository (Kumaripriynka/Taskpilot)
4. Configure the deployment:
   - **Branch to deploy**: `main`
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

### Step 3: Add Environment Variables

1. Go to **Site settings** → **Environment variables**
2. Click **Add a variable**
3. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: Your Render backend URL + `/api` (e.g., `https://taskpilot-backend.onrender.com/api`)

### Step 4: Deploy

1. Click **Deploy site**
2. Wait for deployment (2-5 minutes)
3. Once deployed, Netlify will give you a URL (e.g., `https://random-name.netlify.app`)

### Step 5: Custom Domain (Optional)

1. Go to **Domain settings**
2. Click **Options** → **Edit site name**
3. Change to something like `taskpilot-yourname`
4. Your URL will become `https://taskpilot-yourname.netlify.app`

---

## Part 4: Update Backend CORS

After deploying the frontend, you need to update the backend to allow requests from your frontend URL.

### Option 1: Update via Render Dashboard

1. Go to your Render dashboard
2. Select your backend service
3. Go to **Environment** tab
4. Add new environment variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: Your Netlify URL (e.g., `https://taskpilot-yourname.netlify.app`)

### Option 2: Update code (Recommended)

Update `backend/server.js` to use dynamic CORS:

```javascript
// Replace the existing CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

Then:
1. Commit and push the changes
2. Render will auto-deploy
3. Add `FRONTEND_URL` environment variable in Render

---

## Part 5: Testing Your Deployment

1. Visit your Netlify URL
2. Try to sign up for a new account
3. Login and create tasks
4. Test all features

### Troubleshooting

**Frontend can't connect to backend:**
- Check that `VITE_API_URL` in Netlify matches your Render backend URL
- Check browser console for CORS errors
- Verify backend is running on Render

**Database connection errors:**
- Verify MongoDB connection string in Render environment variables
- Check that IP whitelist includes 0.0.0.0/0 in MongoDB Atlas
- Ensure database user has correct permissions

**Backend not responding:**
- Check Render logs for errors
- Verify all environment variables are set correctly
- Free tier may be sleeping - wait 30-60 seconds for first request

---

## Continuous Deployment

Both Render and Netlify support automatic deployments:

1. **Push to GitHub**: Any push to your main branch
2. **Auto-build**: Services automatically rebuild
3. **Auto-deploy**: New version goes live

To disable auto-deploy:
- **Render**: Service settings → Auto-Deploy → OFF
- **Netlify**: Site settings → Build & deploy → Stop builds

---

## Cost

Both services offer generous free tiers:

- **MongoDB Atlas**: 512MB storage (free forever)
- **Render**: 750 hours/month (free, but spins down after inactivity)
- **Netlify**: 100GB bandwidth/month, unlimited sites

---

## Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-app.netlify.app
```

### Frontend (Netlify)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## Next Steps

1. ✅ Set up MongoDB Atlas
2. ✅ Deploy backend to Render
3. ✅ Deploy frontend to Netlify
4. ✅ Configure environment variables
5. ✅ Test your application
6. 🎉 Share your live app!

---

## Support

If you encounter issues:
1. Check service logs (Render/Netlify dashboards)
2. Verify environment variables
3. Test backend API directly using Postman/Thunder Client
4. Check browser console for frontend errors

Good luck with your deployment! 🚀
