import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import {
  createEmployee,
  getEmployees,
  getEmployeeById
} from '../controllers/userController.js';

const router = express.Router();

// All routes require authentication and admin privileges
router.use(authenticate);
router.use(authorizeAdmin);

// @route   POST /api/employees
// @desc    Create a new employee
// @access  Private/Admin
router.post('/', createEmployee);

// @route   GET /api/employees
// @desc    Get all employees with task counts
// @access  Private/Admin
router.get('/', getEmployees);

// @route   GET /api/employees/:id
// @desc    Get single employee by ID
// @access  Private/Admin
router.get('/:id', getEmployeeById);

export default router;
