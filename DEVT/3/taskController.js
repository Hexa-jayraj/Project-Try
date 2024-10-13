// controllers/taskController.js
const Task = require('../models/task');

class TaskController {
  async getTasks(req, res) {
    const userId = req.params.userId;
    const tasks = await Task.getTasks(userId);
    res.json(tasks);
  }

  async createTask(req, res) {
    const { userId, title, description, dueDate } = req.body;
    await Task.createTask(userId, title, description, dueDate);
    res.json({ message: 'Task created successfully' });
  }

  async updateTask(req, res) {
    const id = req.params.id;
    const { title, description, dueDate } = req.body;
    await Task.updateTask(id, title, description, dueDate);
    res.json({ message: 'Task updated successfully' });
  }

  async deleteTask(req, res) {
    const id = req.params.id;
    await Task.deleteTask(id);
    res.json({ message: 'Task deleted successfully' });
  }

  async markTaskAsCompleted(req, res) {
    const id = req.params.id;
    await Task.markTaskAsCompleted(id);
    res.json({ message: 'Task marked as completed successfully' });
  }
}

module.exports = TaskController;
