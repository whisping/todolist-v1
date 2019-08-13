//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

// ROOT ROUTE

app.get("/", function(req, res) {

    res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res) {

    let item = req.body.task;

    console.log(req.body.list);

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

app.post("/work", function(req, res) {
    let item = req.body.task;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about", function(req, res) {
    res.render("about");
})

// STARTING SERVER

app.listen(3000, function() {
    console.log("Server starts on port 3000.");
});
