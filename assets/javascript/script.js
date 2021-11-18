var searchButton = document.querySelector("#button");
var dataDisplay = document.querySelector(".data-display");
var city = "City";
var temp = "Temp:";
var wind = "Wind:";
var humidity = "Humidity:";
var uvIndex = "UV Index:";
var lat = 33.44;
var lon = -94.04;

//This function fetches and formats the data from the api
var weatherInfo = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=05dfe3da95decbbbc50936bfd9d8b3b6"

    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            city = "Shreveport LA"
            temp = "Temp: " + data.current.temp;
            wind = "Wind: " + data.current.wind_speed;
            humidity = "Humidity: " + data.current.humidity;
            uvIndex = "UV Index: " + data.current.uvi;    
            console.log(data);
          });
        }
    })     
}

weatherInfo();


//This function dislays the dynamicaly generated HTML to the user.
var displayContent = function() {
    dataDisplay.innerHTML = "<div class=info-container> <p class='city'>" + city + "</p> <p class=info>" + temp + "F<br>" + wind + "MPH<br>" + humidity + "%<br>" + uvIndex + "</p> </div>";
};

//This event listener triggers the displayContent function
searchButton.addEventListener('click', displayContent);