const queries = require("../../crudOperations/Scrapbooks/images.js");

const addImage = async (req, res) => {
    try {
        const { scrapId, link, photoText, textHeading } = req.body;
        const result = await queries.AddImage(scrapId, link, photoText, textHeading);
        res.status(200).json({
            status: "success",
            message: "Image added",
            body: {
                image: result
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error adding image",
            body: {
                error: error
            }
        });
    }
};

const getImage = async (req, res) => {
    try {
        const { pictureId } = req.params;
        const result = await queries.GetImage(pictureId);
        res.status(200).json({
            status: "success",
            message: "Image retrieved",
            body: {
                image: result
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error retrieving image",
            body: {
                error: error
            }
        });
    }
};

const getImageByScrapId = async (req, res) => {
    try {
        const { scrapId } = req.params;
        const result = await queries.GetImageByScrapId(scrapId);
        res.status(200).json({
            status: "success",
            message: "Image retrieved",
            body: {
                image: result
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error retrieving image",
            body: {
                error: error
            }
        });
    }
};

const updateImage = async (req, res) => {
    try {
        const { pictureId } = req.params;
        const { link, photoText, textHeading } = req.body;
        const result = await queries.UpdateImage(pictureId, link, photoText, textHeading);
        res.status(200).json({
            status: "success",
            message: "Image updated",
            body: {
                image: result
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error updating image",
            body: {
                error: error
            }
        });
    }
};

const deleteImage = async (req, res) => {
    try {
        const { pictureId } = req.params;
        const result = await queries.DeleteImage(pictureId);
        res.status(200).json({
            status: "success",
            message: "Image deleted",
            body: {
                image: result
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error deleting image",
            body: {
                error: error
            }
        });
    }
};

const deleteAllScrapImages = async (req, res) => {
    try {
        const { scrapId } = req.params;
        const result = await queries.deleteAllScrapImages(scrapId);
        res.status(200).json({
            status: "success",
            message: "Images deleted",
            body: {
                image: result
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error deleting images",
            body: {
                error: error
            }
        });
    }
};

module.exports = {addImage, getImage, getImageByScrapId, updateImage, deleteImage, deleteAllScrapImages}