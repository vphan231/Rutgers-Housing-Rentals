var express = require("express");
var app = express();
var router = express.Router();
const User = require("../models/User");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

const MongoClient = require("mongodb").MongoClient;
let db;

/* POST register */
router.post("/register", (req, res) => {
  console.log("Received post request", req.body);

  let user = new User();
  user.email = req.body.email;
  // TODO salt password
  user.password = req.body.password;
  user.save(error => {
    if (error) {
      console.log("Error saving user");
      res.send(error);
    } else {
      res.send("User added successfully!");
    }
  });
});

module.exports = router;
