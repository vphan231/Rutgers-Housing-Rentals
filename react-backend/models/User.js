var mongoose = require("mongoose"),
  autoIncrement = require("mongoose-auto-increment");
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  password: String,
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }]
});
userSchema.plugin(autoIncrement.plugin, "User");

module.exports = mongoose.connection.model("User", userSchema);
