const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const countryController = require("../controller/countryController");

router.get("/", getDetailedList);

async function getDetailedList(req, res, next) {
  try {
    const data = await countryController.getDetailedList();
    res.send(data);
  } catch (error) {
    next(error);
  }
}

router.get("/countries", getCountries);

async function getCountries(req, res, next) {
  try {
    const data = await countryController.getCountries();
    res.send(data);
  } catch (error) {
    next(error);
  }
}

router.get("/country/:country", getCountryById);

async function getCountryById(req, res, next) {
  try {
    const payload = {
      ...req.params,
    };
    console.log(req.params, "req");
    const data = await countryController.getCountryById(payload);
    res.send(data);
  } catch (error) {
    next(error);
  }
}

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/images");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: Storage });

router.post("/country", upload.single("image"), addCountry);

async function addCountry(req, res, next) {
  try {
    const payload = {
      name: req.body.name,
      continent: req.body.continent,
      flag: `images/${req.file.filename}`,
      rank: req.body.rank,
    };
    console.log(payload, req.body, "test");
    const data = await countryController.addCountry(payload);
    res.send(data);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
