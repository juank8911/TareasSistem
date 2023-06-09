const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    vencimiento:{
      type:Date,
      required: false
    },
    estado:{
      type:String,
      required:true
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    ejecuta: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
