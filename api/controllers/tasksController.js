const Task = require("../models/Task");
const { v4: uuidv4 } = require("uuid");
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
};

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

const getLastPosition = async () => {
  try {
    const tasks = await Task.find({}, "position");
    if (!tasks.length) return 0;
    return Math.max(...tasks.map(p => p.position));
  } catch (error) {
    console.log(error);
  }
};

exports.createTask = async (req, res) => {
  const { userId, title } = req.body;
  const lastPosition = await getLastPosition();
  const task = new Task({
    title,
    uid: uuidv4(),
    created_At: new Date(),
    user_id: userId,
    position: lastPosition + 1,
  });
  await task.save();
  res.status(200).json({ status: "Cool" });
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.body;
  try {
    await Task.deleteOne({ id: taskId });
    res.status(200).json({ status: "Deleted" });
  } catch (error) {
    console.error(error);
    res.status(204).json({ status: "Error with deleting item" });
  }
};

exports.editTask = async (req, res) => {
  const { taskUid, updates } = req.body;
  // const t = await Task.findOne({ uid: taskUid });
  await Task.findOneAndUpdate(
    { uid: taskUid },
    { ...updates, last_updated_at: new Date() }
  );

  res.status(204).json({ status: "sababa" });
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
