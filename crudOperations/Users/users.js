const pool = require("./../../connect.js")

const db = {}

db.allUsers = ()=>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT * from users",(err,data)=>{
            if(err)
            {
                return reject(false)
            }
            return resolve(data)
        })
    })
}

db.checkUserByEmail = (email)=>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT * FROM users WHERE email=?",email,(err,data)=>{
            if(err)
            {
                return reject(err)
            }
            if(data.length>0)
            {
                return resolve(true)
            }
            else{
                return resolve(false)
            }
        })
    })
}

db.getUserByEmail = (email)=>
{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT * FROM users WHERE email=?",email,(err,data)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(data)
        })
    })
}

db.insertUser = (name,email,password)=>{
    return new Promise((resolve,reject)=>{
        pool.query("INSERT INTO `users`(`firstName`,`email`, `password`) VALUES (?,?,?)",[name,email,password],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            return resolve(result.insertId)
        })
    })
}

module.exports = db