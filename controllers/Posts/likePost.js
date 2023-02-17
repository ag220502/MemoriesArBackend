const db = require("../../connect.js");
const queries = require("../../crudOperations/Posts/likePost");
const dislikeQueries = require("../../crudOperations/Posts/dislikePost");

const likePost = async(req, res) => {
  const { userId, postId } = req.body;
    try {
        if (await queries.findLikeByUserIdAndPostId(userId, postId)) {
            return res.status(200).json("Post has already been liked");
        } else {
            if (await dislikeQueries.findDislikeByUserIdAndPostId(userId, postId)) {
                await dislikeQueries.undislikePost(userId, postId)
            }
            await queries.likePost(userId, postId) 
            return res.status(200).json("Post has been liked successfully.")
        }
    } catch (error) {
        res.status(400).json(error)
    }
};

const unlikePost = async(req, res) => {
    const { userId, postId } = req.body;
      try {
          if (await queries.findLikeByUserIdAndPostId(userId, postId)) {
            await queries.unlikePost(userId, postId)   
            return res.status(200).json("Post has been unliked successfully");
          } else {
            return res.status(200).json("Post has not been liked.")
          }
      } catch (error) {
          res.status(400).json(error)
      }
  };

module.exports = { likePost, unlikePost };
