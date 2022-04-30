//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const date = require(__dirname + "/date.js");
const ListingHours = require("listing-hours");
const periods = [
  {
    close: {
      day: 0,
      time: "0000",
    },
    open: {
      day: 0,
      time: "0000",
    },
  },
  {
    close: {
      day: 1,
      time: "0000",
    },
    open: {
      day: 1,
      time: "0000",
    },
  },
  {
    close: {
      day: 2,
      time: "2100",
    },
    open: {
      day: 2,
      time: "1300",
    },
  },
  {
    close: {
      day: 3,
      time: "2100",
    },
    open: {
      day: 3,
      time: "1300",
    },
  },
  {
    close: {
      day: 4,
      time: "2100",
    },
    open: {
      day: 4,
      time: "1300",
    },
  },
  {
    close: {
      day: 5,
      time: "2300",
    },
    open: {
      day: 5,
      time: "1600",
    },
  },
  {
    close: {
      day: 6,
      time: "2300",
    },
    open: {
      day: 6,
      time: "1600",
    },
  },
];

const timezone = "Asia/Manila";
const lh = new ListingHours(periods, timezone);
const openHours = lh;
const pageTitle = "Los Pollos Hermanos";
const currentYear = date.getYear();
const copyright = 'Eduardo Rama'
const indexContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const posts = [];
// Navigation Menu
const navItems = [{
  slug: "home",
  title: "Home"
},
{
  slug: "people",
  title: "Team"
},
{
  slug: "dishes",
  title: "Menu"
},
{
  slug: "contactus",
  title: "Contact"
}];

// Team Members
teamMembers = [{
    name: "Gustavo Fring",
    position: "Owner",
    bio: "Gus knows everything about the business. He is the owner of Los Pollos Hermanos. He cooks a mean fritatta!",
    img: "Gus-Fring.jpg"
  },

  {
    name: "Jesse Pinkman",
    position: "Assistant Cook",
    bio: "Jesse knows his stuff. The helper of Mr.White himself, he knows how to cook large quantities of Met..., I mean Mexican food. Don't miss his weekly specials!",
    img: "Jesse.png"
  },

  {
    name: "Walter White",
    position: "Head Chef",
    bio: "Mr. White is the epitome of the phrase 'Don't judge a book by it's cover' — You simply cannot find a better chef.",
    img: "Walter-white.jpg"
  },

];
var menuItems = {
   "club-sandwich" : {

    title: "Club Sandwich",

    price: 11,

    blurb: "Bacon ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",

    drink: "Club soda"

  },
  "dill-salmon" : {

    title: "Lemon & Dill Salmon",

    price: 18,

    blurb: "Pork Belly ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",

    drink: "Fancy Wine"

  },

  "super-salad": {

    title: "The Super Salad ®",

    price: 34,

    blurb: "Veggy ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",

    drink: "Jug o' Water"

  },

   "mexican-barbacoa" : {

    title: "Mexican Barbacoa",

    price: 23,

    blurb: "Cupcake ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",

    drink: "Beer with a lime"

  }
};

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res){

  res.render("index", {
    StartingContent: indexContent,
    pageTitle: pageTitle,
    navItems: navItems,
    currentYear: currentYear,
    copyright: copyright,
    openHours:openHours
  });

});

app.get("/home", function(req, res){
  res.render("index", {
    StartingContent: indexContent,
    pageTitle: pageTitle,
    navItems: navItems,
    currentYear: currentYear,
    copyright: copyright,
    openHours:openHours
  });

});

app.get("/people", function(req, res){

  res.render("team", {
    StartingContent: indexContent,
    pageTitle: pageTitle,
    navItems: navItems,
    currentYear: currentYear,
    copyright: copyright,
    openHours:openHours,
    teamMembers: teamMembers
  });

});

app.get("/dishes", function(req, res){

  res.render("menu", {
    StartingContent: indexContent,
    pageTitle: pageTitle,
    navItems: navItems,
    currentYear: currentYear,
    copyright: copyright,
    openHours:openHours,
    menuItems: menuItems
  });

});


app.get("/item/:dish", function(req, res){

    const item = req.params.dish.replace(/[^a-zA-Z0-9_-]/, "");
    const dish = menuItems[item];

      res.render("dish", {
        StartingContent: indexContent,
        pageTitle: pageTitle,
        navItems: navItems,
        currentYear: currentYear,
        copyright: copyright,
        openHours:openHours,
        dish: dish
      });



  });


app.get("/contactus", function(req, res){
  res.render("contact",{
    pageTitle: pageTitle,
    navItems: navItems,
    currentYear: currentYear,
    copyright: copyright,
    openHours:openHours,
  });
});


app.get("/posts/:postName", function(req, res){
posts.forEach(function(post) {
  if(_.lowerCase(req.params.postName) === _.lowerCase(post.title)) {
    res.render("post", {title: post.title , content:post.content });
  }
});

});

app.post("/compose", function(req, res) {
const post = {
title : req.body.postTitle,
content : req.body.postBody,
slug: _.kebabCase(req.body.postTitle)
};
posts.push(post);

res.redirect("/");
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
