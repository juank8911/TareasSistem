const Task = require('../models/taskModel');

const createTask = async (taskData) => {
  const task = new Task(taskData);
  return task.save();
};

const getTasks = () => {
  return Task.find();
};

const getTaskById = (taskId) => {
  return Task.findById(taskId);
};

const updateTask = (taskId, taskData) => {
  return Task.findByIdAndUpdate(taskId, taskData, { new: true });
};

const deleteTask = (taskId) => {
  return Task.findByIdAndDelete(taskId);
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
