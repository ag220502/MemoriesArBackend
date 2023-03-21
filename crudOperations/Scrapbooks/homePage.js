const pool = require("../../connect.js");

const db = {};


db.getAllScrapbooks = (id) => {
  return new Promise((resolve, reject) => {
    const query = 
    pool.query(query, [id, id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = db;
