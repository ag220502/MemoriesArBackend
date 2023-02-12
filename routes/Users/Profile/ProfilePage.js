const router = require('express').Router();
const func = require('../../../controllers/Users/Profile/ProfilePage.js');


//get Profile Page
router.get('/profile', func.getUserProfileData);
router.put('/deactivate', func.deactivateAccount);    
router.put('/activate', func.activateAccount);
router.delete('/delete', func.deleteAccount);

module.exports = router;
