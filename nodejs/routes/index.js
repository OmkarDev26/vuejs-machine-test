const express = require("express");
const router = express.Router();

const countryRoute = require("../routes/countryRoute");

router.use("/", countryRoute);
router.get("/check", (req, res) => {
  res.send("Hello from APIs");
});

module.exports = router;
