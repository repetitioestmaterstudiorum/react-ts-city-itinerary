const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConfirmation: {
    type: String
  },
  profilePicture: {
    type: String,
    required: true
  },
  likedItineraries: {
    type: Array
  }
});

// the name of the module is the singular version (city) of the database name (cities)
module.exports = mongoose.model("user", userSchema);
