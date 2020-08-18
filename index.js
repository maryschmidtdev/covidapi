"use strict";

// put your own value below!
//const apiKey = "47cpKe28N0zP9QP2YJtAgmNiiQCdVicOMrk3f295";
const searchURL = "https://api.covidtracking.com";

function formatQueryParams(searchTerm) {
  console.log(searchTerm);
  //   const stateArr = searchTerm.map();
}

function displayResults(responseJson) {
  $("#results-list").append(
    `<li><p>Positive Test Results:</p>${responseJson.positive}</li>
        <li><p>Negative Test Results:</p>${responseJson.negative}</li>
        <li><p>Confirmed Deaths:</p>${responseJson.deathConfirmed}</li>
        `
  );
}

// iterate through the items array

$("#results").removeClass("hidden");

function getData(searchTerm) {
  const queryString = formatQueryParams(searchTerm);
  const url = searchURL + "/v1/states/" + searchTerm + "/current.json";

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) => {
      $("#js-error-message").text(
        `Enter state code, example: MN or mn ${err.message}`
      );
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
