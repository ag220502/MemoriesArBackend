const express = require("express");
const router = express.Router();
const {
  createPost,
  editPost,
  deletePost,
  getAllUserPosts,
  getPostImage,
  getAllPostDetails,
  getAllReportedPosts,
} = require("../../controllers/Posts/userPost");

router.post("/create", createPost);
router.patch("/edit", editPost);
router.delete("/delete", deletePost);
router.get("/getAllPosts/:id", getAllUserPosts);
router.get("/getPostlink/:id", getPostImage);
router.get("/getAllPostDetails", getAllPostDetails);
router.get("/getAllReportedPosts", getAllReportedPosts);

module.exports = router;

//changes made
