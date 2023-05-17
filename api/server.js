const path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: path.resolve(__dirname + "/../variables.env"),
  });
}
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const flash = require("express-flash");
const session = require("express-session");

const tasksController = require("./controllers/tasksController");
const usersController = require("./controllers/usersController");

const passport = require("passport");
const initializePassport = require("./passport-config");
const User = require("./models/User");

initializePassport(
  passport,
  async (email) => await User.findOne({ email }),
  async (password) => await User.findOne({ password }),
);
const app = express();
app.use(express.static(path.resolve(__dirname + "/../build")));
app.disable("x-powered-by");
app.use(compression());
app.use(morgan("common"));
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 8000);
const DATABASE = process.env.DATABASE;
console.log(DATABASE);

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () =>
  console.log(
    "Connection with MongoDB was successful",
    "Database connection string:",
    DATABASE
  )
);

mongoose.Promise = global.Promise; // Tells Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

app.get("/api/tasks", tasksController.getTasks);
app.get("/api/task/:id", tasksController.getTask);
app.get("/api/test", tasksController.test);
app.post("/api/tasks/create", tasksController.createTask);

app.post("/api/register", usersController.register);
app.post("/api/login", usersController.login);
// app.post(
//   "/api/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: true,
//   })
// );

app.get("/about", function (req, res) {
  return res.sendFile(path.resolve(__dirname + "/../build/index.html"));
});
app.get("/track/*", function (req, res) {
  return res.sendFile(path.resolve(__dirname + "/../build/index.html"));
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("server started");
});

module.exports = passport;