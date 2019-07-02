// import packages
const mongoose    = require('mongoose');

// import helpers
const { required, unique, validateEmail } = require('../utils/model');

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: { type: String },
  firstName: { type: String, required: required('First name'), trim: true },
  lastName: { type: String, trim: true, default: "" },
  email: {
    address: {
      type: String,
      required: required('Email'),
      validate: {
        validator: email => validateEmail(email),
        message: props => `${props.value} is not a valid email!`,
      },
    },
    verified: { type: Boolean, default: false },
  },
  password: {
    type: String,
    required: required('Password'),
  },
}, {
  collection: 'users',
  timestamps: true,
});

/**
 * Pre hooks
 */
UserSchema.pre('save', function preSave() {
  const user = this;
  user.id = user._id.toString();
});

/**
 * Post hooks
 */
UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('You are already registered, Please try to login with your password'));
  } else {
    next(error);
  }
});

// index
UserSchema.index({ "email.address": 1 }, {
  unique: true,
});

const Users   = mongoose.model('Users', UserSchema);

module.exports = Users;
