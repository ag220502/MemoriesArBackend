//Routes for save post and unsavve post
const router = require('express').Router();
const func = require('../../controllers/Posts/savePost.js');


//get Profile Page
router.get('/usersSavedPosts', func.getSavedPosts);


module.exports = router;

