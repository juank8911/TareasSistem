const express = require('express');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isAuthenticatedAdmin,taskController.getAllTasks);
router.get('/:id',authController.isAuthenticatedAdmin, taskController.getTaskById);
router.post('/',authController.isAuthenticatedAdmin, taskController.createTask);
router.post('/:id',authController.isAuthenticated, taskController.updateTaskEstado);
router.put('/:id',authController.isAuthenticatedAdmin, taskController.updateTask);
router.get('/:id/:rol',authController.isAuthenticated, taskController.getTasksRol)
router.delete('/:id',authController.isAuthenticatedAdmin, taskController.deleteTask);

module.exports = router;
