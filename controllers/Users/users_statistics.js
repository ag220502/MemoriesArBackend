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

const totalNumberOfActiveUsers = async (req,res)=>{
    try{
        const data = await queries.totalNumberOfActiveUsers()
        res.status(200).json(data)
    }
    catch(error)
    {
        res.status(500).json(error)
    }
}

const totalNumberOfDeactivatedUsers = async (req,res)=>{
    try{
        const data = await queries.totalNumberOfDeactivatedUsers()
        res.status(200).json(data)
    }
    catch(error)
    {
        res.status(500).json(error)
    }
}

const totalNumberOfBannedUsers = async (req,res)=>{
    try{
        const data = await queries.totalNumberOfBannedUsers()
        res.status(200).json(data)
    }
    catch(error)
    {
        res.status(500).json(error)
    }
}

module.exports = {totalNumberOfUsers,totalNumberOfActiveUsers,totalNumberOfDeactivatedUsers,totalNumberOfBannedUsers}