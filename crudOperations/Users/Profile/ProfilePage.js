const pool = require("../../../connect.js")

const db = {}

db.getProfileData = (id)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT id,firstName,lastName,bio,profilePhoto,accVerified FROM `users` WHERE id=?', [id],(err,result)=>{
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