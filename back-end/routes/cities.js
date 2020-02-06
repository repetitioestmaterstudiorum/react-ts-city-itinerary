const express = require("express");
const cityModel = require("../model/cityModel");
const router = express.Router();

router.get("/test", (req, res, next) => {
  res.send({ msg: "Cities test route." });
  next();
});

/*get all cities*/
router.get("/all", (req, res) => {
  cityModel
    .find({})
    .then(files => {
      res.send(files);
    })
    .catch(err => console.log(err));
});

router.post("/", (req, res) => {
  const newCity = new cityModel({
    name: req.body.name,
    country: req.body.country,
    img: req.body.img
  });
  newCity
    .save()
    .then(city => {
      res.send(city);
    })
    .catch(err => {
      res.status(500).send("Server error");
    });
});

module.exports = router;
