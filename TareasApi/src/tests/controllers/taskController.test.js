const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
const Task = require('../../src/models/taskModel');

describe('Task Controller', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test_db', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should get all tasks', async () => {
    const response = await request(app).get('/api/tasks');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });

  it('should create a new task', async () => {
    const taskData = {
      title: 'Task 1',
      description: 'Description for Task 1'
    };

    const response = await request(app)
      .post('/api/tasks')
      .send(taskData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Task created successfully');
  });

  it('should get a task by ID', async () => {
    const taskData = {
      title: 'Task 2',
      description: 'Description for Task 2'
    };

    const createdTask = await Task.create(taskData);

    const response = await request(app).get(`/api/tasks/${createdTask._id}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(taskData.title);
    expect(response.body.description).toBe(taskData.description);
  });

  it('should update a task', async () => {
    const taskData = {
      title: 'Task 3',
      description: 'Description for Task 3'
    };

    const createdTask = await Task.create(taskData);

    const updatedTaskData = {
      title: 'Updated Task',
      description: 'Updated description'
    };

    const response = await request(app)
      .put(`/api/tasks/${createdTask._id}`)
      .send(updatedTaskData);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedTaskData.title);
    expect(response.body.description).toBe(updatedTaskData.description);
  });

  it('should delete a task', async () => {
    const taskData = {
      title: 'Task 4',
      description: 'Description for Task 4'
    };

    const createdTask = await Task.create(taskData);

    const response = await request(app).delete(`/api/tasks/${createdTask._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task deleted successfully');
  });
});

