const express = require("express");
const itineraryModel = require("../models/itineraryModel");
const router = express.Router();
const userModel = require("../models/userModel");
const { toTitleCase } = require("../misc/sharedFunctions");

// get all itineraries
router.get("/all", (req, res) => {
  itineraryModel
    .find({})
    .then(itineraries => {
      res.send(itineraries);
    })
    .catch(err => console.log(err));
});

// get liked itineraries based on an array of IDs
router.get("/per-user/:userId", (req, res) => {
  userModel
    .findOne({ _id: req.params.userId })
    .then(user => {
      itineraryModel
        .find({
          _id: {
            $in: user.likedItineraries
          }
        })
        .then(itineraries => {
          res.send(itineraries);
        });
    })
    .catch(err => console.log("********" + err));
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

// increase likes
router.put("/increase-likes", (req, res) => {
  itineraryModel
    .findOneAndUpdate({ _id: req.body.itineraryID }, { $inc: { likes: 1 } })
    .catch(err => console.log(err));
});

// decrease likes
router.put("/decrease-likes", (req, res) => {
  itineraryModel
    .findOneAndUpdate({ _id: req.body.itineraryID }, { $inc: { likes: -1 } })
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
