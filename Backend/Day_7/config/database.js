const mongoose = require('mongoose')
require 

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to DB");
    })
}

module.exports = connectToDB;