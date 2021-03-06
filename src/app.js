
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return `${day} ${formatHours(timestamp)}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let weatherSummaryElement = document.querySelector("#weather-summary");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let highElement = document.querySelector("#high");
  let lowElement = document.querySelector("#low");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let weatherCode = response.data.weather[0].icon;

  let sunrise = response.data.sys.sunrise;
  let sunset = response.data.sys.sunset;

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  weatherSummaryElement.innerHTML = response.data.weather[0].description;
  sunriseElement.innerHTML = `${formatHours(sunrise * 1000)}`;  
  sunsetElement.innerHTML = `${formatHours(sunset * 1000)}`; 
  highElement.innerHTML = Math.round(response.data.main.temp_max);
  lowElement.innerHTML = Math.round(response.data.main.temp_min);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${weatherCode}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`; 
  }
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast = response.data.list[0];
for (let index = 0; index < 6; index++) {
  forecast = response.data.list[index];
  forecastElement.innerHTML += `
  <div class="col px-4 mx-2 weather-forecast border rounded">
    <div class="row">
      ${formatHours(forecast.dt * 1000)}        
    </div>
    
      <img class="forecast-image"
        src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
        alt = ""
      />
  
    <div class="row">
      ${Math.round(forecast.main.temp_max)}°C | ${Math.round(forecast.main.temp_min)}°C            
    </div>
  </div>
    `;
}
}

function search(city) {
  let apiKey = "119a26e51a72faab5ad07c6426bd0fdd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature); 

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search-text-input");
  search(cityInputElement.value); 
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let celsiusTemperature = null;

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "119a26e51a72faab5ad07c6426bd0fdd";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

window.onload = function loadCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}
function findCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", findCurrentLocation);