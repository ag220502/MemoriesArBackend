import express from "express"
import { getUser } from "../controllers/users.js"

//Creating a router object
const router = express.Router()

//Creating the api to test 
router.get("/find/:userid",getUser)

//Exporting the router
export default router