// Routes for Comment on Post, and Delete Comment
const express = require("express");
const router = express.Router();
const { createPost, editPost, deletePost } = require("../../controllers/Posts/userPost")

router.post("/create", createPost);
router.post("/edit", editPost);
router.post("/delete", deletePost);

module.exports = router;
