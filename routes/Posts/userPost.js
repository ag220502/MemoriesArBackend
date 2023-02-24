const express = require("express");
const router = express.Router();
const { createPost, editPost, deletePost, getAllUserPosts } = require("../../controllers/Posts/userPost")

router.post("/create", createPost);
router.patch("/edit", editPost);
router.delete("/delete", deletePost);
router.get("/getAllPosts", getAllUserPosts )

module.exports = router;

//changes made