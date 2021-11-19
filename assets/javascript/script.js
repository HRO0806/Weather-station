var searchButton = document.querySelector("#button");
var dataDisplay = document.querySelector(".data-display");
var dayOne = document.querySelector("#card-one");
var dayTwo = document.querySelector("#card-two");
var dayThree = document.querySelector("#card-three");
var dayFour = document.querySelector("#card-four");
var dayFive = document.querySelector("#card-five");
var lat = "";
var lon = "";


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
            var uvIndex = "UV Index: " + data.current.uvi;

            statsOne = "Temp: " + data.daily[1].temp.day + " F<br> Wind: " + data.daily[1].wind_speed + " MPH<br> Humidity: " + data.daily[1].humidity + "%";           
            statsTwo = "Temp: " + data.daily[2].temp.day + " F<br> Wind: " + data.daily[2].wind_speed + " MPH<br> Humidity: " + data.daily[2].humidity + "%";
            statsThree = "Temp: " + data.daily[3].temp.day + " F<br> Wind: " + data.daily[3].wind_speed + " MPH<br> Humidity: " + data.daily[3].humidity + "%";
            statsFour = "Temp: " + data.daily[4].temp.day + " F<br> Wind: " + data.daily[4].wind_speed + " MPH<br> Humidity: " + data.daily[4].humidity + "%";
            statsFive = "Temp: " + data.daily[5].temp.day + " F<br> Wind: " + data.daily[5].wind_speed + " MPH<br> Humidity: " + data.daily[5].humidity + "%";



            dataDisplay.innerHTML = "<div class=info-container> <p class='city'>" + city + "</p> <p class=info>" + temp + " F<br>" + wind + " MPH<br>" + humidity + "%<br>" + uvIndex + "</p> </div>";

            dayOne.innerHTML = statsOne;
            dayTwo.innerHTML = statsTwo;
            dayThree.innerHTML = statsThree;
            dayFour.innerHTML = statsFour;
            dayFive.innerHTML = statsFive;

            console.log(data);
          });
        }
    })     
}

//This event listener triggers the displayContent function
searchButton.addEventListener('click', locationInfo);