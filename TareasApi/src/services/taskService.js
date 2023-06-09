const taskRepository = require('../repositories/taskRepository');

const getAllTasks = async () => {
  try {
    const tasks = await taskRepository.getAllTasks();
    return tasks
} catch (error) {
    throw new Error('Something went wrong');
  }
};

const getTaskById = async (id) => {
  try {
    const task = await taskRepository.getTaskById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

const createTask = async (title, description) => {
  try {
    await taskRepository.createTask(title, description);
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

const updateTask = async (id, title, description) => {
  try {
    const task = await taskRepository.updateTask(id, title, description);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

const deleteTask = async (id) => {
  try {
    const task = await taskRepository.deleteTask(id);
    if (!task) {
      throw new Error('Task not found');
    }
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
