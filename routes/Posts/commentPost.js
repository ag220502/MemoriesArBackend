const express = require("express");
const router = express.Router();
const {
  postComment,
  deleteComment,
  getPostComments
} = require("../../controllers/Posts/commentPost.js");

router.post("/post", postComment);
router.delete("/delete", deleteComment);
router.get("/getPostComments", getPostComments)

module.exports = router;
