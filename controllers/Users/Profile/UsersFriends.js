const queries = require("../../../crudOperations/Users/Profile/UsersFriends.js")

const getFriendsLists = async (req,res)=>{
    const userId = req.params.id
    if(!userId)
    {
        return res.status(400).json("userId is required")
    }
    try{
        const result = await queries.getAllUserFriends(userId)
        if(result)
        {
            return res.status(200).json(result)     // returns the IDs of all friends of the user
        }
    }
    catch(err)
    {
        return res.status(400).json(err)
    }
}   

module.exports = getFriendsLists