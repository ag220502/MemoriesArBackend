const queries = require("../../crudOperations/Scrapbooks/scrapbooksCRUD.js");

const createScrapbook = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, caption, lattitude, longitude, uploadTime, contentFlag, coverPhoto, templateId } = req.body;
        if(!userId || !name || !uploadTime || !contentFlag || !templateId ) {
            return res.status(400).json({
                status: "error",
                message: "userId, name, uploadTime, contentType, templateId are required",
                body : {
                    userId : userId,
                    name : name,
                    uploadTime : uploadTime,
                    contentFlag : contentFlag,
                    templateId : templateId,
                }
            });
        }
        const newScrapbook = await queries.createScrapbook(userId, name, caption, lattitude, longitude, uploadTime, contentFlag, coverPhoto, templateId);
        res.status(200).json({
            status: "success",
            message: "Scrapbook created successfully",
            body: {
                scrapbook: newScrapbook
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Error creating new scrapbook",
            body: {
                error: err
            }
        });
    }
};

const updateScrapbook = async (req, res) => {
    try {
        const { scrapId } = req.params;
        const { name, caption, lattitude, longitude, editTime, contentFlag, coverPhoto } = req.body;
        if(!scrapId) {
            return res.status(400).json({
                status: "error",
                message: "scrapId is required",
                body : {
                    scrapId : scrapId
                }
            });
        }
        const updatedScrapbook = await queries.updateScrapbook(scrapId, name, caption, lattitude, longitude, editTime, contentFlag, coverPhoto);
        res.status(200).json({
            status: "success",
            message: "Scrapbook updated successfully",
            body: {
                scrapbook: updatedScrapbook
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Error updating scrapbook",
            body: {
                error: err
            }
        });
    }
};

const getScrapbook = async (req, res) => {
    try {
        const { scrapId } = req.params;
        if(!scrapId) {
            return res.status(400).json({
                status: "error",
                message: "scrapId is required",
                body : {
                    scrapId : scrapId
                }
            });
        }
        const scrapbook = await queries.getScrapbook(scrapId);
        res.status(200).json({
            status: "success",
            message: "Scrapbook fetched successfully",
            body: {
                scrapbook: scrapbook
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Error fetching scrapbook",
            body: {
                error: err
            }
        });
    }
};

const getAllUserScrapbooks = async (req, res) => {
    try {
        const { userId } = req.params;
        if(!userId) {
            return res.status(400).json({
                status: "error",
                message: "userId is required",
                body : {
                    userId : userId
                }
            });
        }
        const scrapbooks = await queries.getAllUserScrapbooks(userId);
        res.status(200).json({
            status: "success",
            message: "Scrapbooks fetched successfully",
            body: {
                scrapbooks: scrapbooks
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Error fetching scrapbooks",
            body: {
                error: err
            }
        });
    }
};

const deleteScrapbook = async (req, res) => {
    try {
        const { scrapId } = req.params;
        if(!scrapId) {
            return res.status(400).json({
                status: "error",
                message: "scrapId is required",
                body : {
                    scrapId : scrapId
                }
            });
        }
        const deletedScrapbook = await queries.deleteScrapbookById(scrapId);
        res.status(200).json({
            status: "success",
            message: "Scrapbook deleted successfully",
            body: {
                scrapbook: deletedScrapbook
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Error deleting scrapbook",
            body: {
                error: err
            }
        });
    }
};

const deleteAllUserScrapbooks = async (req, res) => {
    try {
        const { userId } = req.params;
        if(!userId) {
            return res.status(400).json({
                status: "error",
                message: "userId is required",
                body : {
                    userId : userId
                }
            });
        }
        const deletedScrapbooks = await queries.deleteAllUserScrapbooks(userId);
        res.status(200).json({
            status: "success",
            message: "Scrapbooks deleted successfully",
            body: {
                scrapbooks: deletedScrapbooks
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Error deleting scrapbooks",
            body: {
                error: err
            }
        });
    }
};

module.exports = {createScrapbook, updateScrapbook, getScrapbook, getAllUserScrapbooks, deleteScrapbook, deleteAllUserScrapbooks}