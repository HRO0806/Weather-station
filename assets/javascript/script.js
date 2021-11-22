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
var placeInput = document.querySelector(".city-search-input");

savedLocations.push(localStorage.getItem('array'));
savedLocations.pop();

searchHistoryOne.textContent = savedLocations[1];
searchHistoryTwo.textContent = savedLocations[2];
searchHistoryThree.textContent = savedLocations[3];
searchHistoryFour.textContent = savedLocations[4];
searchHistoryFive.textContent = savedLocations[5];

//This function fetches the location API and allows the program to 
//associate a location with longitude and latitude coardinates.
var locationInfo = function() {
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

            var currentIconUrl = "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + "@2x.png";
            var dayOneIconUrl = "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png";
            var dayTwoIconUrl = "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png";
            var dayThreeIconUrl = "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png";
            var dayFourIconUrl = "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png";
            var dayFiveIconUrl = "http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + "@2x.png";

            var currentDate = moment().format('dddd MMM DD');
            var city = place + " (" + currentDate + ")";
            var temp = "Temp: " + data.current.temp;
            var wind = "Wind: " + data.current.wind_speed;
            var humidity = "Humidity: " + data.current.humidity;
            var uvIndex = data.current.uvi;
             
            var nextDateOne = moment().add(1,'days').format('dddd MMM DD');
            statsOne = nextDateOne + "<div><img class='card-icon icon' src='" + dayOneIconUrl + "'/></div><br>Temp: " + data.daily[1].temp.day + " F<br> Wind: " + data.daily[1].wind_speed + " MPH<br> Humidity: " + data.daily[1].humidity + "%";           
            
            var nextDateTwo = moment().add(2,'days').format('dddd MMM DD');
            statsTwo = nextDateTwo + "<div><img class='card-icon icon' src='" + dayTwoIconUrl + "'/></div><br>Temp: " + data.daily[2].temp.day + " F<br> Wind: " + data.daily[2].wind_speed + " MPH<br> Humidity: " + data.daily[2].humidity + "%";

            var nextDateThree = moment().add(3,'days').format('dddd MMM DD');
            statsThree = nextDateThree + "<div><img class='card-icon icon' src='" + dayThreeIconUrl + "'/></div><br>Temp: " + data.daily[3].temp.day + " F<br> Wind: " + data.daily[3].wind_speed + " MPH<br> Humidity: " + data.daily[3].humidity + "%";

            var nextDateFour = moment().add(4,'days').format('dddd MMM DD');
            statsFour = nextDateFour + "<div><img class='card-icon icon' src='" + dayFourIconUrl + "'/></div><br>Temp: " + data.daily[4].temp.day + " F<br> Wind: " + data.daily[4].wind_speed + " MPH<br> Humidity: " + data.daily[4].humidity + "%";

            var nextDateFive = moment().add(5,'days').format('dddd MMM DD');
            statsFive = nextDateFive + "<div><img class='card-icon icon' src='" + dayFiveIconUrl + "'/></div><br>Temp: " + data.daily[5].temp.day + " F<br> Wind: " + data.daily[5].wind_speed + " MPH<br> Humidity: " + data.daily[5].humidity + "%";

            dataDisplay.innerHTML = "<div class=info-container> <p>  </p> <p class='city'>" + city + "<img id='current-icon' class='icon' src='" + currentIconUrl + "'/></p><br><p class=info>" + temp + " F<br>" + wind + " MPH<br>" + humidity + "%<br> UV Index: <span id='uvi'>" + uvIndex + "</span></p> </div>";

            console.log(place);

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

            savedLocations.push(localStorage.getItem('array'));
            savedLocations.unshift(place);
            savedLocations.pop();

            searchHistoryOne.textContent = savedLocations[1];
            searchHistoryTwo.textContent = savedLocations[2];
            searchHistoryThree.textContent = savedLocations[3];
            searchHistoryFour.textContent = savedLocations[4];
            searchHistoryFive.textContent = savedLocations[5];

            localStorage.setItem('array', savedLocations);
            console.log(data);
          });
        }
    })     
}

//This event listener triggers the displayContent function
searchButton.addEventListener('click', locationInfo);

searchHistoryOne.addEventListener('click', function() {
  placeInput.value = searchHistoryOne.textContent;
  locationInfo();
})

searchHistoryTwo.addEventListener('click', function() {
  placeInput.value = searchHistoryTwo.textContent;
  locationInfo();
})

searchHistoryThree.addEventListener('click', function() {
  placeInput.value = searchHistoryThree.textContent;
  locationInfo();
})

searchHistoryFour.addEventListener('click', function() {
  placeInput.value = searchHistoryFour.textContent;
  locationInfo();
})

searchHistoryFive.addEventListener('click', function() {
  placeInput.value = searchHistoryFive.textContent;
  locationInfo();
})