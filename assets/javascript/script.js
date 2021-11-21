var searchButton = document.querySelector("#button");
var dataDisplay = document.querySelector(".data-display");
var searchHistoryOne = document.querySelector("#search-one");
var searchHistoryTwo = document.querySelector("#search-two");
var searchHistoryThree = document.querySelector("#search-three");
var searchHistoryFour = document.querySelector("#search-four");
var searchHistoryFive = document.querySelector("#search-five");
var dayOne = document.querySelector("#card-one");
var dayTwo = document.querySelector("#card-two");
var dayThree = document.querySelector("#card-three");
var dayFour = document.querySelector("#card-four");
var dayFive = document.querySelector("#card-five");
var lat = "";
var lon = "";
var savedLocations = [];
var dateString = "";

/*var createFutureDate = function (dayNumber) {
  var targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + dayNumber);

  var dd = targetDate.getDate();
  var mm = targetDate.getMonth() + 1;
  var yyyy = targetDate.getFullYear();

  dateString = mm + "/" + dd + "/" + yyyy;
  console.log(dateString);
};*/

//This function fetches the location API and allows the program to 
// associate a location with longitude and latitude coardinates.
var locationInfo = function() {
  var placeInput = document.querySelector(".city-search-input");
  var place = placeInput.value.trim();
  var apiUrlLocation = "http://api.positionstack.com/v1/forward?access_key=3b9ca6a31d1f5a6da350f14f2d1c4e44&query=" + place + "&outputjson"
  fetch(apiUrlLocation)
  .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          lat = data.data[0].latitude;
          lon = data.data[0].longitude;

          weatherInfo(lat, lon, place);
      });
    }      
  });             
};

//This function fetches and formats the data from the api as well display data to the user
var weatherInfo = function(lat, lon, place) {
    var apiUrlWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=05dfe3da95decbbbc50936bfd9d8b3b6"

    fetch(apiUrlWeather)
    .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            var currentDate = moment().format('dddd MMM DD');
            var city = place + " (" + currentDate + ")";
            var temp = "Temp: " + data.current.temp;
            var wind = "Wind: " + data.current.wind_speed;
            var humidity = "Humidity: " + data.current.humidity;
            var uvIndex = data.current.uvi;
             
            var nextDateOne = moment().add(1,'days').format('dddd MMM DD');
            statsOne = nextDateOne + "<br>Temp: " + data.daily[1].temp.day + " F<br> Wind: " + data.daily[1].wind_speed + " MPH<br> Humidity: " + data.daily[1].humidity + "%";           
            console.log(nextDateOne)
            
            var nextDateTwo = moment().add(2,'days').format('dddd MMM DD');
            statsTwo = nextDateTwo + "<br>Temp: " + data.daily[2].temp.day + " F<br> Wind: " + data.daily[2].wind_speed + " MPH<br> Humidity: " + data.daily[2].humidity + "%";
            console.log(nextDateTwo)

            var nextDateThree = moment().add(3,'days').format('dddd MMM DD');
            statsThree = nextDateThree + "<br>Temp: " + data.daily[3].temp.day + " F<br> Wind: " + data.daily[3].wind_speed + " MPH<br> Humidity: " + data.daily[3].humidity + "%";
            console.log(nextDateThree)

            var nextDateFour = moment().add(4,'days').format('dddd MMM DD');
            statsFour = nextDateFour + "<br>Temp: " + data.daily[4].temp.day + " F<br> Wind: " + data.daily[4].wind_speed + " MPH<br> Humidity: " + data.daily[4].humidity + "%";
            console.log(nextDateFour)

            var nextDateFive = moment().add(5,'days').format('dddd MMM DD');
            statsFive = nextDateFive + "<br>Temp: " + data.daily[5].temp.day + " F<br> Wind: " + data.daily[5].wind_speed + " MPH<br> Humidity: " + data.daily[5].humidity + "%";
            console.log(nextDateFive)
  
            dataDisplay.innerHTML = "<div class=info-container> <p class='city'>" + city + "</p> <p class=info>" + temp + " F<br>" + wind + " MPH<br>" + humidity + "%<br> UV Index: <span id='uvi'>" + uvIndex + "</span></p> </div>";

            var uviColorChange = document.querySelector("#uvi");
            uviColorChange.style.padding = "3px";
            uviColorChange.style.borderRadius = "15%";

            if (data.current.uvi >= 0 && data.current.uvi <= 2) {
              uviColorChange.style.backgroundColor = "green";
            }
            else if (data.current.uvi >= 3 && data.current.uvi <= 5) {
              uviColorChange.style.backgroundColor = "yellow";
            }
            else if (data.current.uvi >= 6 && data.current.uvi <= 7) {
              uviColorChange.style.backgroundColor = "orange";
            }
            else if (data.current.uvi >= 8) {
              uviColorChange.style.backgroundColor = "red";
            }

            dayOne.innerHTML = statsOne;
            dayTwo.innerHTML = statsTwo;
            dayThree.innerHTML = statsThree;
            dayFour.innerHTML = statsFour;
            dayFive.innerHTML = statsFive;

            savedLocations.push(localStorage.getItem('array'))

            savedLocations.push(place);

            /*searchHistoryTwo.textContent = savedLocations[1];
            searchHistoryThree.textContent = savedLocations[2];
            searchHistoryFour.textContent = savedLocations[3];
            searchHistoryFive.textContent = savedLocations[4];*/

            localStorage.setItem('array', savedLocations);
            console.log(data);
          });
        }
    })     
}

//This event listener triggers the displayContent function
searchButton.addEventListener('click', locationInfo);