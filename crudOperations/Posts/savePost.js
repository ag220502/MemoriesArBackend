const pool = require("../../connect.js")

const db = {}

db.getUsersSavedPosts = (id)=>{
    return new Promise((resolve,reject)=>{
        pool.query("SELECT * FROM users WHERE id = ?",[id],(err,results)=>{
            if(err){
                return reject(err)
            }
            else if(results.length === 0){
                return reject("No user found")
            }
            else{
                pool.query('SELECT postId FROM `saved_posts` WHERE userId=?', [id],(err,result)=>{
                    if(err)
                    {
                        return reject(err)
                    }
                    else if(result.length == 0){
                        return reject("No saved Posts")
                    }
                    else
                    {
                        return resolve(result)
                    }
                })
            }
        })
    })

}

module.exports = db