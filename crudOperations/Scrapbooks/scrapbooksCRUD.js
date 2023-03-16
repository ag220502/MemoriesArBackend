const pool = require("../../connect.js");

const db = {};

db.createScrapbook = async (userId, name, caption, lattitude, longitude, uploadTime, contentFlag, coverPhoto, templateId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbooks` WHERE `name` = ? AND `userId` = ?", [name, userId], (err, result) => {
            if (err) {
                return reject(err);
            }
            else if(result.length) {
                return reject("Scrapbook with this name already exists");
            }
            else{
                if( lattitude && longitude ) {
                    pool.query("INSERT INTO `scrapbooks` (`userId`, `name`, `caption`, `lattitude`, `longitude`, `uploadTime`, `contentFlag`, `coverPhoto`, `templateId`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [userId, name, caption, lattitude, longitude, uploadTime, contentFlag, coverPhoto, templateId], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(result);
                    });
                } else {
                    pool.query("INSERT INTO `scrapbooks` (`userId`, `name`, `caption`, `uploadTime`, `contentFlag`, `coverPhoto`, `templateId`) VALUES (?, ?, ?, ?, ?, ?, ?)", [userId, name, caption, uploadTime, contentFlag, coverPhoto, templateId], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(result);
                    });
                }
            }
        });
        
    });
};

db.updateScrapbook = async (scrapId, name, caption, lattitude, longitude, editTime, contentFlag, coverPhoto) => {
    return new Promise((resolve, reject) => {
        if( lattitude && longitude ) {
            pool.query("UPDATE `scrapbooks` SET `lattitude`=?, `longitude`=? WHERE `scrapId`=?", [lattitude, longitude, scrapId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                if(result.affectedRows) {
                    pool.query("UPDATE `scrapbook_images` SET `editTime`=? WHERE `scrapId`=?", [editTime, scrapId], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(result);
                    });
                }
                return resolve(result);
            });
        }
        else if( name ) {
            pool.query("UPDATE `scrapbooks` SET `name`=? WHERE `scrapId`=?", [name, scrapId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                if(result.affectedRows) {
                    pool.query("UPDATE `scrapbook_images` SET `editTime`=? WHERE `scrapId`=?", [editTime, scrapId], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(result);
                    });
                }
                return resolve(result);
            });
        }
        else if( caption ) {
            pool.query("UPDATE `scrapbooks` SET `caption`=? WHERE `scrapId`=?", [caption, scrapId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                if(result.affectedRows) {
                    pool.query("UPDATE `scrapbook_images` SET `editTime`=? WHERE `scrapId`=?", [editTime, scrapId], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(result);
                    });
                }
                return resolve(result);
            });
        }
        else if(contentType) {
            pool.query("UPDATE `scrapbooks` SET `contentFlag`=? WHERE `scrapId`=?", [contentFlag, scrapId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                if(result.affectedRows) {
                    pool.query("UPDATE `scrapbook_images` SET `editTime`=? WHERE `scrapId`=?", [editTime, scrapId], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(result);
                    });
                }
                return resolve(result);
            });
        }
        else if(coverPhoto) {
            pool.query("UPDATE `scrapbooks` SET `coverPhoto`=? WHERE `scrapId`=?", [coverPhoto, scrapId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                if(result.affectedRows) {
                    pool.query("UPDATE `scrapbook_images` SET `editTime`=? WHERE `scrapId`=?", [editTime, scrapId], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(result);
                    });
                }
                return resolve(result);
            });
        }
    });
};

db.getScrapbook = async (scrapId) => {
    return new Promise((resolve, reject) => {
        if(!scrapId) {
            return reject("scrapId is required");
        }
        pool.query("SELECT * FROM `scrapbooks` WHERE `scrapId`=?", [scrapId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.getAllUserScrapbooks = async (userId) => {
    return new Promise((resolve, reject) => {
        if(!userId) {
            return reject("userId is required");
        }
        pool.query("SELECT * FROM `scrapbooks` WHERE `userId`=? ORDER BY uploadTime ASC", [userId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.deleteScrapbookById = async (scrapId) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE t1 FROM `scrapbooks` AS t1 INNER JOIN `scrapbook_images` AS t2 ON t1.scrapId = t2.scrapId WHERE t1.scrapId=?", [scrapId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.deleteAllUserScrapbooks = async (userId) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE t1 FROM `scrapbooks` AS t1 INNER JOIN `scrapbook_images` AS t2 ON t1.scrapId = t2.scrapId WHERE userId=?", [userId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};


module.exports = db;