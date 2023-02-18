const queries = require("../../crudOperations/Users/users_statistics")

const totalNumberOfUsers = async (req,res)=>{
    try{
        const data = await queries.totalNumberOfUsers()
        res.status(200).json(data)
    }
    catch(error)
    {
        res.status(500).json(error)
    }
}

module.exports = {totalNumberOfUsers}