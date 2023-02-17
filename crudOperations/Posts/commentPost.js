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

db.findPostByIdAndUserId = (postId, userId) => {
  return new Promise((resolve, reject) => {
    const findPostQuery =
      "SELECT * FROM `user_posts` WHERE `id`=? AND `userId`=?";
    pool.query(findPostQuery, [postId, userId], (err, result) => {
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
    const deletePostQuery = "DELETE FROM `post_comment` WHERE `commentId`=?";
    pool.query(deletePostQuery, [commentId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

module.exports = db;
