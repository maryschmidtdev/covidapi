"use strict";

const searchURL = "https://api.covidtracking.com";

//adds commas to the data
function numberWithCommas(x) {
  if (!x) {
    return "Data not available";
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//HTML template for results from Covid Tracking Project API
function displayResults(responseJson) {
  const positiveNum = numberWithCommas(responseJson.positive);
  const negativeNum = numberWithCommas(responseJson.negative);
  const confirmedDeath = numberWithCommas(responseJson.deathConfirmed);
  $("#results-list").append(
    `<li><h2>Positive Test Results:</h2> ${positiveNum}<p>Total number of poeple with confirmed or probable cases of Covid-19. A confirmed case has a positive test result, a probably case is when a patient has symptoms and has been exposed to a confirmed case.</li><br>
        <li><h2>Negative Test Results:</h2> ${negativeNum}<p>Results of the PCR (molecular) test the have returned negative. This number should be considered an estimate because of the complexity of reporting it.</li><br>
        <li><h2>Confirmed Deaths:</h2> ${confirmedDeath}<p>Total fatalities with confirmed Covid-19 diagnosis and the death certificate lists Covid-19 as a cause or underlying cause of death.</li><br>
        `
  );

  $("#results").removeClass("hidden");
}

//Stringing the URL together searchTerm is the selected state
function getData(searchTerm) {
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

const covidActNowApi = "https://data.covidactnow.org";

//HTML template to display results from Covid Act Now API
//Data are in properties objects of an array
function stateProjections(responseJson) {
  const rt = responseJson.projections.rt || "Data not available";
  const testPositivity = responseJson.metrics.testPositivity;
  $("#results-list").append(
    `<li><h2>Rt:</h2> ${rt}<p>Rate of infection, for example, how many people the virus could spread to from one infected person.</p></li><br>
          <li><h2>Test Positivity Ratio:</h2> ${testPositivity}<p>Ratio of people who test positive calculated using a 7-day rolling average.</p></li><br>`
  );
}

//Stringing the URL together with the state searchTerm from above
function projectedData(searchTerm) {
  const covidactnow =
    covidActNowApi +
    "/latest/us/states/" +
    searchTerm +
    ".OBSERVED_INTERVENTION.json";

  fetch(covidactnow)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => stateProjections(responseJson))

    .catch((err) => {
      $("#js-error-message").text(`Data not available${err.message}`);
    });
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    $("#results-list").empty();
    const searchTerm = $("#js-search-term").val();
    getData(searchTerm);
    projectedData(searchTerm);
  });
}

//Creating the US data that loads when the page opens at the top
//HTML template for the US results from the Covid Tracking Project API
function usResults(responseJson) {
  const usPositive = numberWithCommas(responseJson[0].positive);
  const usDeath = numberWithCommas(responseJson[0].death);
  $("#us-results").append(
    `<li><h2>US Confirmed Covid-19 Cases: ${usPositive}</h2></li>
      <li><h2>US Confirmed Covid-19 Deaths: ${usDeath}</h2></li>`
  );
}

//Hard coded the fetch because the data we want are properties of an object
function usData() {
  const usURL = "https://api.covidtracking.com/v1/us/current.json";
  fetch(usURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => usResults(responseJson))
    .catch((err) => {
      $("#js-error-message").text(`Data not available${err.message}`);
    });
}
usData();

$(watchForm);
