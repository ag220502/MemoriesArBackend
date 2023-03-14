const pool = require("../../connect.js");

const db = {};

db.addComment = (postId, userId, comment) => {
  return new Promise((resolve, reject) => {
    const createCommentQuery =
      "INSERT INTO `post_comment` (`postId`, `userId`, `comment`) VALUES (?,?,?)";
    pool.query(createCommentQuery, [postId, userId, comment], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

db.findCommentByIdAndPostId = (commentId, postId) => {
  return new Promise((resolve, reject) => {
    const findCommentQuery =
      "SELECT * FROM `post_comment` WHERE `commentId`=? AND `postId`=?";
    pool.query(findCommentQuery, [commentId, postId], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  });
};

db.findCommentByIdAndUserId = (commentId, userId) => {
  return new Promise((resolve, reject) => {
    const findCommentQuery =
      "SELECT * FROM `post_comment` WHERE `commentId`=? AND `userId`=?";
    pool.query(findCommentQuery, [commentId, userId], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  });
};

db.findCommentById = (commentId) => {
  return new Promise((resolve, reject) => {
    const findCommentQuery = "SELECT * FROM `post_comment` WHERE `commentId`=?";
    pool.query(findCommentQuery, [commentId], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  });
};

db.deleteCommentById = (commentId) => {
  return new Promise((resolve, reject) => {
    const deleteCommentQuery = "DELETE FROM `post_comment` WHERE `commentId`=?";
    pool.query(deleteCommentQuery, [commentId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.getPostComments = (postId) => {
  return new Promise((resolve, reject) => {
    const getCommentsQuery = "SELECT * FROM `post_comment`  WHERE `postId` = ?"
    pool.query(getCommentsQuery, [postId], (err, result) =>{
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    })
  })
}

module.exports = db;
