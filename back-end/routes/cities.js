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

module.exports = router;
