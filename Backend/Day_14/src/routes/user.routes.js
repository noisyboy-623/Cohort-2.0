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

/*
 * @route GET /api/user/requests
 * @desc Get pending follow requests for the authenticated user
 * @access Private
 */

userRouter.get(
  "/requests",
  identifyUser,
  userController.getPendingRequestController,
);

/*
 * @route PATCH /api/user/accept/:requestId
 * @desc Accept a pending follow request
 * @access Private
 */

userRouter.patch(
  "/accept/:requestId",
  identifyUser,
  userController.acceptPendingRequest
)

/*
 * @route DELETE /api/user/reject/:requestId
 * @desc Reject a pending follow request
 * @access Private
 */

userRouter.delete(
  "/reject/:requestId",
  identifyUser,
  userController.rejectPendingRequest
)

module.exports = userRouter;
