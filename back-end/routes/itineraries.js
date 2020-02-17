const express = require("express");
const cityModel = require("../model/itineraryModel");
const router = express.Router();

// function to turn anything to Title Case (first letter of every word is a capital letter)
const toTitleCase = phrase => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// get all itineraries from a specific city
router.get("/:city", (req, res) => {
  const city = req.params.city;
  const titleCaseCity = toTitleCase(city); // searching for cities in title case
  cityModel
    .find({ city: titleCaseCity })
    .then(itinerary => {
      res.send(itinerary);
    })
    .catch(err => console.log(err));
});

// post new itinerary
router.post("/", (req, res) => {
  const newItinerary = new itineraryModel({
    name: toTitleCase(req.body.name), // ensuring itineraries have title case names
    city: toTitleCase(req.body.city), // same for cities
    profilePicture: req.body.profilePicture
  });
  newItinerary
    .save()
    .then(itinerary => {
      res.send(itinerary);
    })
    .catch(err => {
      res.status(500).send("Server error: ", err);
    });
});

module.exports = router;
