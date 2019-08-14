//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

// ROOT ROUTE

app.get("/", function(req, res) {


    res.render("list", {listTitle: date.getDate(), newListItems: items});

});

app.post("/", function(req, res) {

    const item = req.body.task;

    if (req.body.list == "Work") {
        workItems.push(item);
        res.redirect("/work");
    }   else {
        items.push(item);
        res.redirect("/");
    }

});

// WORK ROUTE

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

// app.post("/work", function(req, res) {
//     const item = req.body.task;
//     workItems.push(item);
//     res.redirect("/work");
// })

// ABOUT ROUTE

app.get("/about", function(req, res) {
    res.render("about");
})

// STARTING SERVER

app.listen(3000, function() {
    console.log("Server starts on port 3000.");
});
