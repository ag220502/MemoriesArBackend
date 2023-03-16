const queries = require("../../crudOperations/Scrapbooks/TemplateCRUD.js");

const createScrapbook = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, caption, lattitude, longitude, uploadTime, contentType, coverPic, templateId } = req.body;
        if(!userId || !name || !uploadTime || !contentType || !templateId ) {
            return res.status(400).json({
                status: "error",
                message: "userId, name, uploadTime, contentType, templateId are required",
                body : {
                    userId : userId,
                    name : name,
                    uploadTime : uploadTime,
                    contentType : contentType,
                    templateId : templateId,
                }
            });
        }
        const newScrapbook = await queries.createScrapbook(userId, name, caption, lattitude, longitude, uploadTime, contentType, coverPic, templateId);
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
        const { name, caption, lattitude, longitude, editTime, contentType, coverPic } = req.body;
        if(!scrapId) {
            return res.status(400).json({
                status: "error",
                message: "scrapId is required",
                body : {
                    scrapId : scrapId
                }
            });
        }
        const updatedScrapbook = await queries.updateScrapbook(scrapId, name, caption, lattitude, longitude, editTime, contentType, coverPic);
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

module.exports = {createScrapbook, updateScrapbook,  }