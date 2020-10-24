var apiKey = "e64c1e6a6c396c48ddfe9518a881859f";
var cities = [];//empty array to hold the cities that the user will input.
$(document).ready(function () {
    $("#search").on("click", function () {
        var userInput = $("#cityName").val().trim();
       cities.push(userInput); // the city from the textinput is added to our cities array shown above.
       console.log(cities);
       $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&units=imperial&appid=" + apiKey
        //this url is the current weather api
    }).then(function (response) {
        var date = moment().format("MMM Do YYYY");

        //transfer content to html
        $(".name").html("<h1>" + response.name + "<h2>" + "<br>" + date + "</br>" + "</h2>" + "</h1>");
        $(".temp").html("<b>" + "Temperature: " + response.main.temp + " F ");
        $(".humidity").html("<b>" + "Humidity: " + response.main.humidity + " ");
        var humidity = $("<i>").attr("class", "fas fa-water");
        $(".humidity").append(humidity);
        $(".wind").html("<b>" + "Wind Speed: " + response.wind.speed + " ");
        var wind = $("<i>").attr("class", "fas fa-wind");
        $(".wind").append(wind);

        