const pool = require("../../../connect.js")

const db = {}

// query to get all friends ID of a user

db.getAllUserFriends = (userId)=>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT `friendId`, `userId` FROM `user_friends` WHERE `userId` = ? OR `friendId` = ? ",[userId,userId],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            else
            {
                return resolve(result)
            }
        })
    })

}

module.exports = db