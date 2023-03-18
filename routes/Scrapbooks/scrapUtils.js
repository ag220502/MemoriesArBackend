const router = require('express').Router();
const comments = require('../../controllers/Scrapbooks/comments.js');

//comment routes
router.post('/addComment', comments.addComment);
router.delete('/deleteComment', comments.deleteComment);
router.get('/getComments', comments.getAllComments);

module.exports = router;