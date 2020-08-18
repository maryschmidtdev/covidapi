"use strict";

// put your own value below!
//const apiKey = "47cpKe28N0zP9QP2YJtAgmNiiQCdVicOMrk3f295";
const searchURL = "https://api.covidtracking.com";

function formatQueryParams(query) {
  console.log(query);
}

// function displayResults(responseJson) {
//   // if there are previous results, remove them

//   // iterate through the items array
//   for (let i = 0; i < responseJson.data.length; i++) {
//     $("#results-list").append(
//       `<li><h3>${responseJson.data[i].fullName}</h3></li>
//       <li>${responseJson.data[i].description}</li>
//       <li><a href = ${responseJson.data[i].url}>${responseJson.data[i].url}</a></li>
//       `
//     );
//   }

//   $("#results").removeClass("hidden");
// }

function getData(query) {
  const queryString = formatQueryParams(query);
  const url = searchURL;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    $("#results-list").empty();
    const searchTerm = $("#js-search-term").val();
    getData(searchTerm);
  });
}
$(watchForm);
