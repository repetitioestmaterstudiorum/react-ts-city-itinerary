const express = require("express");
const itineraryModel = require("../model/itineraryModel");
const router = express.Router();

// function to turn anything to Title Case (first letter of every word is a capital letter)
const toTitleCase = phrase => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// get all itineraries
router.get("/all", (req, res) => {
  itineraryModel
    .find({})
    .then(itineraries => {
      res.send(itineraries);
    })
    .catch(err => console.log(err));
});

// get all itineraries from a specific city
router.get("/:name", (req, res) => {
  const city = req.params.name;
  const titleCaseCity = toTitleCase(city); // searching for cities in title case
  itineraryModel
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
    profileName: req.body.profileName,
    profilePicture: req.body.profilePicture,
    likes: req.body.likes,
    hashtags: req.body.hashtags,
    activities: req.body.activities
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
