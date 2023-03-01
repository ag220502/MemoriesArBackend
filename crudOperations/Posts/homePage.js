// SELECT DISTINCT(u.id) AS userId,up.id AS postId,u.profilePhoto,u.firstName,u.lastName,upp.photo as PhotoLink from users u INNER JOIN user_posts up INNER JOIN (SELECT userId,friendId,friendDate FROM `user_friends` WHERE `userId` = 18 OR `friendId` = 18) v INNER JOIN user_post_photos upp ON (u.id=v.userId OR u.id=v.friendId) AND u.id=up.userId AND up.id=upp.postId ORDER BY up.uploadTime DESC

// Path: crudOperations/Posts/homePage.js
// Compare this snippet from crudOperations/Users/Profile/UsersFriends.js:
const pool = require("../../connect.js")

const db = {}

db.getAllPosts = (id)=>{
	return new Promise((resolve,reject)=>{
		pool.query("SELECT DISTINCT(u.id) AS userId,up.id as id,u.profilePhoto,u.firstName,u.lastName,upp.photo as PhotoLink from users u INNER JOIN user_posts up INNER JOIN (SELECT userId,friendId,friendDate FROM `user_friends` WHERE `userId` = ? OR `friendId` = ?) v INNER JOIN user_post_photos upp ON (u.id=v.userId OR u.id=v.friendId) AND u.id=up.userId AND up.id=upp.postId ORDER BY up.uploadTime DESC",[id,id],(err,results)=>{
			if(err)
			{
				reject(err)
			}
			else
			{
				resolve(results)
			}
		})
	})
}

module.exports = db