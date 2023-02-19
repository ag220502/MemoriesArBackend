const express = require("express");
const router = express.Router();
const {
  postComment,
  deleteComment,
} = require("../../controllers/Posts/commentPost.js")

router.patch("/post", postComment);
router.delete("/delete", deleteComment);

module.exports = router;
