import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats
} from '../controllers/taskController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// @route   GET /api/tasks/stats/dashboard
// @desc    Get task statistics for dashboard
// @access  Private/Admin
router.get('/stats/dashboard', authorizeAdmin, getTaskStats);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private/Admin
router.post('/', authorizeAdmin, createTask);

// @route   GET /api/tasks
// @desc    Get all tasks (Admin: all, Employee: own)
// @access  Private
router.get('/', getTasks);

// @route   GET /api/tasks/:id
// @desc    Get single task by ID
// @access  Private
router.get('/:id', getTaskById);

// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private/Admin
router.delete('/:id', authorizeAdmin, deleteTask);

export default router;
