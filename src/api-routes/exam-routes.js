let router = require('express').Router();
// Import contact controller
var examController = require('../controllers/examController');
router.route('/createexam').post(examController.CreateExam);
router.route('/getexam').get(examController.GetAllExam);

module.exports = router;
