const pool = require("../../connect.js")

const db = {}

db.addNewFriend = (userId,friendId)=>{
    return new Promise((resolve,reject)=>{
        pool.query("INSERT INTO `user_friends`(`userId`, `friendId`) VALUES (?,?)",[userId,friendId],(err,result)=>{
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
