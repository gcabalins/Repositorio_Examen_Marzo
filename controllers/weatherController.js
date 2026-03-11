const weatherService = require("../services/weatherService");

exports.getWeatherCity = async (req, res) => {

    const city = req.query.city;

    const data = await weatherService.getWeatherByCity(city);

    res.json(data);
};

exports.getWeatherLocation = async (req, res) => {

    const { lat, lon } = req.query;

    const data = await weatherService.getWeatherByCoords(lat, lon);

    res.json(data);
};