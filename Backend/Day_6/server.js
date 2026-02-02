const app = require('./src/app')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://tejasshekhar614_db_user:juloKslAAbVA1lax@cluster0.fvts5lj.mongodb.net/day-6')
.then(() => {
    console.log("Connected to Database");
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})