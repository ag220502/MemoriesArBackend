const router = require('express').Router();
const getUserProfile = require('../../../controllers/Users/Profile/ProfilePage.js');

//get Profile Page
router.get('/profile', getUserProfile);    

module.exports = router;