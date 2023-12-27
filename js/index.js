/* Information about keys->
  Public key - ec3ed12af10e2e4d8375e3ff29c931cb

  Hash (md5) - 14caeed5d172dcf9684284e3bc9cc53b
 */

const apiUrl = "https://gateway.marvel.com/v1/public/characters";
const apiKey = "ec3ed12af10e2e4d8375e3ff29c931cb";
const timestamp = 1;
const hash = "14caeed5d172dcf9684284e3bc9cc53b";

const url = `${apiUrl}?ts=${timestamp}&apikey=${apiKey}&hash=${hash}`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data.data.results);
    getAllCharactersList(data.data.results);
  })
  .catch(error => {
    console.error("Fetch error:", error);
  });



document.getElementById("search-form").addEventListener("keyup", function () {
  var url = getUrl();

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      display(data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
});

function getAllCharactersList(results) {
  const canvas = document.getElementById("canvas");
  const superHeroList = document.getElementById("superhero-list");
  superHeroList.innerHTML = "";

  // Defining event listener function for the "about" action
  function handleAboutClick(result) {
    localStorage.setItem("id", result.id);
    window.location.assign("./about.html");
  }

  // Defining event listener function for the "fav" action
  function handleFavClick(result) {
    const index = localStorage.length;
    const data = JSON.stringify(result);
    localStorage.setItem(result.id, data);
  }

  for (const result of results) {
    const templateCanvas = canvas.content.cloneNode(true);

    templateCanvas.getElementById("my-img").src = `${result.thumbnail.path}.${result.thumbnail.extension}`;
    templateCanvas.getElementById("name").innerHTML = result.name;

    // Attaching the "about" click event outside the loop
    templateCanvas.getElementById("about").addEventListener("click", function () {
      handleAboutClick(result);
    });

    // Attaching the "fav" click event outside the loop
    templateCanvas.getElementById("fav").addEventListener("click", function () {
      handleFavClick(result);
    });

    superHeroList.appendChild(templateCanvas);
  }
}


// Getting the URL from  API
function getUrl() {
  // From Id I'll get value.
  var searchQuery = document.getElementById("search-string").value;

  //  If search query matches the results then it will redirect to searched hero otherwise moved to home page.
  if (!searchQuery) {
    return "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=ec3ed12af10e2e4d8375e3ff29c931cb&hash=14caeed5d172dcf9684284e3bc9cc53b";
  } else {
    return `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchQuery}&ts=1&apikey=ec3ed12af10e2e4d8375e3ff29c931cb&hash=14caeed5d172dcf9684284e3bc9cc53b`;
  }
}

//  Get Canvas
let canvas = document.getElementById("canvas");
let searchHero = document.getElementById("search-string").value;

// This Function will display the Data on the Screen
function display(data) {
  var superHeroList = document.getElementById("superhero-list");
  var results = data.data.results;

  //if array list is empty, the message will show
  if (results.length === 0) {
    superHeroList.innerHTML = "<b>No Super Hero To Display</b>";
  }

  //otherwise displaying the superheros from list.
  else {
    superHeroList.innerHTML = "";

    //for loop will help to print all superheros from list.
    for (let result of results) {
      var templateCanvas = canvas.content.cloneNode(true);

      //  Getting all the elemets from id and then changing its Inner HTML
      templateCanvas.getElementById(
        "my-img"
      ).src = `${result.thumbnail.path}.${result.thumbnail.extension}`;
      templateCanvas.getElementById("name").innerHTML = result.name;

      //  EventListener for  about button
      templateCanvas
        .getElementById("about")
        .addEventListener("click", function () {
          localStorage.setItem("id", result.id);
          window.location.assign("./about.html");
        });

      //  EventListener for add to favourites button
      templateCanvas
        .getElementById("fav")
        .addEventListener("click", function () {
          var index = localStorage.length;
          var data = JSON.stringify(result);
          localStorage.setItem(result.id, data);
        });
      superHeroList.appendChild(templateCanvas);
    }
  }
}
//  This function will execute after user added the super hero to favorite.
function addFunction() {
 
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 2500);
}
