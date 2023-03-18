const router = require('express').Router();
const comments = require('../../controllers/Scrapbooks/comments.js');
const likes = require('../../controllers/Scrapbooks/likes.js');
const dislikes = require('../../controllers/Scrapbooks/dislikes.js');

//comment routes
router.post('/addComment', comments.addComment);
router.delete('/deleteComment', comments.deleteComment);
router.get('/getComments', comments.getAllComments);

// like routes
router.post('/addLike', likes.addLike);
router.get('/getScrapLikes', likes.getAllScrapLikes);
router.get('/getUserLikes', likes.getAllUserLikes);
router.delete('/unLike', likes.unLike);

// dislike routes
router.post('/addDislike', dislikes.addDislike);
router.get('/getScrapDislikes', dislikes.getAllScrapDislikes);
router.get('/getUserDislikes', dislikes.getAllUserDislikes);
router.delete('/unDislike', dislikes.unDislike);

module.exports = router;