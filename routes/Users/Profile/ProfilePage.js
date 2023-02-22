const router = require('express').Router();
const func = require('../../../controllers/Users/Profile/ProfilePage.js');


//get Profile Page
router.get('/profile/:id', func.getUserProfileData);
router.get('/profile/friendsNum/:id', func.getFriendNumber);
router.get('/profile/postNum/:id', func.getPostNumber);
router.get('/personal', func.getPersonalData);
router.patch('/updateProfile', func.updateProfileData);
router.patch('/updatePersonal', func.updatePersonalData);
router.patch('/deactivate', func.deactivateAccount);    
router.patch('/activate', func.activateAccount);
router.delete('/delete', func.deleteAccount);

module.exports = router;
