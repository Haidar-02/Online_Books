const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  picture: { type: String },
  review: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const followingSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
});

const Like = mongoose.model("Like", likeSchema);
const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema);
const Following = mongoose.model("Following", followingSchema);

module.exports = {
  Like,
  User,
  Book,
  Following,
};
