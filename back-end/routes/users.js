const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;
const passport = require("passport");

// post new user
router.post(
  "/create-account",
  [
    // validating inputs
    check("email")
      .isEmail()
      .withMessage("Email must be a valid email address!"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least be 8 characters long!"),
    check("password")
      .matches(/\d/)
      .withMessage("Password must contain a number!")
  ],
  (req, res) => {
    // create validation object
    const errors = validationResult(req);
    // send validation errors in case there are any
    if (!errors.isEmpty()) {
      return res.status(422).send(errors.array());
    }
    // check if the email already exists
    userModel.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).send("Email already exists!");
      }
      // check if the passwords match
      if (req.body.password !== req.body.passwordConfirmation) {
        return res.status(400).send("Passwords don't match!");
      }
      // if all is fine, create a new user
      const newUser = new userModel({
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture
      });
      // password encryption
      bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        // save the new user
        newUser
          .save()
          .then(user => {
            user.password = "you wish!";
            res.send(user);
          })
          .catch(err => console.error(err));
      });
    });
  }
);

// post login
router.post("/log-in", (req, res) => {
  //find user by email
  userModel.findOne({ email: req.body.email }).then(user => {
    // send error if user doesn't exist
    if (!user) {
      return res.status(400).send("Email not found");
    }
    // check if passwords match
    bcrypt
      .compare(req.body.password, user.password)
      .then(matches => {
        if (matches) {
          // creating a JWT payload
          const payload = {
            id: user.id,
            email: user.email
          };
          const options = { expiresIn: 1814400 }; // 21 days = 1814400 seconds
          // create and sign the JWT token
          jwt.sign(payload, jwtKey, options, (err, token) => {
            if (err) {
              res.json({
                success: false,
                token: `There was an error signing the JWT token: ${err}`
              });
            } else {
              res.json({
                success: true,
                token: token
              });
            }
          });
        } else {
          return res.status(400).send("Password incorrect");
        }
      })
      .catch(err => console.log(err));
  });
});

// get route using passport to check for authorisation
router.get(
  "/auth",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel
      .findOne({ _id: req.user.id })
      .then(user => {
        user.password = "you wish!";
        res.send(user);
      })
      .catch(err => res.status(404).send("User does not exist!"));
  }
);

module.exports = router;
