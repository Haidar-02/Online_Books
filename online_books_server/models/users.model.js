const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    index: true,
    lowercase: true,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/,
  },
  password: { type: String, required: true, minlength: 6 },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  picture: { type: String },
  genre: { type: String },
  review: { type: String },

  likes: { type: Number, default: 0 },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema);

module.exports = {
  User,
  Book,
};
