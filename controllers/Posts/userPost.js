const db = require("../../connect.js");
const { findAllPostsByUserId } = require("../../crudOperations/Posts/userPost");
const queries = require("../../crudOperations/Posts/userPost");
const { createPost } = require('../../functions/index')
// const createPost = async (req, res) => {
//   const { userId, image, lattitude, longitude } = req.body;
//   let { caption } = req.body;
//   if (!userId || !caption || !lattitude || !longitude) {
//     res.status(404).json("Empty fields");
//   }
//   // add image to the table
//   else {
//     try {
//       const result = await queries.createPost(
//         userId,
//         caption,
//         lattitude,
//         longitude
//       );
//       return res.status(200).json("Post was created successfully.");
//     } catch (error) {
//       return res.status(400).json(error);
//     }
//   }
// };

const editPost = async (req, res) => {
  const { userId, postId, image, caption, lattitude, longitude } = req.body;
  if (!userId || !postId) {
    return res.status(404).json("Invalid user/post ID");
  }
  if (!image && !caption && !lattitude && !longitude) {
    //check error code
    return res.status(400).json("No details to be updated");
  }
  let fields = [];
  try {
    if (!(await queries.findPostByIdAndUserId(postId, userId))) {
      res.status(404).json("Post doesn't exist");
    } else {
      let editPostQuery =
        "UPDATE `user_posts` SET `dateEdited` = CURRENT_TIMESTAMP(), ";
      let bool = false;
      if (image) {
        editPostQuery = editPostQuery + " `image` = ?";
        bool = true;
        fields.push(image);
      }
      if (caption) {
        if (bool) {
          editPostQuery = editPostQuery + ",";
        }
        editPostQuery = editPostQuery + " `caption` = ?";
        bool = true;
        fields.push(caption);
      }
      if (lattitude) {
        if (bool) {
          editPostQuery = editPostQuery + ",";
        }
        editPostQuery = editPostQuery + " `lattitude` = ?";
        bool = true;
        fields.push(lattitude);
      }
      if (longitude) {
        if (bool) {
          editPostQuery = editPostQuery + ",";
        }
        editPostQuery = editPostQuery + " `longitude` = ?";
        fields.push(longitude);
      }
      editPostQuery = editPostQuery + " WHERE `userId` = ? AND `id` = ?";
      const result = await queries.editPost(
        userId,
        postId,
        editPostQuery,
        fields
      );
      return res.status(200).json("Post updated successfully.");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deletePost = async (req, res) => {
  const { userId, postId } = req.body;
  if (!userId || !postId) {
    return res.status(404).json("Invalid user/post ID");
  }
  try {
    if (await queries.findPostByIdAndUserId(postId, userId)) {
      await queries.deletePost(postId);
      await queries.deleteAllPostCommentsById(postId);
      await queries.deleteAllPostLikesById(postId);
      await queries.deleteAllPostDisikesById(postId);
      await queries.deletePostsFromSavedById(postId);
      return res.status(200).json("Post deleted successfully.");
    } else {
      return res.status(404).json("Post doesn't exist");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAllUserPosts = async (req,res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json("Invalid user ID");
  }
  try {
    const result = await findAllPostsByUserId(id);
    console.log(result)
    return res.status(200).json(result);


  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { createPost, editPost, deletePost , getAllUserPosts};
