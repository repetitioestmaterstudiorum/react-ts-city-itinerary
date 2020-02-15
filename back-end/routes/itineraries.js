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

// // get all cities
// router.get("/all", (req, res) => {
//     cityModel
//         .find({})
//         .then(files => {
//             res.send(files);
//         })
//         .catch(err => console.log(err));
// });

// // get specific city
// router.get("/:name", (req, res) => {
//     const name = req.params.name;
//     const titleCaseName = toTitleCase(name); // searching for cities in title case
//     cityModel
//         .find({ name: titleCaseName })
//         .then(city => {
//             res.send(city);
//         })
//         .catch(err => console.log(err));
// });

// // post new city
// router.post("/", (req, res) => {
//     const newCity = new cityModel({
//         name: toTitleCase(req.body.name), // ensuring cities have title case names
//         country: toTitleCase(req.body.country), // same for countries
//         img: req.body.img
//     });
//     newCity
//         .save()
//         .then(city => {
//             res.send(city);
//         })
//         .catch(err => {
//             res.status(500).send("Server error: ", err);
//         });
// });

module.exports = router;
