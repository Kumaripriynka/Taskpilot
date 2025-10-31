# TaskPilot - Quick Start Guide

##  Get Started in 3 Steps

### Step 1: Start the Backend

```bash
cd backend
npm install
npm start
```

✅ Backend will run on `http://localhost:5000`

### Step 2: Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend will open at `http://localhost:3000`

### Step 3: Create Your First Admin Account

1. Navigate to `http://localhost:3000`
2. Click "Sign up"
3. Fill in your details
4. Select **"Admin"** as role
5. Click "Sign up"

## 🎯 Try It Out

### As Admin:

1. **Create an Employee:**
   - Click "+ Add Employee"
   - Enter: Name, Email, Password
   - Click "Add Employee"

2. **Create a Task:**
   - Click "+ Create Task"
   - Fill in task details
   - Select the employee from dropdown
   - Click "Create Task"

3. **View Dashboard:**
   - See task statistics
   - Monitor employee performance
   - Update task statuses

### As Employee:

1. **Login** with employee credentials
2. **View your assigned tasks**
3. **Filter by status** (Pending, In Progress, etc.)
4. **Update task status** using the dropdown

## 📊 Sample Data

### Create Sample Admin:
- **Name:** John Admin
- **Email:** admin@taskpilot.com
- **Password:** admin123
- **Role:** Admin

### Create Sample Employee:
- **Name:** Jane Employee
- **Email:** employee@taskpilot.com
- **Password:** employee123
- **Role:** Employee (created by admin)

### Create Sample Task:
- **Title:** Complete Project Documentation
- **Description:** Write comprehensive docs for the project
- **Assign To:** Jane Employee
- **Priority:** High
- **Due Date:** Select a future date

## 🔧 Troubleshooting

### Issue: Backend won't start
**Solution:** Make sure MongoDB connection string is correct and you have internet access.

### Issue: Frontend shows connection error
**Solution:** Ensure backend is running on port 5000.

### Issue: Can't login
**Solution:** Check if you registered with correct role. Admins go to `/admin/dashboard`, Employees to `/employee/dashboard`.

## ✅ What's Working

- ✅ User authentication (JWT)
- ✅ Role-based access (Admin/Employee)
- ✅ Task CRUD operations
- ✅ Employee management
- ✅ Real-time MongoDB sync
- ✅ Status updates
- ✅ Dashboard statistics
- ✅ Task filtering

##  You're All Set!

Start creating tasks and managing your team with TaskPilot!

Need help? Check the main README.md for detailed documentation.
