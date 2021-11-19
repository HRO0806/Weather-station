var searchButton = document.querySelector("#button");
var dataDisplay = document.querySelector(".data-display");
var statsOne = "";
var statsTwo = "";
var statsThree = "";
var statsFour = "";
var statsFive = "";
var temp = "Temp: ";
var wind = "Wind: ";
var humidity = "Humidity: ";
var uvIndex = "UV Index: ";

//This function fetches and formats the data from the api
var weatherInfo = function() {
    var lat = 33.44;
    var lon = -94.04;
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=05dfe3da95decbbbc50936bfd9d8b3b6"

    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            var currentDate = moment().format('dddd MMM DD');
            city = "Shreveport " + "(" + currentDate + ")";
            temp = "Temp: " + data.current.temp;
            wind = "Wind: " + data.current.wind_speed;
            humidity = "Humidity: " + data.current.humidity;
            uvIndex = "UV Index: " + data.current.uvi;

            statsOne = "Temp: " + data.daily[1].temp.day + " F<br> Wind: " + data.daily[1].wind_speed + " MPH<br> Humidity: " + data.daily[1].humidity + "%";           
            statsTwo = "Temp: " + data.daily[2].temp.day + " F<br> Wind: " + data.daily[2].wind_speed + " MPH<br> Humidity: " + data.daily[2].humidity + "%";
            statsThree = "Temp: " + data.daily[3].temp.day + " F<br> Wind: " + data.daily[3].wind_speed + " MPH<br> Humidity: " + data.daily[3].humidity + "%";
            statsFour = "Temp: " + data.daily[4].temp.day + " F<br> Wind: " + data.daily[4].wind_speed + " MPH<br> Humidity: " + data.daily[4].humidity + "%";
            statsFive = "Temp: " + data.daily[5].temp.day + " F<br> Wind: " + data.daily[5].wind_speed + " MPH<br> Humidity: " + data.daily[5].humidity + "%";

            console.log(data);
          });
        }
    })     
}

weatherInfo();


//This function dislays the dynamicaly generated HTML to the user.
var displayContent = function() {
    var dayOne = document.querySelector("#card-one");
    var dayTwo = document.querySelector("#card-two");
    var dayThree = document.querySelector("#card-three");
    var dayFour = document.querySelector("#card-four");
    var dayFive = document.querySelector("#card-five");

    dataDisplay.innerHTML = "<div class=info-container> <p class='city'>" + city + "</p> <p class=info>" + temp + "F<br>" + wind + "MPH<br>" + humidity + "%<br>" + uvIndex + "</p> </div>";

    dayOne.innerHTML = statsOne;
    dayTwo.innerHTML = statsTwo;
    dayThree.innerHTML = statsThree;
    dayFour.innerHTML = statsFour;
    dayFive.innerHTML = statsFive;
  };

//This event listener triggers the displayContent function
searchButton.addEventListener('click', displayContent);