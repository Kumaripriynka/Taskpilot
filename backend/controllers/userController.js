import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import Task from '../models/taskModel.js';

/**
 * @route   POST /api/employees
 * @desc    Create a new employee (Admin only)
 * @access  Private/Admin
 */
const createEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Employee already exists with this email'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create employee
    const employee = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'employee'
    });

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        createdAt: employee.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating employee',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/employees
 * @desc    Get all employees with task counts (Admin only)
 * @access  Private/Admin
 */
const getEmployees = async (req, res) => {
  try {
    // Get all employees
    const employees = await User.find({ role: 'employee' }).select('-password');

    // Get task counts for each employee
    const employeesWithTaskCounts = await Promise.all(
      employees.map(async (employee) => {
        const totalTasks = await Task.countDocuments({ assignedTo: employee._id });
        const completedTasks = await Task.countDocuments({ 
          assignedTo: employee._id, 
          status: 'Completed' 
        });
        const pendingTasks = await Task.countDocuments({ 
          assignedTo: employee._id, 
          status: { $in: ['Pending', 'In Progress', 'On Hold'] } 
        });

        return {
          _id: employee._id,
          name: employee.name,
          email: employee.email,
          role: employee.role,
          createdAt: employee.createdAt,
          taskCounts: {
            total: totalTasks,
            completed: completedTasks,
            pending: pendingTasks
          }
        };
      })
    );

    res.status(200).json({
      success: true,
      count: employeesWithTaskCounts.length,
      data: employeesWithTaskCounts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching employees',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/employees/:id
 * @desc    Get single employee details
 * @access  Private/Admin
 */
const getEmployeeById = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id).select('-password');

    if (!employee || employee.role !== 'employee') {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching employee',
      error: error.message
    });
  }
};

export {
  createEmployee,
  getEmployees,
  getEmployeeById
};
