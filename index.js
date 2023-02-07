import express from "express"
const app = express()
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cors from "cors"
import cookieParser from "cookie-parser"

app.use(express.json())
app.use(cors())
app.use(cookieParser)

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)


app.listen(8900,()=>
{
    console.log("Server Started")
})