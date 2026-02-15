const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function createPostController(req, res) {
  console.log(req.body, req.file);

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "User not authorized",
    });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test55",
    folder: 'cohort-2-insta-clone/posts'
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imageUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getPostsController(req, res) {
  const token = req.cookies.token

  if(!token){
    return res.status(401).json({
      message: "Unauthorized access"
    })
  }
  let decoded;

  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  }catch(err){
    return res.status(401).json({
      message: "Invalid token"
    })
  }

  const userId = decoded.id;

  const posts = await postModel.find({
    user: userId
  })

  res.status(200).json({
    message: "Posts fetched successfully",
    posts
  })
}

async function getPostDetailsController(req, res) {
  const token = req.cookies.token

  if(!token){
    return res.status(401).json({
      message: "Unauthorized access"
    })
  }

  let decoded;

  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  }catch(err){
    return res.status(401).json({
      message: "Invalid token"
    })
  }

  const userId = decoded.id
  const postId = req.params.postId

  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
      message: "No posts found"
    })
  }

  const isValidUser = post.user.toString() === userId

  if(!isValidUser){
    return res.status(403).json({
      message: "Forbidden content"
    })
  }

  res.status(200).json({
    message: "Post details fetched successfully",
    post
  })
}
module.exports = {
  createPostController,
  getPostsController,
  getPostDetailsController
};
