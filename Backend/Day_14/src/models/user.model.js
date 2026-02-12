const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "This username is already taken"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already in use"],
    required: [true, "Email is required"],
  },
  bio: String,
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/x2gd4sgsg/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg",
  },
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
