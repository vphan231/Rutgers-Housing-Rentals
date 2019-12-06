var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://roundabout:password!@roundabout-qktc6.mongodb.net/Roundabout?retryWrites=true&w=majority', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});
var listingSchema = new mongoose.Schema({
    title: String,
    description: String,
    address: String,
    price: Number,
    Max_Occupancy: String,
    Has_Driveway: Boolean,
    Is_Available: Boolean
  });
  var Listing = mongoose.model('Listing', listingSchema);
  var Wyckoff = new Listing({ title: 'New Listing', Description: 'House',address: '39 Wyckoff Street',price: '6050',
                            Max_Occupancy:'9',Has_Driveway: 'false',Is_Available: "false" });
  console.log(Wyckoff.name); 
  Wyckoff.save(function (err, Wyckoff) {
    if (err) return console.error(err);
  });
  mongoose.disconnect;