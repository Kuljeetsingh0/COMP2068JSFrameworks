const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model('users', userSchema);

module.exports = User;
