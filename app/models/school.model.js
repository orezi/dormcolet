// app/models/user.model.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our user model
// module.exports allows us to pass this to other files when it is called
var schoolSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String
  }
});

var School = mongoose.model('School', schoolSchema);
module.exports = School;
