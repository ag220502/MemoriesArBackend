import db from "../../connect.js";

export const commentPost = (req, res) => {
  const { postId, comment, userId } = req.body;
  const commentQuery =
    "INSERT INTO `post_comment` (`postId`, `userId` `comment`) VALUES (?,?,?)";
  db.query(commentQuery, [postId, userId, comment], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json("Comment has been posted successfully");
    }
  });
};

export const deleteComment = () => {
  const { commentId, userId, postId } = req.body;
  // checking if the comment exists
  let findCommentQuery =
    "SELECT * FROM `post_comment` WHERE `commentId`=? AND `postId`=?";
  db.query(findCommentQuery, [commentId, postId], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else if (data.length) {
      //checking if the user posted the comment
      findCommentQuery =
        "SELECT * FROM `post_comment` WHERE `commentId`=? AND `userId`=?";
      db.query(findCommentQuery, [commentId, userId], (err, data) => {
        if (err) {
          return res.status(500).json(err);
        } else if (data.length) {
          const deletePostQuery =
            "DELETE FROM `post_comment` WHERE `commentId`=?";
          db.query(deletePostQuery, [commentId], (err, data) => {
            if (err) {
              return res.status(500).json(err);
            } else {
              return res.status(200).json("Post comment deleted successfully.");
            }
          });
        } else {
          // checking if the user created the post
          findCommentQuery =
            "SELECT * FROM `user_posts` WHERE `postId`=? AND `userId`=?";
          db.query(findCommentQuery, [postId, userId], (err, data) => {
            if (err) {
              return res.status(500).json(err);
            } else if (data.length) {
              const deletePostQuery =
                "DELETE FROM `post_comment` WHERE `commentId`=?";
              db.query(deletePostQuery, [commentId], (err, data) => {
                if (err) {
                  return res.status(500).json(err);
                } else {
                  return res.status(200).json("Post comment deleted successfully.");
                }
              });
            } else {
              return res.status(403).json("User doesn't have permission to perform this action");
            }
          });
        }
      });
    } else {
      return res.status(404).json("Comment does not exist");
    }
  });
};
