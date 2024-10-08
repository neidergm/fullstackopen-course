const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  published: {
    type: Number,
  },
  // author: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Author'
  // },
  author: {
    type: String,
    required: true,
  },
  genres: [
    { type: String }
  ]
})
const Book = mongoose.model('Book', schema)

module.exports = Book