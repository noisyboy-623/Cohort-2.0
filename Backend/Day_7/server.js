const app = require('./src/app')
const connectToDB = require('./config/database')
require('dotenv').config()

connectToDB();

app.listen(3000,() => {
    console.log("Server running on port 3000")
})