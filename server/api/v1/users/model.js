const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');
const { default: validator } = require('validator');
const { body } = require('express-validator');

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
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
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
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

user
  .virtual('name')
  .get(function getName() {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function setName(name) {
    const [firstName = '', lastName = ''] = name.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  });

const hiddenFields = ['password'];

user.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  hiddenFields.forEach((field) => {
    if (Object.hasOwnProperty.call(doc, field)) {
      delete doc[field];
    }
  });
  return doc;
};

user.pre('save', async function save(next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

user.methods.verifyPassword = function verifyPassword(password) {
  return compare(password, this.password);
};

const sanitizers = [body('email').isEmail().normalizeEmail()];

module.exports = {
  Model: mongoose.model('user', user),
  fields,
  sanitizers,
};
