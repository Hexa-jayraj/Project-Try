const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Dashboard route to display tasks for the logged-in user
router.get('/dashboard', async (req, res) => {
  if (req.session.isLoggedIn) {
    const userId = req.session.userId; // Assuming userId is stored in session
    const tasks = await Task.getTasks(userId);
    res.render('dashboard', { tasks });
  } else {
    res.redirect('/login');
  }
});

// Existing route to get tasks for a specific user
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const tasks = await Task.getTasks(userId);
  res.json(tasks);
});

// Existing route to create a new task
router.post('/', async (req, res) => {
  const { userId, title, description, dueDate } = req.body;
  await Task.createTask(userId, title, description, dueDate);
  res.json({ message: 'Task created successfully' });
});

// Existing route to update a task
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { title, description, dueDate } = req.body;
  await Task.updateTask(id, title, description, dueDate);
  res.json({ message: 'Task updated successfully' });
});

// Existing route to delete a task
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await Task.deleteTask(id);
  res.json({ message: 'Task deleted successfully' });
});

// Existing route to mark a task as completed
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  await Task.markTaskAsCompleted(id);
  res.json({ message: 'Task marked as completed successfully' });
});

module.exports = router;
