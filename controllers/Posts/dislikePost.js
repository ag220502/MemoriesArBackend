const db = require("../../connect.js");
const likeQueries = require("../../crudOperations/Posts/likePost");
const queries = require("../../crudOperations/Posts/dislikePost");

const dislikePost = async(req, res) => {
  const { userId, postId } = req.body;
    try {
        if (await queries.findDislikeByUserIdAndPostId(userId, postId)) {
            return res.status(200).json("Post has already been disliked");
        } else {
            await queries.dislikePost(userId, postId) 
            if (await likeQueries.findLikeByUserIdAndPostId(userId, postId)) {
                await likeQueries.unlikePost(userId, postId)
            }
            return res.status(200).json("Post has been disliked successfully.")
        }
    } catch (error) {
        res.status(400).json(error)
    }
};

const undislikePost = async(req, res) => {
    const { userId, postId } = req.body;
      try {
          if (await queries.findDislikeByUserIdAndPostId(userId, postId)) {
            await queries.undislikePost(userId, postId)   
            return res.status(200).json("Post has been undisliked successfully");
          } else {
            return res.status(200).json("Post has not been disliked.")
          }
      } catch (error) {
          res.status(400).json(error)
      }
  };

module.exports = { dislikePost, undislikePost };
