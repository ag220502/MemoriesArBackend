const router = require('express').Router();
const comments = require('../../controllers/Scrapbooks/comments.js');
const likes = require('../../controllers/Scrapbooks/likes.js');

//comment routes
router.post('/addComment', comments.addComment);
router.delete('/deleteComment', comments.deleteComment);
router.get('/getComments', comments.getAllComments);

// like routes
router.post('/addLike', likes.addLike);
router.get('/getScrapLikes', likes.getAllScrapLikes);
router.get('/getUserLikes', likes.getAllUserLikes);
router.delete('/unLike', likes.unLike);

module.exports = router;