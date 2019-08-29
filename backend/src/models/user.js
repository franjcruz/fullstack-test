import mongoose from 'mongoose';

let user = mongoose.Schema({
  email: String,
  password: String,
  role: String
});

module.exports = mongoose.model('User', user);
