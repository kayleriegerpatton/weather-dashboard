const searchBtn = $("#searchBtn");
const searchInput = $("#search-city");
const searchForm = $(".search-form");
const API_KEY = "5458002b60131eeab00c4853ceb6235b";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const weatherCardsContainer = $(".weather-containers");
const currentWeatherContainer = $(".current-weather-container");
const forecastsContainer = $(".forecasts-container");

const getCurrentData = function (name, forecastData) {
  return {
    name: name,
    temperature: forecastData.current.temp,
    wind: forecastData.current.wind_speed,
    humidity: forecastData.current.humidity,
    uvi: forecastData.current.uvi,
    date: getFormattedDate(forecastData.current.dt),
    iconCode: forecastData.current.weather[0].icon,
  };
};

const getFormattedDate = function (unixTimestamp, format = "MMM Do") {
  return moment.unix(unixTimestamp).format(format);
};

const getForecastData = function (forecastData) {
  const callback = function (each) {
    return {
      date: getFormattedDate(each.dt),
      temperature: each.temp.max,
      wind: each.wind_speed,
      humidity: each.humidity,
      iconCode: each.weather[0].icon,
    };
  };
  return forecastData.daily.slice(1, 6).map(callback);
};

// for given city name, request API lat & long
const getWeatherData = async function (city) {
  // construct API URL for city data
  const currentDataUrl = `${BASE_URL}weather?q=${city}&appid=${API_KEY}`;

  // fetch current data
  const currentDataResponse = await fetch(currentDataUrl);

  // validate city response from API
  // if (currentDataResponse.status ! === 200){

  // } else {

  // }

  const currentData = await currentDataResponse.json();

  // get values for URL
  const lat = currentData.coord.lat;
  const lon = currentData.coord.lon;
  const name = currentData.name;

  // construct forecast URL
  const forecastDataURL = `${BASE_URL}onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`;

  // fetch forecast data
  const forecastDataResponse = await fetch(forecastDataURL);
  const forecastData = await forecastDataResponse.json();

  const current = getCurrentData(name, forecastData);
  const forecast = getForecastData(forecastData);

  return {
    current: current,
    forecast: forecast,
  };
};

const renderError = function () {
  const formError = `<div id="search-error" class="form-text">
  Please enter a valid city name.
</div>`;

  // append to search form
  searchForm.append(formError);
};

const getUVIClass = function (uvi) {
  if (uvi < 3) {
    return "low-UV";
  } else if (uvi >= 8) {
    return "high-UV";
  } else {
    return "mod-UV";
  }
};

const renderCurrentWeather = function (currentData) {
  const uviClassName = getUVIClass(currentData);

  //   render current weather card
  const currentWeather = `<h2>${currentData.name} | ${currentData.date}</h2>
    <div class="current-weather-elements">
        <div>
        <img
            src="https://openweathermap.org/img/w/${currentData.iconCode}.png"
            alt=""
            class="current-weather-img"
        />
        </div>
        <div class="current-weather">                  
        <p>Temp: ${currentData.temperature}°C</p>
        <p>Wind: ${currentData.wind}m/s</p>
        <p>Humidity: ${currentData.humidity}%</p>
        <p>UV Index:<span class="bg" id="${uviClassName}">${currentData.uvi}</span></p>
        </div>
    </div>`;

  // append to current weather container
  currentWeatherContainer.append(currentWeather);
};

// FIX RENDER
const renderForecast = function (forecastData) {
  const constructForecastCard = function (each) {
    return `<div class="card forecast-card" style="width: 10rem">
      <h3 class="card-heading text-center">${each.date}</h3>
      <img
      src="https://openweathermap.org/img/w/${each.iconCode}.png"
      class="card-img-top"
      alt=""
      />
      <div class="card-body">
      <p class="card-text">Temp: ${each.temperature}°C</p>
      <p class="card-text">Humidity: ${each.humidity}%</p>
      <p class="card-text">Wind: ${each.wind}</p>
      </div>
      </div>`;
  };

  const forecastCards = forecastData.map(constructForecastCard).join("");

  const forecastCardsContainer = `<div><h3 id="forecast-heading">5-Day Forecast</h3><div class="forecasts-container">${forecastCards}<div/></div>`;

  weatherCardsContainer.append(forecastCardsContainer);
};

const renderWeatherCards = function (weatherData) {
  renderCurrentWeather(weatherData.current);
  renderForecast(weatherData.forecast);
};

const storeCities = function (city) {
  // get cities from LS
  const cities = JSON.parse(localStorage.getItem("recentCities")) ?? [];

  // if city isn't in LS
  if (!cities.includes(city)) {
    // add city to LS cities array
    cities.push(city);

    // set new city search in LS
    localStorage.setItem("recentCities", JSON.stringify(cities));
  }
};

const renderRecentSearches = function () {
  // get cities from LS
  const cities = JSON.parse(localStorage.getItem("recentCities")) ?? [];

  // target search list container
  const citiesContainer = $(".list-group");

  citiesContainer.empty();

  const constructSearchedCities = function (city) {
    // construct li element
    const searchedCityLi = `<li data-city=${city} class="list-group-item">${city}</li>`;
    // append to parent citiesContainer
    citiesContainer.append(searchedCityLi);
  };

  const recentCityClick = function (event) {
    const target = $(event.target);

    //   if click is on list item
    if (target.is("li")) {
      // get clicked city name
      const cityName = target.data("city");

      // render weather
      renderWeatherInfo(cityName);
    }
  };
  citiesContainer.on("click", recentCityClick);

  cities.forEach(constructSearchedCities);
};

// render weather after click on recent city
const renderWeatherInfo = async function (city) {
  const weatherData = await getWeatherData(city);

  weatherCardsContainer.empty();

  renderWeatherCards(weatherData);
};

const onSearch = async function (event) {
  event.preventDefault();

  // get city (user input)
  const city = $(searchInput).val();

  // validate city
  if (city) {
    //   if error is displayed, remove
    if ($("#search-error").length) {
      $("#search-error").remove();
    }
    renderWeatherInfo(city);

    storeCities(city);

    renderRecentSearches();

    // // await data from API using city name
    // const weatherData = await getWeatherData(city);

    // //    clear any weather displayed
    // currentWeatherContainer.empty();
    // forecastsContainer.empty();

    // // render weather cards with new data
    // renderWeatherCards(weatherData);

    // // get cities from LS
    // const cities = jSON.parse(localStorage.getItem("recentCities")) ?? [];

    // // if city does not exist, then push and setitem
    // if (!cities.includes(cityName)) {
    //   // insert cityName in cities
    //   cities.push(cityName);

    //   // set cities in LS
    //   localStorage.setItem("recentCities", JSON.stringify(cities));
    // }
    // // render recent city searches
    // renderRecentCities();
  } else {
    //   render city search error
    renderError();
  }
};

const onLoad = function () {
  //  render from LS
  renderRecentSearches();

  //   get cities from LS
  const cities = JSON.parse(localStorage.getItem("recentCities")) ?? [];

  // if there are recent cities, get info for most recent
  if (cities.length) {
    const city = cities[cities.length - 1];
    renderWeatherInfo(city);
  }
};

$(searchBtn).click(onSearch);
$(document).ready(onLoad);
