const express = require("express");
const { UserModel } = require("../Model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  const { name, email, pass, confirmpass } = req.body;
  if (!name || !email || !pass || !confirmpass) {
    return res
      .status(400)
      .json({ Message: "Please fill all the requried field!!" });
  }
  if (pass != confirmpass) {
    return res
      .status(400)
      .json({ Message: "Your confirm password will not matched!!" });
  }
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res
      .status(200)
      .json({ Message: "User already registered please login." });
  }
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err || !hash) {
        return res.status(400).json({ Message: "Something bad while hashing" });
      }
      const user = new UserModel({
        name,
        email,
        pass: hash,
      });
      await user.save();
      console.log(user);
      res
        .status(200)
        .json({ Message: "New user is successfully register", User: user });
    });
  } catch (error) {
    res.status(400).json({ Message: error.Message });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  if (!email || !pass) {
    return res
      .status(400)
      .json({ Message: "Please fill the required field in the form" });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ Message: "User not found..." });
    }
    bcrypt.compare(pass, user.pass, (err, result) => {
      if (err) {
        return res.status(400).json({ Message: "Somehing issue in hashing" });
      }
      if (!result) {
        return res.status(404).json({ Message: "Wrong password" });
      }
      jwt.sign({ User: user }, process.env.SECRET_KEY, (err, token) => {
        if (err) {
          return res
            .status(400)
            .json({ Message: "Something bad in creating token" });
        }
        res.status(200).json({ Message: "Login successfully", token: token });
      });
    });
  } catch (error) {
    res.status(500).json({ Message: "Server error", Error: error.message });
  }
});

module.exports = { UserRouter };
