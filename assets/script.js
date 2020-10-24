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
        }).then
    })
}