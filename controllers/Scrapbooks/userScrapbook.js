const queries = require("../../crudOperations/Scrapbooks/userScrapbook.js");

const getScrapbookById = async (req, res) => {
    try {
        const scrapId = req.body.scrapId;
        const scrapbook = await queries.getScrapbookById(scrapId);
        res.status(200).json(scrapbook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUserScrapbooks = async (req, res) => {
    try {
        const userId = req.body.userId;
        const scrapbooks = await queries.getAllUserScrapbooks(userId);
        res.status(200).json(scrapbooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllTemplates = async (req, res) => {
    try {
        const templates = await queries.getAllTemplates();
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getScrapbookName = async (req, res) => {
    try {
        const scrapId = req.body.scrapId;
        const scrapbookName = await queries.getScrapbookName(scrapId);
        res.status(200).json(scrapbookName);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getScrapbookPics = async (req, res) => {
    try {
        const scrapId = req.body.scrapId;
        const scrapbookPics = await queries.getScrapbookPics(scrapId);
        res.status(200).json(scrapbookPics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

const getScrapbookPages = async (req, res) => {
    try {
        const scrapId = req.body.scrapId;
        const scrapbookPages = await queries.getScrapbookPages(scrapId);
        res.status(200).json(scrapbookPages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteScrapbookById = async (req, res) => {
    const scrapId = req.body.scrapId;
    if(!scrapId) {
        return res.status(400).json({ error: "scrapId is required" });
    }
    try {
        const result = await queries.deleteScrapbookById(scrapId);
        if(result.affectedRows) {
            return res.status(200).json("Scrapbook Deleted");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAllUserScrapbooks = async (req, res) => {
    const userId = req.body.userId;
    if(!userId) {
        return res.status(400).json({ error: "userId is required" });
    }
    try {

        const result = await queries.deleteAllUserScrapbooks(userId);
        if(result.affectedRows) {
            return res.status(200).json("All User Scrapbooks Deleted");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {getScrapbookById, getAllUserScrapbooks,
                getAllTemplates,
                deleteScrapbookById, getScrapbookName,
                deleteAllUserScrapbooks, getScrapbookPics,
                getScrapbookPages}