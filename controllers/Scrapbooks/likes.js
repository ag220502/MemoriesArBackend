const queries = require("../../crudOperations/Scrapbooks/likes.js");
const disQueries = require("../../crudOperations/Scrapbooks/dislikes.js");

const addLike = async (req, res) => {
    try {
        const { scrapId, userId, time } = req.body;
        if(disQueries.checkDislike(scrapId, userId)){
            disQueries.unDislike(scrapId, userId);
        }
        const result = await queries.addLike(scrapId, userId, time);
        res.status(200).json({
            status: "success",
            message: "Like added",
            body: {
                like: result
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error adding like",
            body: {
                error: error
            }
        });
    }
};

const getAllScrapLikes = async (req, res) => {
    try {
        const { scrapId } = req.body;
        const result = await queries.getAllScrapLikes(scrapId);
        res.status(200).json({
            status: "success",
            message: "Scrapbook Likes fetched",
            body: {
                likes: result
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching likes",
            body: {
                error: error
            }
        });
    }
};

const getAllUserLikes = async (req, res) => {
    try {
        const { userId } = req.body;
        const result = await queries.getAllUserLikes(userId);
        res.status(200).json({
            status: "success",
            message: "User Likes fetched",
            body: {
                likes: result
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching likes",
            body: {
                error: error
            }
        });
    }
};

const unLike = async (req, res) => {
    try {
        const { scrapId, userId } = req.body;
        if((queries.checkLike(scrapId, userId))){
            return res.status(500).json({
                status: "error",
                message: "Error removing like",
                body: {
                    error: "User has not liked this scrapbook"
                }
            });
        }
        else{
            const result = await queries.unLike(scrapId, userId);
            res.status(200).json({
                status: "success",
                message: "Like removed",
                body: {
                    like: result
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error removing like",
            body: {
                error: error
            }
        });
    }
};

module.exports = {addLike, getAllScrapLikes, getAllUserLikes, unLike}