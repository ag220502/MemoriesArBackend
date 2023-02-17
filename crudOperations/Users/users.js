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

db.checkUserById = (id)=>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT * FROM users WHERE id=?",id,(err,data)=>{
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

db.getUserById = (id)=>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT * FROM users WHERE id=?",id,(err,data)=>{
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

db.updatePassword = (id,password)=>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT * from users where id=?",id,(err,data)=>{
            if(err)
            {
                return reject(err)
            }
            else if(data.length==0)
            {
                return reject("User Does Not Exist!")
            }
            else{
                pool.query("UPDATE users SET password=? WHERE id=?",[password,id],(err,result)=>{
                    if(err)
                    {
                        return reject(err)
                    }
                    return resolve(result)
                })
            }
        })
    })
}

module.exports = db