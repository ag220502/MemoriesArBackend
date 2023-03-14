const express = require("express")
const router = express.Router()

const func = require("../../controllers/Themes/theme.js")

router.get("/getAllThemes",func.getThemes)
router.post("/addThemes",func.addThemes)


module.exports = router
