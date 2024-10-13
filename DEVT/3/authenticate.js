const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }
  try {
    const decoded = jwt .verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;

