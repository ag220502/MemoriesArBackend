const pool = require("../../connect.js");

const db = {};


db.addThemes = (array) => {
    return new Promise((resolve, reject) => {
        const themeQuery =
      `INSERT INTO account_themes (darkClr, textDarkClr, lightClr, textLightClr, midClr, textMidClr) VALUES (?,?,?,?,?,?);`; 
        pool.query(themeQuery, array, (err, result) => {
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


