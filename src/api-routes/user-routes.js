let router = require('express').Router();
// Import User controller
var userController = require('../controllers/userController');
var middleware = require('../middlewares/authusers.middleware');

// User routes

router.route('/createcourses').post(userController.CreateCourses);
router.route('/courseslist').get(userController.CoursesList);
router.route('/userlist').get(userController.UserList);
router.route('/updatecourses/:Id').put(userController.UpdateCourses);
router.route('/userTypeList').get(userController.getUserTypeList);
router.route('/sendOTP').post(userController.sendOTP);
router.route('/VerifyOTP').post(userController.VerifyOTP);
router.route('/resetPassword').post(userController.resetPassword);
//router.route('/createcountry').post(userController.CreateCountry);


module.exports = router;