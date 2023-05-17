const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');

exports.login = async (req, res) => {
  res.send(req.body);
  passport.authenticate("passportLocalMongoose", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  });
  console.log(req, res);
};

exports.register = async (req, res) => {
  console.log("register");
  const { name, email, password } = req.body;
  if (!name || !email || !password) return;
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
    res.send(`Total stat: ${stat}`);
  } catch (error) {
    console.error(error);
    res.sendStatus(500).json({ error: "Internal server error" });
  }
  
};
