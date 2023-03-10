const express = require("express")
const router = express.Router()

const func = require("../../controllers/Users/recentSearches.js")

router.post("/createSearch",func.createSearch)
router.patch("/deleteSearch",func.deleteSearch)
router.get("/userRecentSearches/:id",func.userRecentSearches)

module.exports = router