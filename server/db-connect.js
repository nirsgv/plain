const mongoose = require("mongoose");
const DATABASE = process.env.DATABASE;
console.log(`DATABASE DATABASE DATABASE DATABASE DATABASE DATABASE DATABASE 


-------- -------------- ------ ${DATABASE} -------- ---------- --------


DATABASE DATABASE DATABASE DATABASE DATABASE DATABASE DATABASE`);
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
connection.on("error", (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
  console.error("MongoDB connection error:");
  console.error(err);
});