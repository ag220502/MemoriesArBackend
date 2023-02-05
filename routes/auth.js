import express from "express"
import {loginFunc,registerFunc,logoutFunc} from "./../controllers/auth.js"
const router = express.Router()

router.post("login",loginFunc)
router.post("register",registerFunc)
router.post("logout",logoutFunc)

export default router