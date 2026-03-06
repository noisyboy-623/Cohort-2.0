const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

/*
@route POST /api/post/
@desc Create a new post
*/

postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);

/*
@route GET /api/post/
@desc Get all posts for the authenticated user and their followings
*/

postRouter.get("/", identifyUser, postController.getPostsController);

/*
@route GET /api/post/details/:postId
@desc Get details of a specific post by its ID
*/

postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);

/*
@route POST /api/post/likes/:postId
@desc Like a post by its ID
*/

postRouter.post(
  "/likes/:postId", 
  identifyUser, 
  postController.likePostController
);

/*
@route POST /api/post/unlike/:postId
@desc Unlike a post by its ID
*/

postRouter.post(
  "/unlike/:postId",
  identifyUser,
  postController.unlikePostController
)

/*
@route GET /api/post/feed
@desc Get the feed of posts for the authenticated user and their followings
*/

postRouter.get(
  "/feed",
  identifyUser,
  postController.getFeedController
)

module.exports = postRouter;
