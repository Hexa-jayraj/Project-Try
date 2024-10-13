// controllers/userController.js
const User = require('../models/user');

class UserController {
  async register(req, res) {
    const { username, password } = req.body;
    await User.createUser(username, password);
    res.json({ message: 'User  created successfully' });
  }

  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.getUserByUsername(username);
    if (!user) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }
    const isValidPassword = await User.comparePasswords(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }
    res.json({ message: 'Login successful' });
  }
}

module.exports = UserController;

