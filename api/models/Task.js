const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  uid: {
    type: String,
    trim: true,
  },
  created_at: {
    type: Date,
  },
  last_edited_at: {
    type: Date,
  },
  status: {
    type: String,
    trim: true,
  },
  tags: {
    type: [],
  },
  child_tasks: {
    type: [String],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  archived_at: {
    type: Date,
  },
  user_id: {
    type: String,
    default: false,
  },
});

module.exports = mongoose.model("Task", taskSchema);
