const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: String,
    required: true
  },
  profileName: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  hashtags: {
    type: Array,
    required: false
  }
});

// the name of the module is the singular version (city) of the database name (cities)
module.exports = mongoose.model("itinerary", itinerarySchema);
