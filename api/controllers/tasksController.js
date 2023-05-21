const Task = require("../models/Task");
const { v4: uuidv4 } = require('uuid');
exports.getTasks = async (req, res) => {
  try {
    console.log("Fetching tracks...");
    const response = await Task.find();
    console.log("Tasks:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.params?.userId });
    console.log(tasks);
    res.json(tasks);
  } catch (err) {
    console.error(err);
  }
}


exports.getTasks = async (req, res) => {
  try {
    console.log("Fetching tracks...");
    const response = await Task.find();
    console.log("Tasks:", response);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getTask = async (req, res) => {

  try {
    const task = await Task.findOne({ id: req.params.id });
    console.log({ task });
    if (!task) {
      return res.status(404).json({ error: "Track not found" });
    }
    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.createTask = async (req, res) => {
  let body = req.body;
  console.log(body);
  if (!req.body.user_id) res.status(500).json({ error: "no user specified" });
  const task = new Task({ ...body, uid: uuidv4(), created_At: new Date() });
  const stat = await task.save();
  console.log({stat});
  res.status(200).json({ status: stat });
};

exports.editTask = async (req, res) => {
  const { taskUid, value } = req.body;
  const t = await Task.findOne({ uid: taskUid });
  t.title = value;
  t.last_updated_at = new Date();
  t.save();
  res.status(204).json({ status: 'sababa' });;
};


exports.test = async (req, res) => {
  try {
    const count = await Task.countDocuments();
    res.send(`Total tracks: ${count}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};