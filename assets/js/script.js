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

$(document).on("click", fetchAPI);
