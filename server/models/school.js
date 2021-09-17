const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  admission: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },

});

module.exports = School = mongoose.model("schools", schoolSchema);
