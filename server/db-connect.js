const mongoose = require("mongoose");
const DATABASE = process.env.DATABASE;
mongoose.Promise = global.Promise; // Tells Mongoose to use ES6 promises
console.log(`DATABASE DATABASE DATABASE DATABASE DATABASE DATABASE DATABASE 


-------- -------------- ------ ${DATABASE} -------- ---------- --------


DATABASE DATABASE DATABASE DATABASE DATABASE DATABASE DATABASE`);
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

console.log(connection.readyState); //logs 0
mongoose.connection.on('connecting', () => { 
  console.log('connecting')
  console.log(connection.readyState); //logs 2
});
mongoose.connection.on('connected', () => {
  console.log('connected');
  console.log(connection.readyState); //logs 1
});
mongoose.connection.on('disconnecting', () => {
  console.log('disconnecting');
  console.log(connection.readyState); // logs 3
});
mongoose.connection.on('disconnected', () => {
  console.log('disconnected');
  console.log(connection.readyState); //logs 0
});


connection.once("open", () =>
  console.log(
    "Connection with MongoDB was successful",
    "Database connection string:",
    DATABASE
  )
);
connection.on("error", (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
  console.error("MongoDB connection error:");
  console.error(err);
});
