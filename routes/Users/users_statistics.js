const router = require('express').Router();
const func = require('../../controllers/Users/users_statistics.js');

router.get('/totalNumberOfUsers', func.totalNumberOfUsers);
router.get('/totalNumberOfActiveUsers', func.totalNumberOfActiveUsers);
router.get('/totalNumberOfDeactivatedUsers', func.totalNumberOfDeactivatedUsers);
router.get('/totalNumberOfBannedUsers', func.totalNumberOfBannedUsers);

module.exports = router;