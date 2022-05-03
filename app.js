require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser")
const app = express();
const https = require('https');

// app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res){

const query = req.body.cityName;
const units = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + process.env.OPEN_WEATHER_KEY +"&units=" + units
https.get(url, function(response) {
  console.log(response.statusCode);
  response.on("data", function(data) {
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    // const object ={
    //   name: "Eduardo",
    //   FavouriteFood: "Beef Steak"
    // }
    // console.log(JSON.stringify(object));
    // console.log(temp);
    res.write("<p> The weather is currently " + description + "</p>");
    res.write("<h1>the temperature in " + query + " is " + temp + " degrees Celcius</h1>");
    res.write('<img src ="http://openweathermap.org/img/wn/'+ icon +'@2x.png" width="50" height="50">');
    res.send();
  });
});
// res.sendFile(__dirname + "/index.html");
// console.log(__dirname + "/index.html");
// res.send("server is up and running");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
