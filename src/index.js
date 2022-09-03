//Current Day
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let weekDay = `${day}`;
let time = `${hours}:${minutes}`;
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = `${weekDay}`;
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${time}`;

//Celsius and Fahrenheit

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
   celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

// Day Weather Condition

function weatherCondition(response) {
  console.log(response.data);
  document.querySelector("#currentCity").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#pressure").innerHTML = Math.round(
    response.data.main.pressure
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

}

//input city

function findCity(city) {
  let apiKey = "0eb94e53bcebf8654543664ce38f2839";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  findCity(city);
}

function myLocation(position) {
  let apiKey = "0eb94e53bcebf8654543664ce38f2839";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", citySubmit);

findCity("Cherkasy");

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", getCurrentLocation);

//weather in suggested cities
function londonWeather() {
  findCity("London");
}
let london = document.querySelector("#london");
london.addEventListener("click", londonWeather);

function budapestWeather() {
  findCity("Budapest");
}
let budapest = document.querySelector("#budapest");
budapest.addEventListener("click", budapestWeather);

function ontarioWeather() {
  findCity("Ontario");
}
let ontario = document.querySelector("#ontario");
ontario.addEventListener("click", ontarioWeather);

function warsawWeather() {
  findCity("Warsaw");
}
let warsaw = document.querySelector("#warsaw");
warsaw.addEventListener("click", warsawWeather);

function berlinWeather() {
  findCity("Berlin");
}
let berlin = document.querySelector("#berlin");
berlin.addEventListener("click", berlinWeather);
