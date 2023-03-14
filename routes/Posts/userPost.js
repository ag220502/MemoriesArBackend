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
  getAllDislikedPosts,
  getPostById,
  checkLiked,
  checkDisliked,
  checkSaved,
} = require("../../controllers/Posts/userPost");

router.post("/create", createPost);
router.patch("/edit", editPost);
router.delete("/delete", deletePost);
router.get("/getPostById/:id", getPostById)
router.get("/getAllPosts/:id", getAllUserPosts);
router.get("/getPostlink/:id", getPostImage);
router.get("/getAllPostDetails", getAllPostDetails);
router.get("/getAllReportedPosts", getAllReportedPosts);
router.get("/getAllDislikedPosts", getAllDislikedPosts);
router.get("/checkLiked/:postId/:userId", checkLiked);
router.get("/checkDisliked/:postId/:userId", checkDisliked);
router.get("/checkSaved/:postId/:userId", checkSaved);

module.exports = router;
