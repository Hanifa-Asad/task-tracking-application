import asyncHandler from 'express-async-handler';
import Task from '../models/Task.mjs';

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, status, assignedTo } = req.body;

    if (!title) {
      res.status(400);
      throw new Error('Title is required');
    }

    const task = new Task({
      title,
      description: description || '',
      status: status || 'To Do',
      assignedTo,
      createdBy: req.user._id
    });

    const createdTask = await task.save();
    
    // Populate the assignedTo and createdBy fields
    const populatedTask = await Task.findById(createdTask._id)
      .populate('assignedTo', 'username email')
      .populate('createdBy', 'username email');

    res.status(201).json(populatedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({
      message: error.message || 'Server error occurred while creating task'
    });
  }
});

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  try {
    const tasks = await Task.find({})
      .populate('assignedTo', 'username email')
      .populate('createdBy', 'username email');
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      message: 'Server error occurred while fetching tasks'
    });
  }
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Verify the user is the task creator or admin
    if (task.createdBy.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this task');
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.assignedTo = req.body.assignedTo || task.assignedTo;

    const updatedTask = await task.save();
    const populatedTask = await Task.findById(updatedTask._id)
      .populate('assignedTo', 'username email')
      .populate('createdBy', 'username email');

    res.json(populatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({
      message: error.message || 'Server error occurred while updating task'
    });
  }
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Verify the user is the task creator or admin
    if (task.createdBy.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this task');
    }

    await task.remove();
    res.json({ message: 'Task removed successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      message: error.message || 'Server error occurred while deleting task'
    });
  }
});

export { getTasks, createTask, updateTask, deleteTask };