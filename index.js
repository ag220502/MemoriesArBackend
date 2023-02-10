import express from "express"
const app = express()
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cors from "cors"
import cookieParser from "cookie-parser"

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get("/", (req, res) => 
{
    res.send('Hello World!')
})
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)


app.listen(3000)