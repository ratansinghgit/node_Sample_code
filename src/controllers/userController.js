// Import contact model';
var AuthServices = require('../services/authServices');
var UserServices = require('../services/userServices');
var SendOtp = require('sendotp');
var sendOtp = new SendOtp('271041A3tkxEmFrb5ca730f1');
var bcrypt = require('bcrypt');
var moment = require('moment');
var config = require('../../config');
var fs = require('fs');
var bPromise = require('bluebird');
var errorsControllerHelper = require('../helpers/errors.controller.helper');
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Handle ListUser actions

// get User Profile
exports.GetUserProfile = function (req, res) {
    var whereparams = {
        "_id": req.AuthData._id
    }
    return UserServices.GetProfileData(whereparams).then(function (Data) {
        if(Data){
            res.json({ "Status": 200, "result": Data, "Message": "User profile data." });
        }else{
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "User profile data." });
        }
        
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

exports.UpdatePassword = function (req, res) {
    var updateparams = {
        password: bcrypt.hashSync(req.body.password, 8)
    }
    var params = req.body;
    return UserServices.UpdatePassword(req.AuthData._id, updateparams, params).then(function (Data) {
        if (Data) {
            res.json({ "Status": 200, "Message": "Password updated successfully." });
        } else {
            res.json({ "Status": 500, "Message": "Current password don't match." });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

exports.sendOTP = function (req, res) {
    var Contrycode = "+91";
    var Phonenumber = (req.body.phonenumber) ? req.body.phonenumber : false;
    var otp = Math.floor(1000 + Math.random() * 9000);
    var whereparams = {
        "contactno": req.body.phonenumber
    }
    return UserServices.GetProfileData(whereparams).then(function (Data) {
        if (Data) {
            /*AWS.config.update({
                accessKeyId: 'AKIA2JPZE4BPCRRGOBTU',
                secretAccessKey: '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',
                region: 'us-east-1'
            });*/
            AWS.config.update({
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey,
                region: config.region
            });
            var sns = new AWS.SNS({ "region": "us-west-2" });
            var params = {
                Message: otp.toString(),
                MessageStructure: 'text',
                PhoneNumber: Contrycode.toString() + Phonenumber.toString()
            };
            sns.publish(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack); // an error occurred  
                }
                else {
                    var updateparams = {
                        "lastotprequestdatetime": moment(),
                        "lastotp": otp
                    }
                    return AuthServices.UpdateUser(Data._id, updateparams).then(function (Item) {
                        if (Item) {
                            res.json({ "Status": 200, "result": otp, "Message": "OTP sent to your registered mobile number." });
                        }
                    });
                }
            });
        } else {
            return errorsControllerHelper.returnError({
                Succeeded: false,
                Status: 500,
                Message: 'Please enter registered mobile number.',
                Name: 'Please enter registered mobile number.'
            }, res, 500);
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

exports.VerifyOTP = function (req, res) {
    var whereparams = {
        "contactno": req.body.PhoneNumber,
        "lastotp": req.body.lastotp
    }
    return AuthServices.findUserbyOtp(whereparams).then(function (Data) {
        if (Data) {
            if (moment().format("YYYY-MM-DD HH:mm:ss") >= moment(Data.get("lastotprequestdatetime")).add("m", 15).format("YYYY-MM-DD HH:mm:ss")) {
                return errorsControllerHelper.returnError({
                    Succeeded: false,
                    Status: 500,
                    Message: 'OTP has been expired.',
                    Name: 'OTP has been expired.'
                }, res, 500);
            } else {
                var params = {
                    "userid": Data._id,
                    "mobilenumber": Data.contactno
                }
                return AuthServices.UpdateLoginLogData(params).then(function (Data) {
                    res.json({ "Status": 200, "result": { "userId": Data.get("_id") }, "Message": "successful" });
                })

            }
        } else {
            res.json({
                Status: 500,
                succeed: false,
                message: "Wrong Otp."
            })
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

exports.resetPassword = function (req, res) {
    var updateparams = {
        password: bcrypt.hashSync(req.body.password, 8),
        userId: (req.body.userId) ? req.body.userId : false
    }
    if (updateparams.userId) {
        return UserServices.ResetPassword(updateparams.userId, updateparams).then(function (Data) {
            res.json({ "Status": 200, "result": Data, "Message": "Password updated successfully." });
        }).catch(function (error) {
            res.status(500).json({
                Status: 500,
                succeed: false,
                message: "Something went wrong.",
                errorsdata: error
            })
        });
    } else {
        res.json({
            Status: 500,
            succeed: false,
            message: "Please send required parameter."
        })
    }
}

exports.getUserTypeList = function (req, res) {
    return UserServices.GetUsersTypesData().then(function (Item) {
        res.json({ "Status": 200, "Data": Item, "Message": "User Type List." });
    }).catch(function (error) {
        res.status(500).json({
            code: 500,
            succeed: false,
            message: "Something went wrong.",
            errorsdata: error
        })
    });
}

exports.UserDetailList = function (req, res) {
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }
    return UserServices.GetUserDetails(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Data": Item, "Message": "User Details List." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}


/*****************controller for Create Courses */
exports.CreateCourses = function(req, res){
    var courseparams = req.body;
    return UserServices.CreateCourse(courseparams).then(function (Data) {
        res.json({ "Status": 200, "result": Data, "Message": "Course created successfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for update courses */
exports.UpdateCourses = function(req, res){
    var userwhereparams = req.params.Id;
    var updateuserparams = req.body;
    return UserServices.UpdateCourse(userwhereparams, updateuserparams).then(function (Data) {
        res.json({ "Status": 200, "result": Data, "Message": "Course update successfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    }); 
}

/****************Controller for Get Course List */
exports.CoursesList = function(req, res){
    return UserServices.getCourseList().then(function (Data) {
        res.json({ "Status": 200, "result": Data, "Message": "Course List." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    }); 
}

/*************controller for user list */
exports.UserList = function(req,res){
    return UserServices.getUserList().then(function (Data) {
        res.json({ "Status": 200, "result": Data, "Message": "Course List." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}