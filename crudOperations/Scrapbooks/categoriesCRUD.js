const pool = require("../../connect.js");

const db = {};

db.createCategory = async (categoryName) => {
    return new Promise((resolve, reject) => {
        if(!categoryName) {
            return reject("categoryName is required");
        }
        pool.query("INSERT INTO `categories` (`categoryName`) VALUES (?)", [categoryName], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.getCategory = async (categoryId) => {
    return new Promise((resolve, reject) => {
        if(!categoryId) {
            return reject("categoryId is required");
        }
        pool.query("SELECT categoryName FROM `categories` WHERE `categoryId`=?", [categoryId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.getCategoryId = async (categoryName) => {
    return new Promise((resolve, reject) => {
        if(!categoryName) {
            return reject("categoryName is required");
        }
        pool.query("SELECT categoryId FROM `categories` WHERE `categoryName`=?", [categoryName], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.updateCategory = async (categoryName, categoryId) => {
    return new Promise((resolve, reject) => {
        if(!categoryName || !categoryId) {
            return reject("categoryName and categoryId are required");
        }
        pool.query("UPDATE `categories` SET `categoryName`=? WHERE `categoryId`=?", [categoryName, categoryId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.deleteCategory = async (categoryId) => {
    return new Promise((resolve, reject) => {
        if(!categoryId) {
            return reject("categoryId is required");
        }
        pool.query("DELETE FROM `categories` WHERE `categoryId`=?", [categoryId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

module.exports = db;