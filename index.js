"use strict";

// put your own value below!
//const apiKey = "47cpKe28N0zP9QP2YJtAgmNiiQCdVicOMrk3f295";
const searchURL = "https://api.covidtracking.com";
const covidURL = "https://corona-api.com/countries:/code/US";

console.log(covidURL);

function formatQueryParams(searchTerm) {
  console.log(searchTerm);
  //const stateArr = searchTerm.map();
}

function numberWithCommas(x) {
  if (!x) {
    return "Data not available";
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayResults(responseJson) {
  const positiveNum = numberWithCommas(responseJson.positive);
  const negativeNum = numberWithCommas(responseJson.negative);
  const confirmedDeath = numberWithCommas(responseJson.deathConfirmed);
  $("#results-list").append(
    `<li><p>Positive Test Results:</p>${positiveNum}<p>Total number of poeple with confirmed or probable cases of Covid-19. A confirmed case has a positive test result, a probably case is when a patient has symptoms and has been exposed to a confirmed case.</li>
        <li><p>Negative Test Results:</p>${negativeNum}<p>Results of the PCR (molecular) test the have returned negative. This number should be considered an estimate because of the complexity of reporting it.</li>
        <li><p>Confirmed Deaths:</p>${confirmedDeath}<p>Total fatalities with confirmed Covid-19 diagnosis and the death certificate lists Covid-19 as a cause or underlying cause of death.</li>
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
        `Select an option from dropdown menu${err.message}`
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
