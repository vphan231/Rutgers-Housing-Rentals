var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  password: String
});

//var Landlord = mongoose.model('Landlord', userSchema);
// var Colin = new Landlord({ name: 'Colin', email:'email@gmail.com',phone: '6094201234',password:'password' });
// console.log(Colin.name);
// Colin.save(function (err, Colin) {
//   if (err) return console.error(err);
// });

module.exports = mongoose.model("User", userSchema);
