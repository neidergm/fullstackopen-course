const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  favoriteGenre: {
    type: String,
    required: true
  }
})

const User = mongoose.model('BookUsers', schema)

module.exports = User;