const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const router = express.Router();
const userModel = require("../models/userModel");
const saltRounds = 10;
const jwtKey = process.env.JWT_KEY;

// function to turn anything to Title Case (first letter of every word is a capital letter)
const toTitleCase = phrase => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

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
        firstName: toTitleCase(req.body.firstName),
        lastName: toTitleCase(req.body.lastName),
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
              // setTimeout(function() {
              //   res.json({
              //     success: true,
              //     token: token
              //   });
              // }, 1800);
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

// add liked itinerary
router.put("/add-liked-itinerary", (req, res) => {
  userModel
    .updateOne(
      { _id: req.body.userID },
      { $push: { likedItineraries: req.body.itineraryID } }
    )
    .catch(err => console.log(err));
});

// remove liked itinerary
router.put("/remove-liked-itinerary", (req, res) => {
  userModel
    .updateOne(
      { _id: req.body.userID },
      { $pull: { likedItineraries: req.body.itineraryID } }
    )
    .catch(err => console.log(err));
});

// image-upload
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname); //
    }
  })
});

// image post route
router.post("/image-upload", upload.single("image"), function(req, res, next) {
  if (!req.file) res.status(400).send("Nothing was uploaded!");
  console.log("reqfile", req.file);
  res.status(201).json({
    message: "Successfully uploaded " + req.file.originalname,
    file: req.file
  });
});
// for multiple files:
// router.post("/file-upload", upload.array("image", 3), (req, res) => {
//   if (!req.files) res.status(400).send("No files were uploaded.");
//   res.status(201).json({
//     message: "Successfully uploaded " + req.files.length + " files!",
//     files: req.files
//   });
// });

module.exports = router;
