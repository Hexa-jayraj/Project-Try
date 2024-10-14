const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// MySQL connection settings
const dbHost = 'localhost';
const dbUser  = 'task_user';
const dbPassword = 'password';
const dbName = 'task_management';

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: dbHost,
  user: dbUser ,
  password: dbPassword,
  database: dbName,
  connectionLimit: 10,
});

// Create a route to handle task creation
app.post('/create-task', async (req, res) => {
  const { taskName, taskDesc, dueDate } = req.body;

  // Validate input data
  if (!taskName || !taskDesc || !dueDate) {
    return res.status(400).send({ message: 'Invalid input data' });
  }

  try {
    const results = await pool.execute(`INSERT INTO tasks (name, description, due_date) VALUES (?, ?, ?)`, [taskName, taskDesc, dueDate]);
    res.send({ message: 'Task created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error creating task' });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const results = await pool.execute('SELECT * FROM tasks');
    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving tasks' });
  }
});

// Serve static files from the public folder
app.use(express.static('public'));

// Start the server
const port = 4004;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Create a route for the root URL that redirects to /tasks
app.get('/', (req, res) => {
  res.redirect('/tasks');
});

