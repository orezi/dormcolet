// app/models/hostel.model.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our user model
// module.exports allows us to pass this to other files when it is called
var hostelSchema = new Schema({
  name : {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
  },
  schoolRef: {
    type: String,
    ref: 'School'
  },
  description: {
    type: String
  }
});

var Hostel = mongoose.model('Hostel', hostelSchema);
module.exports = Hostel;
