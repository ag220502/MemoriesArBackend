const router = require('express').Router();
const func = require('../../controllers/Users/users');

router.get('/allUsers', func.allUsers);

module.exports = router;