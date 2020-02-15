const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
    // unique: true
  },
  profilePicture: {
    type: String,
    required: true
  }
});

// the name of the module is the singular version (city) of the database name (cities)
module.exports = mongoose.model("itinerary", itinerarySchema);
