const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const crypto = require('crypto')

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = crypto.createHash("md5").update(password).digest("hex")

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      message: "User exists with this email",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User created",
    user,
    token,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "No such user exists",
    });
  }

  const isPassword = user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!isPassword) {
    return res.status(401).json({
      message: "Password did not match",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token)

  res.status(200).json({
    message: "user logged in",
    user,
  });
});

module.exports = authRouter;
