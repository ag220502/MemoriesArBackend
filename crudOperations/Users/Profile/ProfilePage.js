const pool = require("../../../connect.js")

const db = {}

db.getProfileData = (id)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT id,firstName,lastName,bio,profilePhoto,accVerified FROM `users` WHERE id=?', [id],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            else if(result.length == 0){
                return reject("No user found")
            }
            else
            {
                return resolve(result)
            }
        })
    })

}

db.getPersonalData = (id)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT id,email,dob,countryCode,mobile,gender,address,city,state,country FROM `users` WHERE id=?', [id],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            else if(result.length == 0){
                return reject("No user found")
            }
            else
            {
                return resolve(result)
            }
        })
    })

}

db.updateProfileData = (id,firstName,lastName,bio,profilePhoto)=>{
    return new Promise((resolve,reject)=>{
        pool.query(' SELECT * FROM users WHERE id = ? ' , [id],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            else if(result.length == 0){
                return reject("Account does not exist")
            }
            else{
                pool.query('UPDATE `users` SET firstName=?, lastName=?, bio=?, profilePhoto=? WHERE id=?', [firstName,lastName,bio,profilePhoto,id],(err,result)=>{
                    if(err)
                    {
                        return reject(err)
                    }
                    else if(result.affectedRows == 0){
                        return reject("No changes made")
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

db.deactivateAccount = (id)=>{
    return new Promise((resolve,reject)=>{
        pool.query(' SELECT * FROM users WHERE id = ? ' , [id],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            else if(result.length == 0){
                return reject("Account does not exist")
            }
            else{
                pool.query('UPDATE `users` SET accStatus = 1 WHERE id=? AND accStatus != 1', [id],(err,result)=>{
                    if(err)
                    {
                        return reject(err)
                    }
                    else if(result.affectedRows == 0){
                        return reject("Account already deactivated")
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

db.activateAccount = (id)=>{
    return new Promise((resolve,reject)=>{
        pool.query(' SELECT * FROM users WHERE id = ? ' , [id],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            else if(result.length == 0){
                return reject("Account does not exist")
            }
            else{
                pool.query('UPDATE `users` SET accStatus = 0 WHERE id=? AND accStatus != 0', [id],(err,result)=>{
                    if(err)
                    {
                        return reject(err)
                    }
                    else if(result.affectedRows == 0){
                        return reject("Account already activated")
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

db.deleteAccount = (id)=>{
    return new Promise((resolve,reject)=>{
        pool.query(' SELECT * FROM users WHERE id = ? ' , [id],(err,result)=>{
            if(err)
            {
                return reject(err)
            }
            else if(result.length == 0){
                return reject("Account does not exist")
            }
            else{
                pool.query('DELETE FROM `users` WHERE id=?', [id],(err,result)=>{
                    if(err)
                    {
                        return reject(err)
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