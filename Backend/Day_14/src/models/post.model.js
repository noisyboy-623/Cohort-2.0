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
    users:{
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User id required"]
    }
})

const postModel = mongoose.model('posts', postSchema)

module.exports = postModel