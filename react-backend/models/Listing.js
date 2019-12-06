var mongoose = require("mongoose"),
  autoIncrement = require("mongoose-auto-increment");
var listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  address: String,
  price: Number,
  Max_Occupancy: String,
  Has_Driveway: Boolean,
  Is_Available: Boolean,
  imgSrc: String,
  listedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

listingSchema.plugin(autoIncrement.plugin, "Listing");

module.exports = mongoose.connection.model("Listing", listingSchema);