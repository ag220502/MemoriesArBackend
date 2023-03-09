const router = require('express').Router();
const func = require('../../controllers/Scrapbooks/userScrapbook.js');

router.get('/getScrapbookById', func.getScrapbookById);
router.get('/getAllUserScrapbooks', func.getAllUserScrapbooks);
router.get('/getAllTemplates', func.getAllTemplates);
router.get('/getScrapbookPics', func.getScrapbookPics);
router.get('/getScrapbookPages', func.getScrapbookPages);
router.delete('/deleteScrapbookById', func.deleteScrapbookById);
router.delete('/deleteAllUserScrapbooks', func.deleteAllUserScrapbooks);

module.exports = router;