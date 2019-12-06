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

/* POST register */
router.post("/register", (req, res) => {
  console.log("Received post request", req.body);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  });

  //console.log(user);
  user.save(error => {
    if (error) {
      console.log("Error saving user");
      res.send(error);
    } else {
      console.log("Saved user to DB");
      res.send("User added successfully!");
    }
  });
});

module.exports = router;
