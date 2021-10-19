const searchBtn = $("#searchBtn");
const searchInput = $("#search-city");
const searchForm = $(".search-form");
const API_KEY = "5458002b60131eeab00c4853ceb6235b";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const currentWeatherContainer = $(".current-weather-container");
const forecastsContainer = $(".forecasts-container");
const weatherCardsContainer = $(".weather-containers");

const getCurrentData = function (name, forecastData){
    return {
        name: name,
        temperature: forecastData.current.temp,
        wind: forecastData.current.wind_speed,
        humidity: forecastData.current.humidity,
        uvi: forecastData.current.uvi,
        date: getFormattedDate(forecastData.current.dt),
        iconCode: forecastData.current.weather[0].icon,
    }
}

const getIconCode = function (){
return;
}

const getFormattedDate = function (unixTimestamp){
    return moment.unix(unixTimestamp).format("DD/MM/YYY")
}

const getForecastData = function (forecastData) {
    const callback = function (each){
        return {
            date: "(3/30/2021)",
            temperature: 123.45,
            wind: each.wind_speed,
            humidity: each.humidity,
            iconCode: each.weather[0].icon,
        }
    }
    return forecastData.daily.slice(1, 6).map(callback);
}

// for given city name, request API lat & long
const getWeatherData = async function (cityName) {
    // construct API URL for city data
    const currentDataUrl = `${BASE_URL}weather?q=${city}&appid=${API_KEY}`;

    // fetch current data
    const currentDataResponse = await fetch(url);
    const currentData = await response.json();

    // get values for URL
    const lat = currentData.coord.lat;
    const lon = currentData.coord.lon;
    const name = currentData.name;

    // construct forecast URL
    const forecastURL = `${BASE_URL}onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`

    // fetch forecast data
    const forecastDataResponse = await fretch(forecastDataUrl);
    const forecastData = await forecastDataResponse.json();
    const current = getCurrentData(name, forecastData);
    return {
        current: {
            name: name,
            temperature: forecastData.current.temp,
            wind: forecastData.current.wind_speed,
            humidity: forecastData.current.humidity,
            uvi: forecastData.current.uvi,
            date: "(3/30/2021)",
            iconCode: "04n",
        }
        forecast: [
            {

            }
        ]

    }

};



const renderError = function () {
  const formError = `<div id="search-error" class="form-text">
  Please enter a valid city name.
</div>`;

  // append to search form
  searchForm.append(formError);
};

const renderCurrentWeather = function (currentData) {
  //   get weather icon code for URL
  const iconCode = weatherData.current.weather[0].icon;

  //   format date
  const date = moment.unix(weatherData.current.dt).format("MM/DD/YYYY");

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
        <p>UV Index:<span class="bg" id="low-UV">${currentData.uvi}</span></p>
        </div>
    </div>`;
  // append to current weather container
  currentWeatherContainer.append(currentWeather);
};

const renderForecast = function (forecastData) {
  const constructForecastCard = function (each) {};
  return `<div class="card forecast-card" style="width: 10rem">
    <h3 class="card-heading">${each.date}</h3>
    <img
    src="https://openweathermap.org/img/w/${each.iconCode}.png"
    class="card-img-top"
    alt=""
    />
    <div class="card-body">
    <p class="card-text">Temp: ${each.temperature} &deg;F</p>
    <p class="card-text">Humidity: ${each.humidity}%</p>
    <p class="card-text">Wind: ${each.wind}</p>
    </div>
    </div>`;
  const forecastCards = forecastData.map(constructForecastCard).join("");

  const forecastCardsContainer = `<div class="forecasts-container">${forecastCards}<div/>`;

  weatherCardsContainer.append(forecastCardsContainer);
};

const renderWeatherCards = function (weatherData) {
  renderCurrentWeather(weatherData.current);
  renderForecast(weatherData.forecast);
  //   getIconURL(weatherData);
  //   formatDate(weatherData);
};


const onSearch = function (event) {
  event.preventDefault();

  // get city (user input)
  const city = $(searchInput).val();

  // validate city
  if (city) {
    //   if error is displayed, remove
    if ($("#search-error").length) {
      $("#search-error").remove();
    }

   // get data from API
   const weatherData = await getWeatherData();

   renderWeatherCards(weatherData);

//    save city to LS
 
  } else {
    //   render error
    renderError();
  }
};
 const onLoad = function (){
    //  render from LS
 }

$(searchBtn).click(onSearch);
$(document).ready(onLoad);
