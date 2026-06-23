import dotenv from "dotenv"
import app from "./src/app.js"
import connectDB from "./src/config/db.js"

dotenv.config()

connectDB();

app.listen(3000, ()=>{
    console.log("Sandbox API server running on port 3000")
})