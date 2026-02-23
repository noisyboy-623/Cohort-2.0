const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: String,
    },
    followee: {
      type: String, 
    },
    
  },
  { timestamps: true },
);

followSchema.index({ follower: 1, followee: 1 }, { unique: true }); // Ensure a user cannot follow the same user multiple times

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;
