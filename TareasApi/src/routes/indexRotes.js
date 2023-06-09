const express = require('express');
const authRoutes = require( './authRoutes');
const taskRoutes = require( './taskRoutes');


console.log('indexRotes');
const router = express.Router();
// Rutas de Usuario
router.use('/auth', authRoutes);
// Rutas de Pet
router.use('/task', taskRoutes);

module.exports = router;