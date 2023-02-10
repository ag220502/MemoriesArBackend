//Importing the .env file
// require("dotenv").config();

//Importing the third party libraries
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

//Importing all the routes
// const userRoutes = require("./routes/Users/users.js")
const authRoutes = require("./routes/Users/auth.js")

const app = express()

//Using all the thrid party functions
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//Using all the routes
// app.use("/",(req,res)=>{
//     res.send("Hello World")
// })
app.use("/api/auth",authRoutes)
// app.use("/api/users",userRoutes)

//Telling app to listen to specific port
app.listen(3000,()=>{
    console.log(`Server Listening on port ${3000}`)
})