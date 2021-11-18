var searchButton = document.querySelector("#button");
var dataDisplay = document.querySelector(".data-display");
var test = "I work!";

var displayContent = function() {
    dataDisplay.innerHTML = "<p>" + test + "</p>";
};

searchButton.addEventListener('click', displayContent);