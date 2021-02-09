const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 64,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 64,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
  },
};

const user = new Schema(fields, {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('user', user),
  fields,
};
