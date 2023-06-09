const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();
console.log('authRoutes');
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/eject',authController.isAuthenticated,authController.getEject)

module.exports = router;
