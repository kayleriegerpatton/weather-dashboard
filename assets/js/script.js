const searchBtn = $("#searchBtn");
const searchInput = $("#search-city");
const searchForm = $(".search-form");
const API_KEY = "5458002b60131eeab00c4853ceb6235b";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const currentWeatherContainer = $(".current-weather-container");
const forecastsContainer = $(".forecasts-container");

const onLoad = function () {
  // render search history from LS
};

const renderError = function () {
  const formError = `<div id="search-error" class="form-text">
  Please enter a valid city name.
</div>`;

  // append to search form
  searchForm.append(formError);
};

const renderWeatherCards = function (weatherData) {
  //   format date
  const date = moment.unix(weatherData.current.dt).format("MM/DD/YYYY");

  //   get weather icon code for URL
  const iconCode = weatherData.current.weather[0].icon;

  //   render current weather card
  const currentWeather = `<h2>City Name (${date})</h2>
  <div class="current-weather-elements">
    <div>
      <img
        src="https://openweathermap.org/img/w/${iconCode}.png"
        alt=""
        class="current-weather-img"
      />
    </div>
    <div class="current-weather">
      <p>Temp: ${weatherData.current.temp}°C</p>
      <p>Wind: ${weatherData.current.wind_speed}m/s</p>
      <p>Humidity: ${weatherData.current.humidity}%</p>
      <p>UV Index:<span class="bg" id="low-UV">${weatherData.current.uvi}</span></p>
    </div>
  </div>`;
  // append to current weather container
  currentWeatherContainer.append(currentWeather);

  //    set forecast array
  const forecastArray = weatherData.daily;

  //   NEED HELP HERE
  //    filter forecast array to get i=1-5 (0=current)
  const isFiveDayForecast = function (day, index) {
    return index > 0;
  };

  const fiveDayArray = forecastArray.filter(isFiveDayForecast);

  //  render forecast cards
  const renderForecasts = function () {
    //   map through forecastArray
    const forecastCards = forecastArray.map(constructForecast).join("");

    //   append to forecastsContainer
    forecastsContainer.append(forecastCards);
  };
};

const handleResponse = function (response) {
  return response.json();
};

const handleData = function (data) {
  if (data.message === "city not found") {
    renderError();
  } else {
    //   get city name
    const cityName = data.name;

    //   construct URL for weather
    const url = `${BASE_URL}onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`;
    fetch(url).then(handleResponse).then(renderWeatherCards);
  }
};

//   add to LS
//   render search history from LS
// get data from LS

const onSearch = function (event) {
  event.preventDefault();

  // get city (user input)
  let city = $(searchInput).val();

  // validate city
  if (city) {
    //   if error is displayed, remove
    if ($("#search-error").length) {
      $("#search-error").remove();
    }

    // construct API URL for city data
    const url = `${BASE_URL}weather?q=${city}&appid=${API_KEY}`;

    //   get API data
    fetch(url).then(handleResponse).then(handleData);
  } else {
    //   render error
    renderError();
  }
};

$(searchBtn).click(onSearch);
$(document).ready(onLoad);
