//Importing the .env file
// require("dotenv").config();

//Importing the third party libraries
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

//Importing all the routes
// const userRoutes = require("./routes/Users/users.js")
const authRoutes = require("./routes/Users/auth.js")
// const UserProfileRoute = require("./routes/Users/Profile/ProfilePage.js")       // DC - check if this is correct
const repAccRoutes = require("./routes/Users/Profile/reportAcc.js")
const userRequests = require("./routes/Users/userRequests.js")
const blockUsers = require("./routes/Users/blockedUsers.js")

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
// app.use("/api/users",UserProfileRoute)      // DC - check if this is correct
app.use("/api/report",repAccRoutes)
app.use("/api/requests",userRequests)
app.use("/api/block",blockUsers)

// app.use("/api/users",userRoutes)

//Telling app to listen to specific port
app.listen(3000,()=>{
    console.log(`Server Listening on port ${3000}`)
})