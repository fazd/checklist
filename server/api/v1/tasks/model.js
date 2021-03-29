const mongoose = require('mongoose');
const validator = require('validator');
const { body } = require('express-validator');

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
    default: '',
    required: true,
    trim: true,
    maxLength: 255,
  },
  url: {
    type: String,
    default: '',
    trim: true,
    validate: {
      validator(value) {
        return value ? validator.isURL(value) : true;
      },
      message: (props) => `${props.value} is not a valid url.`,
    },
  },
  dueDate: {
    type: Date,
    default: null,
  },
};

const references = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: 'group',
  },
};

const sanitizers = [
  body('title').escape(),
  body('completed').toBoolean(),
  body('description').escape(),
  body('dueDate').toDate(),
];

const task = new Schema(Object.assign(fields, references), {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('task', task),
  fields,
  references,
  sanitizers,
};
