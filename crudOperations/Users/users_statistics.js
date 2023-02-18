const pool = require("./../../connect.js")

const db = {}

db.totalNumberOfUsers = ()=>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT COUNT(*) as totalNumberOfUsers FROM users",(err,data)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(data)
        })
    })
}

module.exports = db