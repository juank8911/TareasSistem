const express = require('express');
const cors = require('cors');
const indexRotes = require('./routes/indexRotes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', indexRotes);

module.exports = app;
