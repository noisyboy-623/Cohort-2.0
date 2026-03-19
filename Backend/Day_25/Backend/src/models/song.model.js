const mongoose = require ("mongoose")

const songSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    posterURL:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    mood:{
        type: String,
        enum:{
            values:["sad", "happy", "surprised"],
            message: "Enum this is"
        }
    },
    artist:{
        type: String,
        default: "Unknown Artist"
    },
    album:{
        type: String,
        default: "Unknown Album"
    },
    year:{
        type: Number,
        default: null
    },
    composer:{
        type: String,
        default: "Unknown Composer"
    },
    lyrics:{
        type: String,
        default: ""
    }

}) 

const songModel = mongoose.model("song", songSchema)

module.exports = songModel