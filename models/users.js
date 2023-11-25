const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  password: { type: String,required: true },
  state: { type: String },
  city: { type: String }
});

module.exports = mongoose.model('User', userSchema);