const pool = require("../../connect.js");

const db = {};


db.addThemes = (query) => {
    return new Promise((resolve, reject) => {
        pool.query(query, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

db.getThemes = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `account_themes`", (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

module.exports = db;


