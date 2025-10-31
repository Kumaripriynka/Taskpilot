# TaskPilot - Role-Based Task Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing tasks with role-based access control. Built with JWT authentication, this system allows Admins to create and assign tasks to Employees, while Employees can view and update their assigned tasks.

## 🚀 Features

### Admin Role
- ✅ Create and manage employees
- ✅ Create and assign tasks to employees
- ✅ Update task status (Pending, In Progress, Completed, On Hold)
- ✅ View comprehensive dashboard with statistics
- ✅ Monitor employee task performance
- ✅ Delete tasks

### Employee Role
- ✅ View assigned tasks only
- ✅ Update task status
- ✅ Filter tasks by status
- ✅ Personal dashboard with task statistics

### Security & Authentication
- ✅ JWT-based authentication
- ✅ Password encryption with bcrypt
- ✅ Role-based route protection
- ✅ Secure token storage

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite (Build Tool)
- React Router v6
- Context API (State Management)
- Axios
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- bcryptjs

## 📁 Project Structure

```
taskpilot/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── taskController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── userModel.js
│   │   └── taskModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── taskRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── ProtectedRoute.js
    │   │   ├── StatsCard.js
    │   │   └── TaskCard.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Signup.js
    │   │   ├── AdminDashboard.js
    │   │   └── EmployeeDashboard.js
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (connection string provided)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is already configured with MongoDB connection:
```
MONGO_URI=mongodb+srv://taskpilotUser:Taskpilot1234@cluster0.jvmxfv5.mongodb.net
JWT_SECRET=taskpilot_secret_key
PORT=5000
```

4. Start the backend server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the Vite development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🔑 API Endpoints

### Authentication Routes
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Employee Routes (Admin Only)
- `POST /api/employees` - Create a new employee
- `GET /api/employees` - Get all employees with task counts
- `GET /api/employees/:id` - Get single employee details

### Task Routes
- `POST /api/tasks` - Create a new task (Admin only)
- `GET /api/tasks` - Get all tasks (Admin: all, Employee: own tasks)
- `GET /api/tasks/:id` - Get single task by ID
- `PUT /api/tasks/:id` - Update task (Admin: all fields, Employee: status only)
- `DELETE /api/tasks/:id` - Delete task (Admin only)
- `GET /api/tasks/stats/dashboard` - Get task statistics (Admin only)

## 👥 User Roles

### Admin Account
To create an admin account, use the signup page and select "Admin" as the role.

### Employee Account
Employees can be created by:
1. Admin using the "Add Employee" button in the dashboard
2. Self-registration via the signup page with "Employee" role

## 🎨 Features Breakdown

### Admin Dashboard
- **Statistics Overview**: View total, pending, in progress, completed, and on-hold tasks
- **Employee Management**: See all employees with their task counts
- **Task Management**: Create, assign, update, and delete tasks
- **Real-time Updates**: All data syncs with MongoDB in real-time

### Employee Dashboard
- **Personal Task View**: See only assigned tasks
- **Status Filters**: Filter tasks by status (All, Pending, In Progress, Completed, On Hold)
- **Task Updates**: Update task status directly from dashboard
- **Statistics**: View personal task statistics

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Routes are protected based on user roles
- **Token Expiration**: JWT tokens expire after 30 days
- **Automatic Logout**: Users are logged out on token expiration

## 🎯 Usage Guide

### For Admins:

1. **Sign Up/Login** as an admin
2. **Add Employees** using the "Add Employee" button
3. **Create Tasks** using the "Create Task" button
4. **Assign Tasks** to specific employees
5. **Monitor Progress** through the dashboard statistics
6. **Update/Delete Tasks** as needed

### For Employees:

1. **Login** with credentials (provided by admin or self-registered)
2. **View Tasks** assigned to you
3. **Filter Tasks** by status
4. **Update Status** of your tasks as you progress
5. **Track Progress** through your personal statistics

## 🌐 MongoDB Connection

The application connects to MongoDB Atlas using the provided connection string:
```
mongodb+srv://taskpilotUser:Taskpilot1234@cluster0.jvmxfv5.mongodb.net
```

All data is stored in the `taskpilot` database with two collections:
- `users` - Stores user information (admins and employees)
- `tasks` - Stores task information with references to users

## 🐛 Troubleshooting

### Backend Issues

**Port Already in Use:**
```bash
# Change PORT in .env file or kill the process using port 5000
```

**MongoDB Connection Error:**
- Ensure you have internet connection
- Verify the MongoDB connection string in `.env`
- Check if IP address is whitelisted in MongoDB Atlas

### Frontend Issues

**Cannot Connect to Backend:**
- Ensure backend server is running on port 5000
- Check if API base URL in `src/utils/api.js` is correct

**Tailwind CSS Not Working:**
```bash
npm install -D tailwindcss postcss autoprefixer
```

## 📝 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb+srv://taskpilotUser:Taskpilot1234@cluster0.jvmxfv5.mongodb.net
JWT_SECRET=taskpilot_secret_key
PORT=5000
```

## 🚀 Deployment

### Backend Deployment
Can be deployed to:
- Heroku
- Render
- Railway
- AWS EC2

### Frontend Deployment
Can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

**Note:** Update the API base URL in `frontend/src/utils/api.js` to your deployed backend URL.

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Development

### Available Scripts

**Backend:**
- `npm start` - Start the server
- `npm run dev` - Start with nodemon (auto-restart)

**Frontend:**
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

This is a complete project implementation. Feel free to fork and customize as needed.

## 📧 Support

For issues or questions, please check:
1. MongoDB connection is active
2. Backend server is running
3. Frontend is pointing to correct backend URL
4. All dependencies are installed

---

**Built with ❤️ by Priyanka Singh using MERN Stack**
