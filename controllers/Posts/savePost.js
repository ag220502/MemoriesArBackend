const queries = require("../../crudOperations/Posts/savePost.js")

const getSavedPosts = async (req, res) => {
    const id  = req.body.id;
    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }
    try{
        const result = await queries.getUsersSavedPosts(id)
        if(result)
        {
            return res.status(200).json(result)
        }
    }
    catch(err){
        return res.status(400).json(err)
    }

}

module.exports = {getSavedPosts}