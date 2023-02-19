const express = require("express");
const router = express.Router();
const {
  dislikePost,
  undislikePost,
} = require("../../controllers/Posts/dislikePost")

router.patch("/dislike", dislikePost);
router.delete("/undislike", undislikePost);

module.exports = router;
