const pool = require("../../connect.js");

const db = {};

db.getScrapbookById = async (scrapId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbooks` WHERE scrapId=?", [scrapId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.getAllUserScrapbooks = async (userId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM `scrapbooks` WHERE userId=? ORDER BY uploadedTime DESC", [userId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.getAllTemplates = async () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT `templateName`, `templateId` FROM `scrapbook_template`", (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);

        });
    });
};

db.getScrapbookName = async (scrapId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT `name` FROM `scrapbooks` WHERE scrapId=?", [scrapId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.getScrapbookPics = async (scrapId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT `link`, `photoText`, `picSlot`, `pageId` FROM `scrapbook_images` WHERE scrapId=?", [scrapId], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

db.getScrapbookPages = async (scrapId) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT `templateId`, `pageNumber`, `caption` FROM `scrapbook_pages` WHERE scrapId=? ORDER BY `pageNumber` ASC", [scrapId], (err, result) => {
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

// userId,name,uploadTime,contentType,templateId,coverPic are required fields
// lattitude and longitude are optional fields

db.createScrapbook = async (userId, name, caption, lattitude, longitude, uploadTime, contentType, coverPic, templateId) => {
    return new Promise((resolve, reject) => {
        if(!userId || !name || !uploadTime || !contentType || !templateId || !coverPic) {
            return reject("userId, name, uploadTime, contentType, templateId, coverPic are required");
        }
        if( lattitude && longitude ) {
            pool.query("INSERT INTO `scrapbooks` (`userId`, `name`, `caption`, `lattitude`, `longitude`, `uploadTime`, `contentType`, `coverPic`, `templateId`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [userId, name, caption, lattitude, longitude, uploadTime, contentType, coverPic, templateId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        } else {
            pool.query("INSERT INTO `scrapbooks` (`userId`, `name`, `caption`, `uploadTime`, `contentType`, `coverPic`, `templateId`) VALUES (?, ?, ?, ?, ?, ?, ?)", [userId, name, caption, uploadTime, contentType, coverPic, templateId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        }
    });
};

db.updateScrapbook = async (scrapId, name, caption, lattitude, longitude, editTime, contentType, coverPic) => {
    return new Promise((resolve, reject) => {
        if(!scrapID) {
            return reject("scrapId is required");
        }
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
        if( name ) {
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
        if( caption ) {
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
        if(contentType) {
            pool.query("UPDATE `scrapbooks` SET `contentType`=? WHERE `scrapId`=?", [contentType, scrapId], (err, result) => {
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
        if(coverPic) {
            pool.query("UPDATE `scrapbooks` SET `coverPic`=? WHERE `scrapId`=?", [coverPic, scrapId], (err, result) => {
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
        
module.exports = db;