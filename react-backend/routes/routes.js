var express = require("express");
var app = express();
var router = express.Router();
const User = require("../models/User");
const Listing = require("../models/Listing");
const { check, validationResult } = require('express-validator');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
<<<<<<< HEAD
/* GET Listing */
router.route('/grabAll').get((req, res) => {
  Listing.find((error, data) => {
    if(error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
});
/* GET Individual Listing */
router.route('/grabListing').get((req, res) => {
  Listing.findById(req.params.id, (error, data) => {
    if(error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
});
=======
>>>>>>> fb7746c3377e9e5b98441ad40f1d2939dd1d0d8d
/* POST register */
router.post("/register", [
  check('name').isLength({ min: 3 }),
  check('email').isEmail(),
  check('phone').isMobilePhone().withMessage('Please enter a valid phone number'),
  check('password').isString().isLength({ min: 5, max: 15 }).withMessage('Please enter a password between 5 and 15 characters')
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  })
  //console.log(user);
  user.save(error => {
    if (error || !errors.isEmpty()) {
      console.log("Error saving user");
      res.send(error);
    } else {
      console.log("Saved user to DB");
      res.send("User added successfully!");
    }
  });
});
/* POST createListing */
router.post("/createlisting", [
  check('title').isLength({ min: 3 }),
  check('address').isLength({ min: 3 }),
  check('maxocc').isNumeric(),
  check('rent').isNumeric(),
  check('hasdrive').isBoolean(),
  check('isavail').isBoolean(),
  check('imagesrc').isString().isLength({ min: 5, max: 200 })
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
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
    listedBy: req.body.listedby
  })
  listing.save(error => {
    if (error || !errors.isEmpty()) {
      console.log("Error saving listing");
      res.send(error);
    } else {
      console.log("Saved listing to DB");
      res.send("Listing added successfully!");
    }
  });
});
router.post("/deletelisting", function (req, res) 
{
  var id = req.body.id
  console.log(id)
  Listing.findByIdAndRemove(id, function(err,data)
{
    if(!err){
        console.log("Deleted listing " + id);
        this.forceUpdate();
    }
});
})
module.exports = router;