const express = require('express');
const mongoose   = require('mongoose');
const dotenv     = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const indexRotes = require('./routes/indexRotes');


dotenv.config();

const app = express();
app.use(express.static('src/public'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tareas_bd';
/// ya les dije 
mongoose
.connect('mongodb://127.0.0.1:27017/tareas_bd', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
    app.use(cors());
    app.use(cookieParser());
    app.use('/',indexRotes);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

