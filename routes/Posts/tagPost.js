const router = require('express').Router();
const { tagUser, untagUser } = require('../../controllers/Posts/tagPost.js');

router.patch('/tag', tagUser)
router.delete('/untag', untagUser)

module.exports = router;

//changes made