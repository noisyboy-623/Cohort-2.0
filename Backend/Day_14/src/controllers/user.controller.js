const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;
  const followee = await userModel.findOne({ username: followeeUsername });
  console.log(req.user.username);

  if (followeeUsername == followerUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  if (!followee) {
    return res.status(404).json({
      message: "No such user exists to follow",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    if (isAlreadyFollowing.status === "pending") {
      return res.status(200).json({
        message: `Follow request already sent to ${followeeUsername}`,
      });
    }

    if (isAlreadyFollowing.status === "accepted") {
      return res.status(200).json({
        message: `You are already following ${followeeUsername}`,
      });
    }
  }

  const status = followee.isPrivate ? "pending" : "accepted";

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
    status,
  });

  const message =
  status === "pending"
    ? `Follow request sent to ${followeeUsername}`
    : `You started following ${followeeUsername}`;

  res.status(200).json({
    message: message,
    follow: followRecord,
  });
}

async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isAlreadyFollowing) {
    return res.status(400).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isAlreadyFollowing._id);

  return res.status(200).json({
    message: `Unfollowed ${followeeUsername} successfully`,
  });
}

async function getPendingRequestController(req, res) {
  const loggedInUser = req.user.username;

  const pendingRequests = await followModel.find({
    followee: loggedInUser,
    status: "pending",
  });

  res.status(200).json({
    count: pendingRequests.length,
    requests: pendingRequests,
  });
}

async function acceptPendingRequest(req, res) {
  const requestId = req.params.requestId;
  const loggedInUser = req.user.username;

  const request = await followModel.findById(requestId);

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  if (request.followee != loggedInUser) {
    return res.status(403).json({
      message: "Not authorized",
    });
  }

  if (request.status !== "pending") {
  return res.status(400).json({
    message: "Request is not pending",
  });
}

  request.status = "accepted";
  await request.save();

  return res.status(200).json({
    message: `Follow request accepted`,
  });
}

async function rejectPendingRequest(req, res) {
  const requestId = req.params.requestId;
  const loggedInUser = req.user.username;

  const request = await followModel.findById(requestId);

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  if (request.followee != loggedInUser) {
    return res.status(403).json({
      message: "Not authorized",
    });
  }

  await followModel.findByIdAndDelete(requestId);

  return res.status(200).json({
    message: `Follow request rejected`,
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
  getPendingRequestController,
  acceptPendingRequest,
  rejectPendingRequest,
};
