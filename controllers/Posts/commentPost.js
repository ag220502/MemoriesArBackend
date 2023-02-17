const db = require("../../connect.js");
const queries = require("../../crudOperations/Posts/commentPost.js");

const postComment = async (req, res) => {
  const { postId, comment, userId } = req.body;
  if (!postId || !comment || !userId || comment.split(" ").join("") === "") {
    return res.status(400).json("Invalid/Empty fields.");
  } else {
    try {
      const result = await queries.addComment(postId, userId, comment);
      if (result.insertId) {
        return res.status(200).json("Comment was posted successfully.");
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};

const deleteComment = async (req, res) => {
  const { commentId, userId, postId } = req.body;
  if (!commentId || !userId || !postId) {
    return res.status(400).json("Invalid Details.");
  } else {
    try {
      if (await queries.findCommentByIdAndPostId(commentId, postId)) {
        if (await queries.findCommentByIdAndUserId(commentId, userId)) {
          await queries.deleteCommentById(commentId);
          return res.status(200).json("Comment deleted successfully");
        } else {
          if (await queries.findPostByIdAndUserId(postId, userId)) {
            await queries.deleteCommentById(commentId);
            return res.status(200).json("Comment deleted successfully");
          } else {
            return res
              .status(400)
              .json("Comment cannot be deleted by this user");
          }
        }
      } else {
        return res.status(404).json('Comment doesn\'t exist')
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  // checking if the comment exists
};
module.exports = { postComment, deleteComment };
