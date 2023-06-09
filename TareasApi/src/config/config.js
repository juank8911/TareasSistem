module.exports = {
  port: process.env.PORT || 3000,
  mongodbURI: process.env.MONGODB_URI || 'mongodb://localhost/tareas_bd',
  jwtSecret: process.env.JWT_SECRET || 'mysecretkey'
};
