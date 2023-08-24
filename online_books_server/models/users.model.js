const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const model = mongoose.model("User", UserSchema);
module.exports = model;
