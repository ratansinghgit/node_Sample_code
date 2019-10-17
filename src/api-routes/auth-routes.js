// Filename: api-routes.js
let router = require('express').Router();
// Import contact controller
var AuthController = require('../controllers/authController');
var middleware = require('../middlewares/authusers.middleware');

// Contact routes
router.route('/login').post(AuthController.Login);
router.route('/getotpCode').post(AuthController.GetOtpCode);
router.route('/createUser').post(AuthController.CreateUser);
router.route('/createcollege').post(AuthController.CreateCollege);
router.route('/searchcollege').post(AuthController.SeacrhCollege);
router.route('/updatecollege/:Id').put(AuthController.UpdateCollege);
router.route('/getcollege').get(AuthController.GetDataCollege);
router.route('/updateuser/:Id').put(AuthController.UpdateUser);
router.route('/user/me').post(middleware.requireAccessKey, middleware.authByEmail, AuthController.FindUser);
router.route('/verifyotp').post(middleware.getTokenDetails, AuthController.VerifyOpt);
router.route('/logoutuser').post(AuthController.LogoutUser);
router.route('/getdashboardData').post(middleware.getTokenDetails, AuthController.GetDashboardData);
router.route('/forgetpassword').post(AuthController.SendMailforForgetPassword);
router.route('/getSubAdminToken/:Id').get(middleware.getSubAdminTokenDetails, AuthController.GetSubAdminToken);
router.route('/createRoles').post(middleware.getTokenDetails, AuthController.CreateRoles);

// Export API routes
module.exports = router;