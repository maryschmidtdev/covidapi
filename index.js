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
    `<li><p>Positive Test Results:</p>${responseJson.positive}<p>Total number of poeple with confirmed or probable cases of Covid-19. A confirmed case has a positive test result, a probably case is when a patinent has symptoms and has been exposed to a confirmed case.</li>
        <li><p>Negative Test Results:</p>${responseJson.negative}<p>Results of the PCR test tha have returned negative. This number should be considered an estimate because of the complexity of reporting it.</li>
        <li><p>Confirmed Deaths:</p>${responseJson.deathConfirmed}<p>Total fatalities with confirmed Covid-19 diagnosis and the death certificate lists Covid-19 as a cause or underlying cause of death.</li>
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
