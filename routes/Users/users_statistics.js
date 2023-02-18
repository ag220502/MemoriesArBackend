const router = require('express').Router();
const func = require('../../controllers/Users/users_statistics.js');

router.get('/totalNumberOfUsers', func.totalNumberOfUsers);

module.exports = router;