const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  uid: {
    type: String,
    trim: true,
  },
  crated_at: {
    type: Date,
    trim: true,
  }
});

module.exports = mongoose.model("User", userSchema);
