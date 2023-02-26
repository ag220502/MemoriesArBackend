const pool = require("../../connect.js");

const db = {};

// add member to group
db.addMember = (userId, groupId) => {
  return new Promise((resolve, reject) => {
    const addMemberQuery =
      "INSERT INTO `groups_people` (`userId`, `groupId`) VALUES (?, ?)";
    pool.query(addMemberQuery, [userId, groupId], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// add member as admin to group
db.addAdmin = (userId, groupId) => {
  return new Promise((resolve, reject) => {
    const addAdminQuery =
      "INSERT INTO `groups_people` (`userId`, `groupId`, `role`) VALUES (?, ?, ?)";
    pool.query(addAdminQuery, [userId, groupId, "admin"], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// remove member from group
db.removeMember = (userId, groupId, removedUserId) => {
  return new Promise((resolve, reject) => {
    const removeMemberQuery =
      "DELETE FROM `groups_people` WHERE `userId` = ? AND `groupId` = ?";
    pool.query(removeMemberQuery, [removedUserId, groupId], (err, results) => {
      if (err) {
        return reject(err);
      }
      // add member to past participants table
      const addPastParticipantQuery =
        "INSERT INTO `removed_group_users` (`userId`, `groupId`,`removedUserId`) VALUES (?, ?, ?)";
      pool.query(addPastParticipantQuery, [userId, groupId, removedUserId], (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  });
};

// check if member is an admin
db.isAdmin = (userId, groupId) => {
  return new Promise((resolve, reject) => {
    const isAdminQuery =
      "SELECT * FROM `groups_people` WHERE `userId` = ? AND `groupId` = ? AND `role` IS NOT NULL";
    pool.query(isAdminQuery, [userId, groupId], (err, results) => {
      if (err) {
        return reject(err);
      } else if (results.length) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  });
};

// make member an admin
db.makeAdmin = (userId, groupId) => {
  return new Promise((resolve, reject) => {
    const makeAdminQuery =
      "UPDATE `groups_people` SET `role` = 'admin' WHERE `userId` = ? AND `groupId` = ?";
    pool.query(makeAdminQuery, [userId, groupId], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// check if member is in group
db.isMember = (userId, groupId) => {
  return new Promise((resolve, reject) => {
    const isMemberQuery =
      "SELECT * FROM `groups_people` WHERE `userId` = ? AND `groupId` = ?";
    pool.query(isMemberQuery, [userId, groupId], (err, results) => {
      if (err) {
        return reject(err);
      } else if (results.length) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  });
};

// remove admin status from member
db.removeAdmin = (userId, groupId) => {
  return new Promise((resolve, reject) => {
    const removeAdminQuery =
      "UPDATE `groups_people` SET `role` = NULL WHERE `userId` = ? AND `groupId` = ?";
    pool.query(removeAdminQuery, [userId, groupId], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// get all members of a group
db.getMembers = (groupId) => {
  return new Promise((resolve, reject) => {
    const getMembersQuery = "SELECT * FROM `groups_people` WHERE `groupId` = ?";
    pool.query(getMembersQuery, [groupId], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// check if total number of members in a group is less than 5
db.isGroupFull = (groupId) => {
  return new Promise((resolve, reject) => {
    const isGroupFullQuery =
      "SELECT * FROM `groups_people` WHERE `groupId` = ?";
    pool.query(isGroupFullQuery, [groupId], (err, results) => {
      if (err) {
        return reject(err);
      } else if (results.length < 225) {
        return resolve(false);
      } else {
        return resolve(true);
      }
    });
  });
};

// check if admin is in a group
db.isAdminInGroup = (userId, groupId) => {
  return new Promise((resolve, reject) => {
    const isAdminInGroupQuery =
      "SELECT * FROM `groups_people` WHERE `userId` != ? AND `groupId` = ? AND `role` IS NOT NULL";
    pool.query(isAdminInGroupQuery, [userId, groupId], (err, results) => {
      if (err) {
        return reject(err);
      } else if (results.length) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  });
};

module.exports = db;
