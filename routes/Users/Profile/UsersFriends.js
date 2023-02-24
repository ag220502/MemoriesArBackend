const router = require('express').Router();
const getUserFriends = require('../../../controllers/Users/Profile/UsersFriends.js');

//get Profile Page
router.get('/friends', getUserFriends);    

module.exports = router;