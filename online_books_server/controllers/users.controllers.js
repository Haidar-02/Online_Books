const User = require("../models/users.model");

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
};

module.exports = { getAllUsers, getProfile };
