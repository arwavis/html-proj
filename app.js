const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
const { Console } = require("console");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {
    //console.log(req.body.cityName)

    const query = "req.body.cityName";
    const apiKey = "ea4d15683af3520a7a265dcbd526de78";
    const unit = "metric";

    // const url = "https://api.openweathermap.org/data/2.5/weather?q= " + query + "&appid=" + apiKey + "&units=" + unit;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`
        //const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=ea4d15683af3520a7a265dcbd526de78&units=metric";

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const temperature = weatherData.main.temp;


            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);
            const icon = weatherData.weather[0].icon;

            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"


            res.write("<h1>The temperature in" + query + "is " + temperature + " degree celcius</h1>");
            res.write("<h2>The Wather is currently " + weatherDescription + "</h2>");
            res.write("<img src = " + imageURL + ">");
            res.send();

        });
    });
})







app.listen(3000, function() {
    console.log("Server started in port 3000");
});