const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  img: {
    type: String
  }
});

// the name of the module is the singular version (city) of the database name (cities)
module.exports = mongoose.model("city", citySchema);
