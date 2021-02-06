const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 128,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 255,
  },
  url: {
    type: String,
    default: '',
    trim: true,
  },
  dueDate: {
    type: Date,
    default: null,
  },
};

const task = new Schema(fields, {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('task', task),
  fields,
};
