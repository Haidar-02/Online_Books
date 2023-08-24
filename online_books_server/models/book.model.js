const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverImage: { type: String },
  review: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
