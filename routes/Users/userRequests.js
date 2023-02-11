const express = require("express")
const router = express.Router()
const func = require("../../controllers/Users/userRequests.js")

router.post("/sendRequest",func.sendRequest)
router.get("/getAllRequests",func.allRequests)
router.delete("/declineRequest",func.declineRequest)
router.post("/acceptRequest",func.acceptRequest)

module.exports = router