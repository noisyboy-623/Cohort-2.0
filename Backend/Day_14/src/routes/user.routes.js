const express = require("express");
const userRouter = express.Router();

const identifyUser = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

/*
* @route POST /api/user/follow/:username
* @desc Follow a user
* @access Private
*/

userRouter.post(
  "/follow/:username",
  identifyUser,
  userController.followUserController,
);


/*
* @route POST /api/user/unfollow/:username
* @desc Unfollow a user
* @access Private
*/

userRouter.post(
  "/unfollow/:username",
  identifyUser,
  userController.unfollowUserController,
);

module.exports = userRouter;
