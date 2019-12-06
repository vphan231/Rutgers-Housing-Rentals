var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://roundabout:password!@roundabout-qktc6.mongodb.net/Roundabout?retryWrites=true&w=majority', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String
  });
  var Landlord = mongoose.model('Landlord', userSchema);
  /*var Colin = new Landlord({ name: 'Colin', email:'email@gmail.com',phone: '6094201234',password:'password' });
  console.log(Colin.name); 
  Colin.save(function (err, Colin) {
    if (err) return console.error(err);
  });
  */
  mongoose.disconnect;