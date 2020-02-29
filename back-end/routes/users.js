const express = require("express");
const userModel = require("../model/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { check, validationResult } = require("express-validator");

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
          .then(user => res.send(user))
          .catch(err => console.error(err));
      });
    });
  }
);

module.exports = router;
