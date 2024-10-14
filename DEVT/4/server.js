const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// MySQL connection settings
const dbHost = 'localhost';
const dbUser    = 'task_user';
const dbPassword = 'password';
const dbName = 'task_management'

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName
});

// Create a new task
app.post('/create-task', async (req, res) => {
  const { taskName, taskDesc, dueDate } = req.body;
  try {
    const result = await pool.execute(`INSERT INTO tasks (name, description, due_date) VALUES (?, ?, ?)`, [taskName, taskDesc, dueDate]);
    res.json({ insertId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Delete a task
app.delete('/delete-task/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    await pool.execute(`DELETE FROM tasks WHERE id = ?`, [taskId]);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Update task status
app.put('/update-task-status/:id', async (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;
  try {
    await pool.execute(`UPDATE tasks SET status = ? WHERE id = ?`, [status, taskId]);
    res.json({ message: 'Task status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update task status' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});