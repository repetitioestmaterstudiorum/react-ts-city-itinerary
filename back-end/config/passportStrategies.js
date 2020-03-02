const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const userModel = mongoose.model("user");
const key = process.env.JWT_KEY;

// creating and populating the options object
const opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

// JWT strategy
module.exports = passport.use(
  new jwtStrategy(opts, (jwt_payload, done) => {
    userModel
      .findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);
