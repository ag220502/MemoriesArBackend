const express = require("express")
const router = express.Router()
const func = require("../../controllers/Users/auth.js")

router.post("/login",func.loginFunc)
router.post("/register",func.registerFunc)
router.post("/logout",func.logoutFunc)


module.exports = router