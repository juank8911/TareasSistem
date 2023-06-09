const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, config.jwtSecret, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    req.username = decoded.username;
    next();
  });
};

module.exports = {
  verifyToken
};
