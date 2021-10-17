const searchBtn = $("#searchBtn");

const onLoad = function () {
  // render search history from LS
};

const onSearch = function (event) {
  event.preventDefault();

  // get city
  // validate city

  // get API data
  fetchAPI();

  //   render current weather card
  //   render forecast cards
  //   add to LS
};

const fetchAPI = function () {
  const handleResponse = function (response) {
    return response.json();
  };

  const checkData = function (data) {
    console.log(data);
  };

  fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers"
  )
    .then(handleResponse)
    .then(checkData);
};
//   render search history from LS
// get data from LS

$(searchBtn).on("click", onSearch);
$(document).ready(onLoad);
