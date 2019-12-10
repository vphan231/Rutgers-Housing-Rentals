var express = require("express");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var app = express();
var router = express.Router();
const User = require("../models/User");
const Listing = require("../models/Listing");
const { check, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
/* POST login */
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User Does not exist" });
    console.log("user exists");
    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
      jwt.sign({ id: user.id }, "secret", (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      });
    });
  });
});
/* POST register */
router.post(
  "/register",
  [
    check("name").isLength({ min: 3 }),
    check("email").isEmail(),
    check("phone")
      .isMobilePhone()
      .withMessage("Please enter a valid phone number"),
    check("password")
      .isString()
      .isLength({ min: 5, max: 15 })
      .withMessage("Please enter a password between 5 and 15 characters")
  ],
  (req, res) => {
    const { email, name, password, phone } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // Check for existing user
    User.findOne({ email }).then(user => {
      if (user) return res.status(400).json({ msg: "User already exists" });
      const newUser = new User({
        name,
        email,
        password
      });
      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => {
            jwt.sign({ id: user.id }, "secret", (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            });
          });
        });
      });
    });
  }
);
/* GET Listing */
router.route("/grabAll").get((req, res, next) => {
  if (req.query.id != null) {
    console.log('id', req.query);
    Listing.find({ listedBy: req.query.id }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  } else {
    Listing.find((error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  }
});
/* GET Individual Listing */
router.get("/:id", (req, res, next) => {
  Listing.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
/* POST createListing */
router.post(
  "/createlisting",
  [
    check("title").isLength({ min: 3 }),
    check("address").isLength({ min: 3 }),
    check("maxocc").isNumeric(),
    check("rent").isNumeric(),
    check("hasdrive").isBoolean(),
    check("isavail").isBoolean(),
    check("imagesrc")
      .isString()
      .isLength({ min: 5, max: 200 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const listing = new Listing({
      title: req.body.title,
      description: req.body.description,
      address: req.body.address,
      price: req.body.rent,
      Max_Occupancy: req.body.maxocc,
      Has_Driveway: req.body.hasdrive,
      Is_Available: req.body.isavail,
      imgSrc: req.body.imagesrc,
      listedBy: req.body.listedByID
    });
    listing.save(error => {
      if (error || !errors.isEmpty()) {
        console.log("Error saving listing");
        res.send(error);
      } else {
        console.log("Saved listing to DB");
        res.send("Listing added successfully!");
      }
    });
  }
);
//Delete a listing from the DB by _id
router.post("/deletelisting", function(req, res) {
  var id = req.body.id;
  console.log(id);
  Listing.findByIdAndRemove(id, function(err, data) {
    if (!err) {
      console.log("Deleted listing " + id);
    }
  });
});
//Update a listing by _id, leaving id the same and updating all other fields
//Validate fields using express-validator
router.post(
  "/updatelisting",
  [
    check("title")
      .isLength({ min: 3 })
      .withMessage("Title must be longer than 3 letters"),
    check("address")
      .isLength({ min: 3 })
      .withMessage("Address must be longer than 3 letters"),
    check("maxocc")
      .isNumeric()
      .withMessage("Max occupancy must be a number"),
    check("rent")
      .isNumeric()
      .withMessage("Rent must be a number"),
    check("hasdrive").isBoolean(),
    check("isavail").isBoolean(),
    check("imagesrc")
      .isString()
      .isLength({ min: 5, max: 200 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const updatedListing = new Listing({
      _id: req.body._id,
      title: req.body.title,
      description: req.body.description,
      address: req.body.address,
      price: req.body.rent,
      Max_Occupancy: req.body.maxocc,
      Has_Driveway: req.body.hasdrive,
      Is_Available: req.body.isavail,
      imgSrc: req.body.imagesrc
    });
    Listing.findByIdAndUpdate(
      req.body._id,
      updatedListing,
      { new: true },
      function(err, model) {
        if (!err) {
          console.log("Updated listing " + req.body._id);
        } else console.log(err);
      }
    );
  }
);
module.exports = router;