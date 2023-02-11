const express = require("express")
const router = express.Router()

const func = require("../../../controllers/Users/Profile/reportAccount.js")

router.post("/repAccount",func.reportAccount)
router.get("/",(req,res)=>{
    res.send("Hello")
})
module.exports = router