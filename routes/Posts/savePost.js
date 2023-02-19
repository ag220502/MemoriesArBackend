const router = require('express').Router();
const func = require('../../controllers/Posts/savePost.js');
const { savePost, unsavePost } = func

router.patch('/save', savePost)
router.delete('/unsave', unsavePost)

//get Profile Page
router.get('/usersSavedPosts', func.getSavedPosts);

module.exports = router;
