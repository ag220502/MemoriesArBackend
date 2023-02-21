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

const numberOfReportedUsers = async (req,res)=>{
    try{
        const data = await queries.numberOfReportedUsers()
        res.status(200).json(data)
    }
    catch(error)
    {
        res.status(500).json(error)
    }
}

const numberOfReportedPosts = async (req,res)=>{
    try{
        const data = await queries.numberOfReportedPosts()
        res.status(200).json(data)
    }
    catch(error)
    {
        res.status(500).json(error)
    }
}

const numberOfUserFriends = async (req,res)=>{
    id = req.body.id
    try{
        const data = await queries.numberOfUserFriends(id)
        res.status(200).json(data)
    }   
    catch(error)
    {
        res.status(500).json(error)
    }
}

const numberOfUserPosts = async (req,res)=>{
    id = req.body.id
    try{
        const data = await queries.numberOfUserPosts(id)
        res.status(200).json(data)
    }
    catch(error)
    {
        res.status(500).json(error)
    }
}

module.exports = {totalNumberOfUsers,totalNumberOfActiveUsers,totalNumberOfDeactivatedUsers,totalNumberOfBannedUsers,numberOfReportedUsers, numberOfReportedPosts, numberOfUserFriends, numberOfUserPosts}