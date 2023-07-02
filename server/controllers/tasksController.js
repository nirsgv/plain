const Task = require("../models/Task.js");
const { v4: uuidv4 } = require("uuid");

const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
} = require("http-status-codes");

const getLastPosition = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const tasks = await Task.find({}, "position");
    if (!tasks.length) return 0;
    else return Math.max(...tasks.map((p) => p.position));
  } catch (error) {
    throw error;
  }
};

exports.getTasks = async (req, res) => {
  try {
    const response = await Task.find();
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ error, message: ReasonPhrases.NOT_FOUND });
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user_id: req.query?.userId,
      parent_task_uid: req.query?.parentTaskUid || "",
    });
    console.log({tasks});
    res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ error, message: ReasonPhrases.NOT_FOUND });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      user_id: req.query?.userId,
      uid: req.query?.taskUid || "",
    });
    console.log(task);
    return res.json(task);
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error, message: ReasonPhrases.NOT_FOUND });
  }
};

exports.createTask = async (req, res) => {
  const { userId, title, parentTask } = req.body;
  try {
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
    res
      .status(StatusCodes.CREATED)
      .json({ task, message: ReasonPhrases.CREATED });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error, message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.query;
  console.log({ taskId });

  try {
    await recursivelyDeleteTask(taskId);

    res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error, message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

const recursivelyDeleteTask = async (taskId) => {
  // Find the task by its ID and delete it
  const deletedTask = await Task.findOne({ uid: taskId });
  if (!deletedTask) {
    throw new Error('Task not found');
  }

  // Recursively delete child tasks
  const childTaskIds = deletedTask.child_task_uids;
  if (childTaskIds && childTaskIds.length > 0) {
    await Promise.all(
      childTaskIds.map(async (childTaskId) => {
        await recursivelyDeleteTask(childTaskId);
      })
    );
  }

  // Remove the deleted task from other tasks' child_task_uids
  await Task.updateMany(
    { child_task_uids: taskId },
    { $pull: { child_task_uids: taskId } }
  );

  // Delete the task itself
  await Task.deleteOne({ uid: taskId });
};

exports.editTask = async (req, res) => {
  const { taskUid, updates } = req.body;
  console.log({taskUid, updates});
  try {
    const response = await Task.findOneAndUpdate(
      { uid: taskUid },
      { ...updates, last_updated_at: new Date() }
    );
    res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.OK, data: response });
  } catch (error) {
    res
      .status(StatusCodes.NOT_MODIFIED)
      .json({ error, message: ReasonPhrases.NOT_MODIFIED });
  }
};

exports.addRemoveChild = async (req, res) => {
  const { taskUid, action, childTaskUid } = req.body;
  try {
    const task = await Task.findOne({ uid: taskUid });
    if (action === "add") {
      if (childTaskUid && !task.child_task_uids.includes(childTaskUid)) {
        task.child_task_uids = [...task.child_task_uids, childTaskUid];
      }
    } else if (action === "remove") {
      task.child_task_uids = task.child_task_uids.filter(
        (childTask) => childTask !== childTaskUid
      );
    }
    await task.save();
    return res.status(StatusCodes.OK).json({ task });
  } catch (error) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ error, message: ReasonPhrases.NOT_FOUND });
  }
};

exports.getTitles = async (req, res) => {
  const result = {};
  const uids = req.query.uids;
  if (!uids || !Array.isArray(uids)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  } else {
    try {
      const tasks = await Task.find({ uid: { $in: uids } });
      tasks.forEach((task) => {
        result[task.uid] = task.title;
      });
      console.log({ result });

      res.json(result);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
  }
};

exports.getBreadcrumbs = async (req, res) => {
  const taskUid = req.query.taskUid;
  console.log('getBreadcrumbs');
  console.log({ taskUid });
  if (!taskUid) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }

  try {
    const breadcrumbs = await getParentTasks(taskUid);
    res.json(breadcrumbs.reverse());
  } catch (error) {
    console.error('Error retrieving breadcrumbs:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};

async function getParentTasks(taskUid, breadcrumbs = [], level = 0) {
  const task = await Task.findOne({ uid: taskUid });

  if (!task) {
    return breadcrumbs.map((breadcrumb) => ({
      ...breadcrumb,
      level: breadcrumbs.length - 1 - breadcrumb.level,
    }));
  }

  const { uid, parent_task_uid, title } = task;
  breadcrumbs.push({ uid, parent_task_uid, title, level });

  if (parent_task_uid) {
    return getParentTasks(parent_task_uid, breadcrumbs, level + 1);
  } else {
    return breadcrumbs.map((breadcrumb) => ({
      ...breadcrumb,
      level: breadcrumbs.length - 1 - breadcrumb.level,
    }));
  }
}


exports.test = async (req, res) => {
  try {
    const count = await Task.countDocuments();
    res.send(`Total tracks: ${count}`);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
