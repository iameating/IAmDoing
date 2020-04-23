const API_KEY = "64c29b1d88f4e14a4e891b37448daadc";
const iconSelect = document.querySelector(".weather__icon")
const Weather__description = document.querySelector(".weather__description")
const weather__temperature = document.querySelector(".weather__temperature")
const Weather__location = document.querySelector(".weather__location")
const Weather__humidity = document.querySelector(".weather__humidity")
const WeatherShowing = document.querySelector("section.weather")

function saveCoord(coordObj) {
    sessionStorage.setItem("coords", JSON.stringify(coordObj))
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordObj = {
        latitude,
        longitude
    };
    saveCoord(coordObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    iconSelect.setAttribute("src", "icons/unknown.png")
    Weather__description.innerText = `???`;
    weather__temperature.innerText = "-℃"
    Weather__location.innerText = "지구 어딘가";
    Weather__humidity.innerText = "위치모름"
}

function getGeolocation() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError, {
        enableHighAccuracy: true
    });
}

function getWeather(lat, lon) {
    let WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang={kr}`

    if (location.protocol === 'http:') {
        WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang={kr}`
    } else {
        WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang={kr}`
    }
    fetch(WEATHER_URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const description = json.weather[0].description;
            const icon = json.weather[0].icon;
            const temperature = json.main.temp;
            const currentLocation = json.name;
            const humidity = json.main.humidity;
            const errorCode = json.cod;
            if (errorCode === "401") {
                iconSelect.setAttribute("src", "icons/unknown.png")
                Weather__description.innerText = `???`;
                weather__temperature.innerText = "-℃"
                Weather__location.innerText = "지구 어딘가";
                Weather__humidity.innerText = "API 불러오기 실패"
            } else {
                iconSelect.setAttribute("src", `icons/${icon}.png`);
                Weather__description.innerText = `${description}`;
                weather__temperature.innerText = `${temperature.toFixed(1)}℃`;
                Weather__location.innerText = `${currentLocation}`;
                Weather__humidity.innerText = `${humidity}%`;
            }
        });
}

function loadCoord() {
    const loadedCoords = sessionStorage.getItem("coords");
    if (loadedCoords === null) {
        getGeolocation();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

WeatherShowing.addEventListener("click", loadCoord);