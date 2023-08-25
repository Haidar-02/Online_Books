const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const UserModel = require("./models/users.model");

const mongodbConnection = require("./configs/mongoDB.connect.js");
const { config } = require("dotenv");
config();

const app = express();

app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

const usersRoutes = require("./routes/users.route.js");
app.use("/users", usersRoutes);

const authRoutes = require("./routes/auth.route.js");
app.use("/auth", authRoutes);
mongodbConnection();

app.listen(8080, () => {
  console.log("Server running on http://127.0.0.1:8080/");
});
