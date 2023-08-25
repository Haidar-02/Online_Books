const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users.model");

const login = async (req, res) => {
  try {
    const { email: login, password } = req.body;

    if (!login) {
      return res.status(400).send({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    }

    const user = await User.findOne({ email: login }).select("+password");
    if (!user)
      return res.status(404).send({ error: "email/password incorrect" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(404).send({ error: "email/password incorrect" });

    const {
      password: hashedPassword,
      name,
      email,
      _id,
      ...userInfo
    } = user.toJSON();
    const token = jwt.sign({ name, email, _id }, process.env.JWT_SECRET);

    return res.send({
      token,
      user: {
        name,
        email,
        _id,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    } else if (password.length < 6) {
      return res.status(400).send({ error: "Password too short" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    return res.status(200).send({ message: "User successfully registered." });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ error: "Email already exists" });
    }
    console.log(error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { login, register };
