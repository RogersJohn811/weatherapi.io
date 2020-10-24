var addedCitiesList = [];

$(document).ready(function () {
    var addedCities = JSON.parse(localStorage.getItem("addedCities"));
    // Gets cities from the local storage and makes them buttons
    addCityButtons();

    //on click of button will add weather
    $(".cityButton").on("click", function() {
        var coordArray = [];

        var citySearchValue = $(this).text();

        var queryURL = 

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
            console.log(response);
            console.log(response.main.temp);
            var tempF = ((response.main.temp - 273.15) * (9 / 5) + 32);

            $("#cityToday").text(citySearchValue);
            $("#temp").text("Temperature: " + Math.floor(tempF) + " F");
            $("#humidiy").text("Humidity: " + response.main.humidity + "%");
            $("#wind-speed").text("Wind Speed: " + response.wind.speed + " mph");
        });
    });
});