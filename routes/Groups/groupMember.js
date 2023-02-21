const express = require("express");
const router = express.Router();
const {
  addMember,
  removeMember,
  makeAdmin,
  removeAdmin,
  joinGroup,
  leaveGroup
} = require("../../controllers/Groups/groupMember");

// route for add member to group
router.post("/add", addMember);

// route for remove member from group
router.delete("/remove", removeMember);

// route for make member admin
router.patch("/makeAdmin", makeAdmin);

// route for remove admin
router.patch("/removeAdmin", removeAdmin);

// route for joining group
router.post("/join", joinGroup);

// route for leaving group
router.delete("/leave", leaveGroup);

module.exports = router;
