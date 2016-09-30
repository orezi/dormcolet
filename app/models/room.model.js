// app/models/room.model.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our user model
// module.exports allows us to pass this to other files when it is called
var roomSchema = new Schema({
  hostelRef: {
    type: String,
    ref: 'Hostel'
  },
  number: {
    type: Number,
    required: true
  },
  numOfOccupants: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  price:{
    type: Number,
    required: true
  }
});

var Room = mongoose.model('Room', roomSchema);
module.exports = Room;
