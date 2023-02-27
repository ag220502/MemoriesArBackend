//Importing the .env file
require("dotenv").config();

//Importing the third party libraries
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

//Importing all the routes
const userRoutes = require("./routes/Users/users.js")
const authRoutes = require("./routes/Users/auth.js")
const UserProfileRoute = require("./routes/Users/Profile/ProfilePage.js")  // profile page     
const repAccRoutes = require("./routes/Users/Profile/reportAcc.js")
const userRequests = require("./routes/Users/userRequests.js")
const blockUsers = require("./routes/Users/blockedUsers.js")
const UsersFriends = require("./routes/Users/Profile/UsersFriends.js")      //DC - users friends
const SavedPosts = require("./routes/Posts/savePost.js")                   //DC - saved posts
const searchRoute = require("./routes/Users/searchUser.js")
const users_statistics = require("./routes/Users/users_statistics.js")
const interest = require("./routes/Users/interests.js")
const userInterests = require("./routes/Users/userInterests.js")

const postComment = require("./routes/Posts/commentPost.js")            // DD - add, delete comments
const userPost = require("./routes/Posts/userPost.js")                   // DD - create, delete, edit post
const likePost = require("./routes/Posts/likePost.js")                   // DD - like and unlike posts
const dislikePost = require("./routes/Posts/dislikePost.js")             // DD - dislike and undislike posts
const tagUser = require("./routes/Posts/tagPost")                       // DD - tag and untag users

// verify account
const verifyAccount = require("./routes/Users/otpVerification")

const app = express()

// import group routes
const groupRoutes = require("./routes/Groups/group.js");                // DD - create, edit, delete group
const groupMemberRoutes = require("./routes/Groups/groupMember.js");    // DD - add, remove, make admin, remove admin


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
app.use("/api/search",searchRoute) 
app.use("/api/usersfriends",UsersFriends)        
app.use("/api/savedposts",SavedPosts)
app.use("/api/userStats",users_statistics)            
app.use("/api/interests",interest) 
app.use("/api/userinterests",userInterests) 
app.use("/api/userRoutes",userRoutes)

//verify account
app.use("/api/verify",verifyAccount)

// posts
app.use("/api/comment", postComment)            // DD - add, delete comments
app.use("/api/posts", userPost)                 // DD - create, delete, edit post
app.use("/api/likes", likePost)                 // DD - like and unlike posts
app.use("/api/dislikes", dislikePost)           // DD - dislike and undislike posts
app.use("/api/tagUser", tagUser)                // DD - tag and untag users

// groups
app.use("/api/groups", groupRoutes);
app.use("/api/groupMember", groupMemberRoutes);


//Telling app to listen to specific port
app.listen(process.env.PORT || 3000 ,()=>{
    console.log(`Server Listening on port ${process.env.PORT}`)
})
