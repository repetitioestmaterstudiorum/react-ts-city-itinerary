const express = require("express");
const userModel = require("../model/userModel");
const router = express.Router();

// get all users
router.get("/all", (req, res) => {
  userModel
    .find({})
    .then(users => {
      res.send(users);
    })
    .catch(err => console.log(err));
});

// get specific user
router.get("/:email", (req, res) => {
  const email = req.params.email;
  userModel
    .find({ email: email })
    .then(email => {
      res.send(email);
    })
    .catch(err => console.log(err));
});

// post new user
router.post("/", (req, res) => {
  const newUser = new userModel({
    email: req.body.email,
    password: req.body.password,
    profilePicture: req.body.profilePicture
  });
  newUser
    .save()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send("Server error: ", err);
    });
});

module.exports = router;
