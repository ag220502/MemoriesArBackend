const queries = require("../../crudOperations/Users/searchUser.js")

const searchUserByName = async (req,res)=>{
    const name  = req.body.name    

    if(!name)
    {
        return res.status(400).json("Invalid Details")
    }
    try{
        const result = await queries.searchByName(name)
        console.log(result)
        return res.status(200).json(result)
    }
    catch(err)
    {
        return res.status(400).json(err)
    }
}

module.exports={searchUserByName}