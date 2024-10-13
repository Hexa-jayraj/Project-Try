const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  static createUser(username, password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    return db.query(query, [username, hashedPassword]);
  }

  static getUserByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';
    return db.query(query, [username]);
  }

  static comparePasswords(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

module.exports = User;
