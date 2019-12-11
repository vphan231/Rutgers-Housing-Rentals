var mongoose = require("mongoose"),
  autoIncrement = require("mongoose-auto-increment");
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
});
userSchema.plugin(autoIncrement.plugin, "User");

module.exports = mongoose.connection.model("User", userSchema);
