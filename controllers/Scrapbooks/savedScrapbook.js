const queries = require("../../crudOperations/Scrapbooks/savedScrapbooks.js");

const saveScrapbook = async (req, res) => {
    try {
        // get the data from the request body
        const { userId, scrapId} = req.body;
        // save the scrapbook
        const savedScrapbook = await queries.SaveScrapbook(userId, scrapId);
        // return a response with the saved scrapbook
        res.status(200).json({
            status: "success",
            message: "Scrapbook saved successfully",
            data: savedScrapbook,
        });
    } catch (err) {
        // return a response with the error
        res.status(500).json({
            status: "error",
            message: "Error saving scrapbook",
            data: err.message,
        });
    }
};

const getSavedScrapbooks = async (req, res) => {
    try {
        // get the data from the request body
        const { userId } = req.body;
        // get the saved scrapbooks
        const savedScrapbooks = await queries.GetSavedScrapbooks(userId);
        // return a response with the saved scrapbooks
        res.status(200).json({
            status: "success",
            message: "Saved scrapbooks retrieved successfully",
            data: savedScrapbooks,
        });
    } catch (err) {
        // return a response with the error
        res.status(500).json({
            status: "error",
            message: "Error retrieving saved scrapbooks",
            data: err.message,
        });
    }
};

const deleteSavedScrapbook = async (req, res) => {
    try {
        // get the data from the request body
        const { userId, scrapId } = req.body;
        // delete the saved scrapbook
        const deletedScrapbook = await queries.DeleteSavedScrapbook(userId, scrapId);
        // return a response with the deleted scrapbook
        res.status(200).json({
            status: "success",
            message: "Saved scrapbook deleted successfully",
            data: deletedScrapbook,
        });
    } catch (err) {
        // return a response with the error
        res.status(500).json({
            status: "error",
            message: "Error deleting saved scrapbook",
            data: err.message,
        });
    }
};

module.exports = { saveScrapbook, getSavedScrapbooks, deleteSavedScrapbook}