const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')

async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;
  const hash = await bcrypt.hash(password, 10);

  const userExists = await userModel.findOne({
    $or: [
      {
        email,
      },
      {
        username,
      },
    ],
  });

  if (userExists) {
    return res.status(409).json({
      message:
        userExists.email == email ? "Email already exists" : "Username exists",
    });
  }

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User created successfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [
      {
        email: email,
      },
      {
        username: username,
      },
    ],
  });

  if (!user) {
    return res.status(404).json({
      message: "No user found",
    });
  }

  const isValidPassword =
    await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Password did not match",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    }
  });
};

module.exports = {
    registerController,
    loginController
}