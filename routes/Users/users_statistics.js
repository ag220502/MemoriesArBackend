const router = require('express').Router();
const func = require('../../controllers/Users/users_statistics.js');

router.get('/totalNumberOfUsers', func.totalNumberOfUsers);
router.get('/totalNumberOfActiveUsers', func.totalNumberOfActiveUsers);
router.get('/totalNumberOfDeactivatedUsers', func.totalNumberOfDeactivatedUsers);
router.get('/totalNumberOfBannedUsers', func.totalNumberOfBannedUsers);
router.get('/numberOfReportedUsers', func.numberOfReportedUsers);
router.get('/numberOfReportedPosts', func.numberOfReportedPosts);
router.get('/numberOfUserFriends', func.numberOfUserFriends);

module.exports = router;