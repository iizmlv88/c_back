const Router = require('express');
const router = new Router();
const controller = require('./authController');

router.post('/createCandidate', controller.createCandidate);
module.exports = router;