const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return;
  console.log({password})

  try {
    const user = await existingEmailUser({ email });
    if (!user) {
      res.send('No user with this email')
    };
    const isPasswordAuthenticated = await bcrypt.compare(password, user.password);
    if (isPasswordAuthenticated) {
      return res.send({ allowed: true })
    } else {
      return res.send('Not Allowed')
    }
  } catch (error) {
    console.error(error);
  }
};

const existingEmailUser = async ({ email }) => {
  return await User.findOne({ email });
}


exports.register = async (req, res) => {
  console.log("register");
  const { name, email, password } = req.body;
  if (!name || !email || !password) return;
  try {
    const existing = await existingEmailUser({ email });
    if (existing) {
      return res.send('There is a user with this email')
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
