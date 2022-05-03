//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(`mongodb+srv://${process.env.MONGO_ADMIN}:${process.env.MONGO_PASS}@${process.env.MONGO_DB}`, {useNewUrlParser: true});
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Required"]
  },
});

const Item = mongoose.model("Item", itemSchema);

const firstEntry = new Item({
  name: "Take out the trash"
});
const secondEntry = new Item({
  name: "Cook!"
});
const thirdEntry = new Item({
  name: "Exercise!"
});

const defaultItems = [firstEntry, secondEntry, thirdEntry];

const listSchema = {
    name: String,
    items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {

  Item.find(function(err, foundItems){
      if(err){
        console.log(err);
      }  else {
        if (foundItems.length === 0){
          Item.insertMany(defaultItems,function(err){
            if(err){
              console.log(err);
            } else {
              console.log('Items Inserted');
            }
          });
          res.redirect("/");
        } else {
          res.render("list", {listTitle: "Today", newListItems: foundItems});
        }
      }
  });

});

app.get("/:customListName", function(req,res){
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({name: customListName}, function(err, foundList){
    if(!err){
    if (!foundList){
      // Create a new list
      const list = new List({
        name: customListName,
        items: defaultItems
      })
      list.save();
      res.redirect("/" + customListName);
    } else {
      // Show the list
      res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
    }
  }
  });

});

app.post("/", function(req, res){
  const listName = req.body.list;
  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName
  });
  if(listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList){
      if(err){
        console.log(err);
      }  else {
        foundList.items.push(item);
        foundList.save();
        res.redirect("/"+ listName);
      }
    });
  }

});


app.post("/delete", function(req, res){

  const itemToDelete = req.body.checkbox;
  const listName = req.body.listName;
  if(listName === "Today") {
    // Item.deleteOne({_id: itemToDelete}, function(err) {
    //   if(err){
    //     console.log(err);
    //   }  else {
    //     console.log("Item Deleted")
    //     res.redirect("/");
    //   }
    // })
    Item.findByIdAndRemove(itemToDelete, function(err) {
      if(err){
        console.log(err);
      }  else {
        console.log("Item got Deleted")
        res.redirect("/");
      }
    })
  } else {
    List.findOneAndUpdate({name: listName}, {$pull : {items: {_id:itemToDelete}}}, function(err, foundList){
      if(err){
        console.log(err);
      }  else {

        res.redirect("/"+ listName);
      }
    });
  }

});

app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfully.");
});
