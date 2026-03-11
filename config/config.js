require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  weatherApiKey: process.env.WEATHER_API_KEY,
  dbType: process.env.DB_TYPE
};