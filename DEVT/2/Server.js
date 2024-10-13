const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let tasks = [
    { id: 1, title: 'Task 1', description: 'Description 1', completed: false },
    { id: 2, title: 'Task 2', description: 'Description 2', completed: false },
    { id: 3, title: 'Task 3', description: 'Description 3', completed: false }
];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const task = { id: tasks.length + 1, title, description, completed: false };
    tasks.push(task);
    res.json(task);
});

app.patch('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === id);
    if (task) {
        task.completed = true;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        res.json({ message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.listen(port, () => {
    console.log("Server started on ,port ${port}");
});