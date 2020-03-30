require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();
const port = process.env.PORT || 5000;
const mongooseConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

const promise = mongoose
  .connect(process.env.MONGO_URI, mongooseConfig)
  .then(() => console.log("Connection to Mongo DB established"))
  .catch(err => console.log(err));

mongoose.set("useFindAndModify", false);

// routes
app.use("/cities", require("./routes/cities"));
app.use("/itineraries", require("./routes/itineraries"));
app.use("/users", require("./routes/users"));

// passport middleware
app.use(passport.initialize());
// passport strategies
require("./misc/passportStrategies");
