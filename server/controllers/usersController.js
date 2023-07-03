const User = require("../models/User.js");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const getUserByEmail = async ({ email }) => {
  return await User.findOne({ email });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return;
  console.log({ email, password })

  try {
    const user = await getUserByEmail({ email });
    console.log({ user });
    const loggedUser = { name: user?.name, email: user?.email, uid: user?.uid };

    if (!user) {
      res.send({ announce: {message: 'No user with this email', type: 'error'} })
    }

    try {
      await bcrypt.compare(password, user.password);
    } catch(err) {
      console.log(err);
    }
    const isPasswordAuthenticated = await bcrypt.compare(password, user.password);
    console.log(isPasswordAuthenticated)
    if (isPasswordAuthenticated) {
      return res.send(loggedUser);
    } else {
      return res.send({ error: 'Not Allowed' });
    }
  } catch (err) {
    console.error(err);
  }
};

exports.register = async (req, res) => {
  console.log("register");
  const { name, email, password } = req.body;
  if (!name || !email || !password) return;
  try {
    const existing = await getUserByEmail({ email });
    if (existing) {
      return res.send({announce: {message: 'There is a user with this email', type: 'success'}})
    }
  } catch (error) {
    console.error(error);
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new User({
      uid: uuidv4(),
      name,
      email,
      password: hashedPassword,
      crated_at: Date.now(),
    });
    const stat = await user.save();
    console.log({ stat });
    res.send(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500).json({ error: "Internal server error" });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  if (!id) return;
  try {
    const user = await User.findOne({ uid: id });
    if (user) {
      return res.send(user)
    }
  } catch (error) {
    console.error(error);
  }
};

exports.getAllUsers = async () => {
  try {
    // Query the User collection to check if any documents exist
    const count = await User.countDocuments();

    if (count > 0) {
      console.log('Documents are available in the production environment.');
    } else {
      console.log('No documents found in the production environment.');
    }
  } catch (error) {
    console.error('Error occurred while checking document availability:', error);
  }
};