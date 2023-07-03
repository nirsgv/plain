const mongoose = require("mongoose");
const DATABASE = process.env.DATABASE;
const { DB_USER, DB_PSWD, CLUSTER_ADDRESS, DB } = process.env;
mongoose.Promise = global.Promise; // Tells Mongoose to use ES6 promises
const fixieData = process.env.FIXIE_SOCKS_HOST.split(new RegExp('[/(:\\/@/]+'));
const CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PSWD}@${CLUSTER_ADDRESS}/${DB}`;

console.log(`DATABASE DATABASE DATABASE DATABASE DATABASE DATABASE DATABASE 


-------- -------------- ------ ${DATABASE} -------- ---------- --------
-------- -------------- ------ ${CONNECTION_STRING} -------- ---------- --------

DATABASE DATABASE DATABASE DATABASE DATABASE DATABASE DATABASE`);
mongoose.connect(DATABASE, {
  proxyUsername: fixieData[0],
  proxyPassword: fixieData[1],
  proxyHost: fixieData[2],
  proxyPort: fixieData[3],
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
