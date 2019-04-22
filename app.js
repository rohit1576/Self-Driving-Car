var express = require("express");
var app = express();
var methodOverride = require("method-override");
var expresssanitizer = require("express-sanitizer");
//var path = require('path');
//var fs = require('fs');
var passport = require("passport");
var localstrategy = require("passport-local");
var passportlocalmongoose = require("passport-local-mongoose");

var fbstrategy = require("passport-facebook").Strategy;
var request = require("request");
var FB = require("fb");
const path = require("path");
const nodemailer = require("nodemailer");
const where = require("node-where");

var { PythonShell } = require("python-shell");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));

app.use(expresssanitizer());
app.use(methodOverride("_method"));

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/AcciCheck", { useMongoClient: true });

//mongoose.connect("mongodb://rohit:password@ds155644.mlab.com:55644/csiwebsite",{useMongoClient: true});
mongoose.Promise = global.Promise;

app.use(
  require("express-session")({
    secret: "Anything",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

//DESERIALIZE USER

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/views/home.html"));
});

//import { PythonShell } from "python-shell";
const options = {
  mode: "text",
  pythonPath: "mypython/bin/python3"
};

app.get("/run", function(req, res) {
  let pyshell = new PythonShell("self.py");
  // sends a message to the Python script via stdin
  pyshell.send("hello");

  pyshell.on("message", function(message) {
    console.log(message);

    pyshell.end(function(err, code, signal) {
      if (err) throw err;
    });
  });
  res.redirect("/");
});

// end the input stream and allow the process to exit

//MailtoHospital();

app.listen(3000, function() {
  console.log("Server has started at 3000!!");
});
