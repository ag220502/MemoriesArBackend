const pool = require("../../connect.js");

const db = {};

db.createPost = (userId, caption, lattitude, longitude, flag) => {
  return new Promise((resolve, reject) => {
    const createPostQuery =
      "INSERT INTO `user_posts`(`userId`, `caption`, `lattitude`, `longitude`, `flag`) VALUES (?,?,?,?,?)";
    pool.query(
      createPostQuery,
      [userId, caption, lattitude, longitude, flag],
      (err, result) => {
        if (err) {
          return reject({message: "Error creating a post. ", error:err});
        } else {
          return resolve(result);
        }
      }
    );
  });
};

db.findPostById = (postId) => {
  return new Promise((resolve, reject) => {
    const findPostQuery =
      "SELECT * FROM `user_posts` WHERE `id`=?";
    pool.query(findPostQuery, [postId], (err, result) => {
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

db.findUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const findPostQuery =
      "SELECT * FROM `users` WHERE `id`=?";
    pool.query(findPostQuery, [userId], (err, result) => {
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

db.editPost = (userId, postId, editPostQuery, fields) => {
  return new Promise((resolve, reject) => {
    pool.query(editPostQuery, fields.concat([userId, postId]), (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.deletePost = (postId) => {
  return new Promise((resolve, reject) => {
    const deletePostQuery = "DELETE FROM `user_posts` WHERE `id`=?";
    pool.query(deletePostQuery, [postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.deleteAllPostCommentsById = (postId) => {
  return new Promise((resolve, reject) => {
    const deleteCommentsQuery = "DELETE FROM `post_comment` WHERE `postId`=?";
    pool.query(deleteCommentsQuery, [postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.deleteAllPostLikesById = (postId) => {
  return new Promise((resolve, reject) => {
    const deleteCommentsQuery = "DELETE FROM `post_likes` WHERE `postId`=?";
    pool.query(deleteCommentsQuery, [postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};


db.deleteAllPostDisikesById = (postId) => {
  return new Promise((resolve, reject) => {
    const deleteCommentsQuery = "DELETE FROM `post_dislikes` WHERE `postId`=?";
    pool.query(deleteCommentsQuery, [postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

//delete reported posts?

db.deletePostsFromSavedById = (postId) => {
  return new Promise((resolve, reject) => {
    const deleteCommentsQuery = "DELETE FROM `saved_posts` WHERE `postId`=?";
    pool.query(deleteCommentsQuery, [postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.checkIdImageExists = (postId) => {
  return new Promise((resolve, reject) => {
    const findPostQuery =
      "SELECT * FROM `user_post_photos` WHERE `postId`=?";
    pool.query(findPostQuery, [postId], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  });
}

db.uploadImage = (postId, photo) => {
  return new Promise((resolve, reject) => {
    const uploadImageQuery =
      "INSERT INTO `user_post_photos`(`postId`, `photo`) VALUES (?,?)";
    pool.query(uploadImageQuery, [postId, photo], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.findImageById = (postId) => {
  return new Promise((resolve, reject) => {
    const findPostQuery =
      "SELECT * FROM `user_post_photos` WHERE `postId`=?";
    pool.query(findPostQuery, [postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      } 
    });
  });
};


module.exports = db;
