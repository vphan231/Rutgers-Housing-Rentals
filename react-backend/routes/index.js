var express = require("express");
var app = express();
var router = express.Router();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

const MongoClient = require("mongodb").MongoClient;
let db;

MongoClient.connect(
  "mongodb+srv://roundabout:password!@roundabout-qktc6.mongodb.net/test?retryWrites=true&w=majority",
  (err, database) => {
    // ... start the server
    if (err) {
      return console.log(err);
    }

    db = database.db("Roundabout");
    console.log("Connected to db successfully");

    router.post("/register", (req, res) => {
      console.log("Received post request", req.body);
      db.collection("user").insertOne(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log("saved to database");
        res.send(req.body);
      });
    });
  }
);

module.exports = router;
