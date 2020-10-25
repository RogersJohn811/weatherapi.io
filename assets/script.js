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

        //getting the icon logo 
         var iconLogo = response.weather[0].icon;
         var icon = "http://openweathermap.org/img/wn/" + iconLogo + "@2x.png";
         var addIcon = $(".name"); //where the icon is going to go..next to city name and date
         var iconImg = $("<img>").attr("src", icon);
         addIcon.append(iconImg); //appending so it can show

         //lat & lon needed for UV INDEX
         var lat = JSON.stringify(response.coord.lat);
         var lon = JSON.stringify(response.coord.lon);

         $.ajax({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
            //url for UV index.
        }).then(function (uvResponse) {
            //printing to html:
            $(".uv").html("<b>" + "UV Index: " + uvResponse.value + " ");
            var uv = $("<i>").attr("class", "fas fa-sun");
            $(".uv").append(uv);

            if (uvResponse.value >= 1 && uvResponse.value < 3) {
                $(".uv").css('background-color', 'green');
            }
            if (uvResponse.value >= 3 && uvResponse.value <= 6) {
                $(".uv").css('background-color', 'yellow');
            }
            if (uvResponse.value >= 6 && uvResponse.value <= 8) {
                $(".uv").css('background-color', 'orange');
            }
            if (uvResponse.value >= 8 && uvResponse.value <= 10) {
                $(".uv").css('background-color', 'red');
            }
        })
    })
     //making another ajax call for 5 day weather forecast.
     $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&units=imperial&appid=" + apiKey
        //this url is the 5 day forecast weather api
   }).then(function (forecastResponse) {
        for (var i = 0; i < 8; i++) {
            //substring grabs a string within a string..this case grabbing from 11..because I just want the afternoon.
            if ((forecastResponse.list[i].dt_txt).substring(11) === "12:00:00") {
                $("#5dayCast").html("<h1>5 Day Forecast</h1>" + "<hr>"); //title
                var date1 = [
                    {
                        date: ("<p>" + forecastResponse.list[i].dt_txt + "</p>"),
                        temperature: ("<h3>" + "Temperature: " + forecastResponse.list[i].main.temp + " F " + "</h3>"),
                        humidity: ("<h3>" + "Humidity: " + forecastResponse.list[i].main.humidity + "</h3>" + "<hr>")
                    }
                ];
                var forecastIcon1 = forecastResponse.list[0].weather[0].icon;
                var fcIcon1 = "http://openweathermap.org/img/wn/" + forecastIcon1 + "@2x.png";
                var addforecastIcon1 = $("#5dayCast"); //where the icon is going to go.
                var iconImg1 = $("<img>").attr("src", fcIcon1);
                addforecastIcon1.append(iconImg1, date1[0].date, date1[0].temperature, date1[0].humidity);

                var date2 = [
                    {
                        date: ("<p>" + forecastResponse.list[i + 8].dt_txt + "</p>"),
                        temperature: ("<h3>" + "Temperature: " + forecastResponse.list[i + 8].main.temp + " F " + "</h3>"),
                        humidity: ("<h3>" + "Humidity: " + forecastResponse.list[i + 8].main.humidity + "</h3>" + "<hr>")
                    }
                ];
                