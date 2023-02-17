//Importing the .env file
// require("dotenv").config();

//Importing the third party libraries
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

//Importing all the routes
// const userRoutes = require("./routes/Users/users.js")
const authRoutes = require("./routes/Users/auth.js")
const UserProfileRoute = require("./routes/Users/Profile/ProfilePage.js")       
const repAccRoutes = require("./routes/Users/Profile/reportAcc.js")
const userRequests = require("./routes/Users/userRequests.js")
const blockUsers = require("./routes/Users/blockedUsers.js")
const UsersFriends = require("./routes/Users/Profile/UsersFriends.js")      
const SavedPosts = require("./routes/Posts/savePost.js")                   


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
app.use("/api/users",UserProfileRoute)      
app.use("/api/report",repAccRoutes)
app.use("/api/requests",userRequests)
app.use("/api/block",blockUsers)
app.use("/api/usersfriends",UsersFriends)        
app.use("/api/savedposts",SavedPosts)            
// app.use("/api/users",userRoutes)

app.use("/api/comment", postComment)            // DD - add, delete comments
app.use("/api/posts", userPost)                 // DD - create, delete, edit post
app.use("/api/likes", likePost)                 // DD - like and unlike posts
app.use("/api/dislikes", dislikePost)           // DD - dislike and undislike posts

//Telling app to listen to specific port
app.listen(3000,()=>{
    console.log(`Server Listening on port ${3000}`)
})
