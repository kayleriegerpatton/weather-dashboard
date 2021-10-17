const searchBtn = $("#searchBtn");
const searchInput = $("#search-city");
const searchForm = $(".search-form");
const apiKey = "5458002b60131eeab00c4853ceb6235b";

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

const onSearch = function (event) {
  event.preventDefault();

  // get city (user input)
  let city = $(searchInput).val();

  //   get API URL for city data
  let cityAPI = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  // validate city
  if (city) {
    //   if error is visible, remove
    if ($("#search-error").length) {
      $("#search-error").remove();
    }
    //   get API data
    fetchAPI(cityAPI);
  } else {
    //   render error
    renderError();
  }
  //   render current weather card
  //   render forecast cards
  //   add to LS
};

const fetchAPI = () => {
  const handleResponse = function (response) {
    return response.json();
  };

  const checkData = function (data) {
    console.log(data);
  };

  fetch().then(handleResponse).then(checkData);
};
//   render search history from LS
// get data from LS

$(searchBtn).click(onSearch);
$(document).ready(onLoad);
