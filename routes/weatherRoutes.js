const express = require("express");
const router = express.Router();

const weatherController = require("../controllers/weatherController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/city", authMiddleware, weatherController.getWeatherCity);

router.get("/location", authMiddleware, weatherController.getWeatherLocation);

module.exports = router;