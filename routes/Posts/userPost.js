const express = require("express");
const router = express.Router();
const { createPost, editPost, deletePost } = require("../../controllers/Posts/userPost")

router.post("/create", createPost);
router.put("/edit", editPost);
router.delete("/delete", deletePost);

module.exports = router;

//changes made