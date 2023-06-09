const mongoose = require('mongoose');
const Task = require('../../src/models/taskModel');
const taskRepository = require('../../src/repositories/taskRepository');

describe('Task Repository', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test_db', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should get all tasks', async () => {
    const taskData = [
      { title: 'Task 1', description: 'Description for Task 1' },
      { title: 'Task 2', description: 'Description for Task 2' },
      { title: 'Task 3', description: 'Description for Task 3' }
    ];

    await Task.create(taskData);

    const tasks = await taskRepository.getAllTasks();

    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBe(taskData.length);
  });

  it('should get a task by ID', async () => {
    const taskData = { title: 'Task 4', description: 'Description for Task 4' };

    const createdTask = await Task.create(taskData);

    const task = await taskRepository.getTaskById(createdTask._id);

    expect(task.title).toBe(taskData.title);
    expect(task.description).toBe(taskData.description);
  });

  it('should create a new task', async () => {
    const taskData = { title: 'Task 5', description: 'Description for Task 5' };

    await taskRepository.createTask(taskData.title, taskData.description);

    const createdTask = await Task.findOne({ title: taskData.title });

    expect(createdTask).toBeDefined();
    expect(createdTask.title).toBe(taskData.title);
    expect(createdTask.description).toBe(taskData.description);
  });

  it('should update a task', async () => {
    const taskData = { title: 'Task 6', description: 'Description for Task 6' };

    const createdTask = await Task.create(taskData);

    const updatedTaskData = {
      title: 'Updated Task',
      description: 'Updated description'
    };

    await taskRepository.updateTask(createdTask._id, updatedTaskData.title, updatedTaskData.description);

    const updatedTask = await Task.findById(createdTask._id);

    expect(updatedTask.title).toBe(updatedTaskData.title);
    expect(updatedTask.description).toBe(updatedTaskData.description);
  });

  it('should delete a task', async () => {
    const taskData = { title: 'Task 7', description: 'Description for Task 7' };

    const createdTask = await Task.create(taskData);

    await taskRepository.deleteTask(createdTask._id);

    const deletedTask = await Task.findById(createdTask._id);

    expect(deletedTask).toBeNull();
  });
});
