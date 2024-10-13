const db = require('../config/database');

class Task {
  constructor(id, userId, title, description, dueDate, completed) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = completed;
  }

  static createTask(userId, title, description, dueDate) {
    const query = 'INSERT INTO tasks (user_id, title, description, due_date) VALUES (?, ?, ?, ?)';
    return db.query(query, [userId, title, description, dueDate]);
  }

  static getTasks(userId) {
    const query = 'SELECT * FROM tasks WHERE user_id = ?';
    return db.query(query, [userId]);
  }

  static updateTask(id, title, description, dueDate) {
    const query = 'UPDATE tasks SET title = ?, description = ?, due_date = ? WHERE id = ?';
    return db.query(query, [title, description, dueDate, id]);
  }

  static deleteTask(id) {
    const query = 'DELETE FROM tasks WHERE id = ?';
    return db.query(query, [id]);
  }

  static markTaskAsCompleted(id) {
    const query = 'UPDATE tasks SET completed = 1 WHERE id = ?';
    return db.query(query, [id]);
  }
}

module.exports = Task;