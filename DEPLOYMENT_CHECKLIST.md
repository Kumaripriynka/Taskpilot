# Quick Deployment Checklist ✅

## Before You Start
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas account created
- [ ] Render account created
- [ ] Netlify account created

---

## 1️⃣ MongoDB Atlas Setup
- [ ] Create free cluster
- [ ] Add database user (username + password)
- [ ] Allow access from anywhere (0.0.0.0/0)
- [ ] Get connection string
- [ ] Replace `<password>` and add `/taskpilot`

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/taskpilot?retryWrites=true&w=majority
```

---

## 2️⃣ Backend Deployment (Render)
- [ ] New Web Service
- [ ] Connect GitHub repo
- [ ] Root Directory: `backend`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`

### Environment Variables:
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `5000`
- [ ] `MONGO_URI` = (your MongoDB connection string)
- [ ] `JWT_SECRET` = (generate random 32+ char string)
- [ ] `FRONTEND_URL` = (will add after frontend deployment)

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

- [ ] Deploy and copy backend URL

**Backend URL:** `_______________________________________`

---

## 3️⃣ Frontend Deployment (Netlify)
- [ ] Import from GitHub
- [ ] Base directory: `frontend`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `frontend/dist`

### Environment Variables:
- [ ] `VITE_API_URL` = `https://your-backend.onrender.com/api`

- [ ] Deploy and copy frontend URL
- [ ] (Optional) Customize site name

**Frontend URL:** `_______________________________________`

---

## 4️⃣ Final Configuration
- [ ] Go back to Render backend
- [ ] Add `FRONTEND_URL` environment variable with Netlify URL
- [ ] Wait for auto-redeploy

---

## 5️⃣ Testing
- [ ] Visit frontend URL
- [ ] Test signup
- [ ] Test login
- [ ] Create a task
- [ ] Assign task to employee
- [ ] Update task status
- [ ] Test logout

---

## 🚨 Troubleshooting

**Can't connect to backend?**
- Check VITE_API_URL in Netlify settings
- Verify backend is running on Render
- Wait 60s if backend was sleeping (free tier)

**CORS errors?**
- Verify FRONTEND_URL in Render matches your Netlify URL exactly
- Check Render logs for errors

**Database connection failed?**
- Verify MONGO_URI is correct
- Check MongoDB Atlas IP whitelist
- Verify database user credentials

---

## 📝 Notes

**Free Tier Limitations:**
- Render: Backend sleeps after 15 min inactivity (30-60s wake time)
- MongoDB Atlas: 512MB storage
- Netlify: 100GB bandwidth/month

**Auto-Deploy:**
Both services auto-deploy on git push to main branch!

---

## ✨ You're Done!

Your app is now live and accessible worldwide! 🎉

Share your frontend URL with others to try your app.
