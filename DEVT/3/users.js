const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  await User.createUser(username, password);
  req.session.isLoggedIn = true;
  res.redirect('/dashboard');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
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
  req.session.isLoggedIn = true;
  res.redirect('/dashboard');
});

module.exports = router;
