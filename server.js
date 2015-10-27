var http = require("http");
var express = require("express");
var app = express();
//var ejsEngine = require("ejs-locals");
var controllers = require("./controllers");
var flash = require("connect-flash");

// Setup de View Engine
//app.set("view engine", "jade");
//app.engine("ejs", ejsEngine); //Support master pages
//app.set("view engine", "ejs"); //EJS view engine

app.set("view engine", "vash");

// Opt into Services
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var cookieParser = require("cookie-parser");
app.use(cookieParser('secretString'));

var session = require("express-session");
app.use(session({
  secret: 'TheBoard',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

//user authentication

var auth= require("./auth");
auth.init(app);

//Map he routes
controllers.init(app);

app.use(express.static(__dirname + "/public"));

app.get("/api/users", function(req, res){
	res.set("Content-Type", "application/json");
	res.send({name: "Shawn", isValid: true, group: "admin" });
});

var server = http.createServer(app);

server.listen(3000);

var updater = require("./updater");
updater.init(server);