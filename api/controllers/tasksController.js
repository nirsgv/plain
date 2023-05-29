const Task = require("../models/Task");
const { v4: uuidv4 } = require("uuid");

const { ReasonPhrases, StatusCodes } = require("http-status-codes");

exports.getTasks = async (req, res) => {
  try {
    const response = await Task.find();
    res.status(StatusCodes.OK).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.NOT_FOUND).json({ error, message: ReasonPhrases.NOT_FOUND });
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.query?.userId });
    res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error, message: ReasonPhrases.NOT_FOUND });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const response = await Task.find();
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: ReasonPhrases.NOT_FOUND });
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
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error, message: ReasonPhrases.NOT_FOUND });
  }
};

const getLastPosition = async () => {
  try {
    const tasks = await Task.find({}, "position");
    if (!tasks.length) return 0;
    return Math.max(...tasks.map((p) => p.position));
  } catch (error) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ error, message: ReasonPhrases.NOT_FOUND });
  }
};

exports.createTask = async (req, res) => {
  const { userId, title, parentTask } = req.body;
  const lastPosition = await getLastPosition();
  const task = new Task({
    title: title || "What do you need to do?",
    uid: uuidv4(),
    created_At: new Date(),
    user_id: userId,
    position: Math.ceil(lastPosition + 100),
    parent_task_uid: parentTask || "",
  });
  await task.save();
  res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED });
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.body;
  try {
    await Task.deleteOne({ id: taskId });
    res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.NO_CONTENT).json({ error, message: ReasonPhrases.NO_CONTENT });
  }
};

exports.editTask = async (req, res) => {
  const { taskUid, updates } = req.body;
  try {
    await Task.findOneAndUpdate(
      { uid: taskUid },
      { ...updates, last_updated_at: new Date() }
    );
    res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED });
  } catch (error) {
    res
      .status(StatusCodes.NOT_MODIFIED)
      .json({ error, message: ReasonPhrases.NOT_MODIFIED });
  }
};

exports.addRemoveChild = async (req, res) => {
  console.log(req.body);
  const { taskUid, action, childTaskUid } = req.body;
  try {
    const task = await Task.findOne({ uid: taskUid });
    if (action === "add") {
      if (!task.child_task_uids.includes(childTaskUid)) {
        task.child_task_uids = [...task.child_task_uids, childTaskUid];
      }
    } else if (action === "remove") {
      task.child_task_uids = task.child_task_uids.filter(
        (childTask) => childTask !== childTaskUid
      );
    }
    await task.save(); // Save the updated task
    console.log({ task });
    return res.json({ task });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: "Task not found" });
  }
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
