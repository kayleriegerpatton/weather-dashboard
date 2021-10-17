const searchBtn = $("#searchBtn");
const searchInput = $("#search-city");
const searchForm = $(".search-form");

const onLoad = function () {
  // render search history from LS
};

const renderError = function () {
  const formError = `<div id="searchError" class="form-text">
  Please enter a valid city name.
</div>`;

  // append to search form
  searchForm.append(formError);
};

const onSearch = function (event) {
  event.preventDefault();

  // get city (user input)
  let city = $(searchInput).val();

  // validate city
  if (city) {
    //   get API data
    //   fetchAPI(
    //     "https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers"
    //   );
  } else {
    //   render error
    renderError();
  }

  //   render current weather card
  //   render forecast cards
  //   add to LS
};

const fetchAPI = (url) => {
  const handleResponse = function (response) {
    return response.json();
  };

  const checkData = function (data) {
    console.log(data);
  };

  fetch(url).then(handleResponse).then(checkData);
};
//   render search history from LS
// get data from LS

$(searchBtn).click(onSearch);
$(document).ready(onLoad);
