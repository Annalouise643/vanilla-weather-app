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
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let weatherCode = response.data.weather[0].icon;

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  weatherSummaryElement.innerHTML = response.data.weather[0].description;
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
let forecast = response.data.list[0];
console.log(forecast);
forecastElement.innerHTML = `
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

forecast = response.data.list[1];
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
`
forecast = response.data.list[2];
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
`
forecast = response.data.list[3];
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
`
forecast = response.data.list[4];
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
`
forecast = response.data.list[5];
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
`
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