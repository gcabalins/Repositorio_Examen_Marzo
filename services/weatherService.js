const config = require("../config/config");

exports.getWeatherByCity = async (city) => {

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.weatherApiKey}&units=metric`
    );

    return response.json();
};

exports.getWeatherByCoords = async (lat, lon) => {

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.weatherApiKey}&units=metric`
    );

    return response.json();
};