import Task from '../models/taskModel.js';
import User from '../models/userModel.js';

/**
 * @route   POST /api/tasks
 * @desc    Create a new task (Admin only)
 * @access  Private/Admin
 */
const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status, priority, dueDate } = req.body;

    // Validate input
    if (!title || !description || !assignedTo) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, and assignedTo'
      });
    }

    // Check if assigned user exists and is an employee
    const employee = await User.findById(assignedTo);
    if (!employee || employee.role !== 'employee') {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee ID'
      });
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      assignedTo,
      status: status || 'Pending',
      priority: priority || 'Medium',
      dueDate,
      createdBy: req.user._id
    });

    // Populate assignedTo and createdBy fields
    await task.populate('assignedTo', 'name email');
    await task.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating task',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks (Admin: all tasks, Employee: own tasks)
 * @access  Private
 */
const getTasks = async (req, res) => {
  try {
    let query = {};

    // If employee, only show their assigned tasks
    if (req.user.role === 'employee') {
      query.assignedTo = req.user._id;
    }

    // Optional status filter
    if (req.query.status) {
      query.status = req.query.status;
    }

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/tasks/:id
 * @desc    Get single task by ID
 * @access  Private
 */
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // If employee, check if task is assigned to them
    if (req.user.role === 'employee' && task.assignedTo._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching task',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update task (Admin: all fields, Employee: status only)
 * @access  Private
 */
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // If employee, check if task is assigned to them and only allow status update
    if (req.user.role === 'employee') {
      if (task.assignedTo.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      // Only allow status update for employees
      if (req.body.status) {
        task.status = req.body.status;
        await task.save();
        
        await task.populate('assignedTo', 'name email');
        await task.populate('createdBy', 'name email');

        return res.status(200).json({
          success: true,
          message: 'Task status updated successfully',
          data: task
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Employees can only update task status'
        });
      }
    }

    // Admin can update all fields
    const { title, description, assignedTo, status, priority, dueDate } = req.body;

    if (title) task.title = title;
    if (description) task.description = description;
    if (assignedTo) {
      // Validate assignedTo user
      const employee = await User.findById(assignedTo);
      if (!employee || employee.role !== 'employee') {
        return res.status(400).json({
          success: false,
          message: 'Invalid employee ID'
        });
      }
      task.assignedTo = assignedTo;
    }
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (dueDate) task.dueDate = dueDate;

    await task.save();
    
    await task.populate('assignedTo', 'name email');
    await task.populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating task',
      error: error.message
    });
  }
};

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete task (Admin only)
 * @access  Private/Admin
 */
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting task',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/tasks/stats/dashboard
 * @desc    Get task statistics for dashboard (Admin only)
 * @access  Private/Admin
 */
const getTaskStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const pendingTasks = await Task.countDocuments({ status: 'Pending' });
    const inProgressTasks = await Task.countDocuments({ status: 'In Progress' });
    const completedTasks = await Task.countDocuments({ status: 'Completed' });
    const onHoldTasks = await Task.countDocuments({ status: 'On Hold' });

    res.status(200).json({
      success: true,
      data: {
        total: totalTasks,
        pending: pendingTasks,
        inProgress: inProgressTasks,
        completed: completedTasks,
        onHold: onHoldTasks
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching task statistics',
      error: error.message
    });
  }
};

export {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats
};
