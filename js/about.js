//Get the items, stored in local storage and
var resultId = localStorage.getItem("id");

fetchData();

// Get all the data from Fetch
function fetchData() {
  var Request = new XMLHttpRequest();
  // Fetch the records by particular ID.
  var url = `https://gateway.marvel.com/v1/public/characters/${resultId}?ts=1&apikey=ec3ed12af10e2e4d8375e3ff29c931cb&hash=14caeed5d172dcf9684284e3bc9cc53b`;
  Request.open("get", url, true);
  Request.send();
  Request.onload = function () {
    var response = JSON.parse(Request.response);

    // getting Id's of element and change its text.
    document.getElementById(
      "my-img"
    ).src = `${response.data.results[0].thumbnail.path}.${response.data.results[0].thumbnail.extension}`;
    document.getElementById("name").innerHTML =
      "<b>Name: </b> " + response.data.results[0].name;
    document.getElementById("id").innerHTML =
      "<b>Hero ID: </b> " + response.data.results[0].id;
    document.getElementById("desc").innerHTML =
      "<b>Description: </b> " + response.data.results[0].description;
      document.getElementById("comic").innerHTML =
      "<b>Comic Available: </b>" + response.data.results[0].comics.available;

    };
  }





























   
    