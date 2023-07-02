const path = require("path");

const { NODE_ENV } = process.env;
if (NODE_ENV !== "production") {
  require("dotenv").config({
    path: path.resolve(__dirname + "/../variables.env"),
  });
}
require("./db-connect.js");

const express = require("express");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const flash = require("express-flash");

const tasksController = require("./controllers/tasksController");
const usersController = require("./controllers/usersController");

const app = express();
app.disable("x-powered-by");
app.use(compression());
app.use(morgan("common"));
app.use(morgan("dev"));
app.use(cors());
app.use(flash());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
app.use(express.json());

const normalizePort = (port) => parseInt(port, 10);
const PORT2 = normalizePort(process.env.PORT || 8000);

console.log(`PORT PORT PORT PORT PORT PORT PORT 


-------- -------------- ------ ${PORT2} -------- ---------- --------


PORT PORT PORT PORT PORT PORT PORT`);

app.get("/api/alltasks", tasksController.getTasks);
app.get("/api/tasks", tasksController.getUserTasks);
app.get("/api/task", tasksController.getTask);
app.get("/api/test", tasksController.test);
app.patch("/api/tasks/edit", tasksController.editTask);
app.patch("/api/tasks/add-remove-child", tasksController.addRemoveChild);
app.get("/api/tasks/titles", tasksController.getTitles);
app.get("/api/tasks/breadcrumbs", tasksController.getBreadcrumbs);

app.post("/api/tasks/create", tasksController.createTask);
app.delete("/api/tasks/delete", tasksController.deleteTask);

app.get("/api/users/:id", usersController.getUserById);
app.get("/api/users", usersController.getAllUsers);
app.post("/api/register", usersController.register);
app.post("/api/login", usersController.login);

console.log({ NODE_ENV });

if (NODE_ENV === "production") {
  app.use(express.static(`${__dirname}/public/`));
  app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname + "/../public/index.html")));
}

app.listen(PORT2, (err) => {
  if (err) throw err;
  console.log(`The server is listening on port ${PORT2}`);
});
