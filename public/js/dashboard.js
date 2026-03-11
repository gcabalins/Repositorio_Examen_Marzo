
const token = localStorage.getItem("token");

if (!token) {
    window.location = "/";
}

async function searchCity() {

    const city = document.getElementById("cityInput").value;

    const res = await fetch(`/api/weather/city?city=${city}`, {

        headers: {
            Authorization: token
        }

    });

    const data = await res.json();

    showWeather(data);

    saveSearch(city);

    loadRecent();

}
function showWeather(data) {

    const div = document.getElementById("weatherResult");

    div.innerHTML = `
    
    <h4>${data.name}</h4>

    <p>🌡 Temp: ${data.main.temp} °C</p>

    <p>💧 Humedad: ${data.main.humidity}%</p>

    <p>☁️ ${data.weather[0].description}</p>

    `;

}
function useLocation() {

    navigator.geolocation.getCurrentPosition(async position => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const res = await fetch(`/api/weather/location?lat=${lat}&lon=${lon}`, {

            headers: {
                Authorization: token
            }

        });

        const data = await res.json();

        showWeather(data);

    });

}
function saveSearch(city) {

    let searches = JSON.parse(localStorage.getItem("searches")) || [];

    searches.unshift(city);

    searches = searches.slice(0, 5);

    localStorage.setItem("searches", JSON.stringify(searches));

}
function loadRecent() {

    const div = document.getElementById("recentSearches");

    const searches = JSON.parse(localStorage.getItem("searches")) || [];

    div.innerHTML = "";

    searches.forEach(city => {

        div.innerHTML += `
        <button class="btn btn-outline-primary m-1" onclick="quickSearch('${city}')">
        ${city}
        </button>
        `;

    });

}
function quickSearch(city) {

    document.getElementById("cityInput").value = city;

    searchCity();

}
loadRecent();