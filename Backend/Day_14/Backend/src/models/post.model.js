const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default: ""
    },
    imageUrl:{
        type: String,
        required: [true, "ImageUrl is required"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User id required"]
    }
})

const postModel = mongoose.model('posts', postSchema)

module.exports = postModel