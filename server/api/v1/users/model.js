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
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  }
});


user
  .virtual('name').get(function getName() {
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


module.exports = {
  Model: mongoose.model('user', user),
  fields,
};
