const router = require('express').Router();
const getUserProfile = require('../../../controllers/Users/Profile/ProfilePageController.js');

//get Profile Page
router.get('/profile', getUserProfile);     // TODO : check is just / profile is enough or not

module.exports = router;