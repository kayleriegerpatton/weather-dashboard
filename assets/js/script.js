const searchBtn = $("#searchBtn");
const searchInput = $("#search-city");
const searchForm = $(".search-form");
const API_KEY = "5458002b60131eeab00c4853ceb6235b";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

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

const handleResponse = function (response) {
  //   console.log(response);
  return response.json();
};

const handleData = function (data) {
  if (data.message === "city not found") {
    renderError();
  } else {
    //   get city name
    const cityName = data.name;
    //   construct URL for weather
    const url = `${BASE_URL}onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}`;
    fetch(url).then(handleResponse).then(console.log(data));
  }
};
//   render weather cards
// get card data
//   render current weather card
//   render forecast cards
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
