import { User } from '../models/user';
import { Courses } from '../models/course';
import { UserType } from '../models/usertype';
import { LoginLog } from '../models/loginlog';
var moment = require('moment');
var config = require('../../config');
var BCrypt = require('bcrypt');
var ErrorHelper = require('../helpers/errortypes-helper');
var bPromise = require('bluebird');
var fs = require('fs');
var AWS = require('aws-sdk');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nynbus.inwizards@gmail.com',
    pass: 'qwerty@11'
  }
});
const sendmail = require('sendmail')({
  devPort: false, // Default: False
  devHost: 'localhost', // Default: localhost
  smtpPort: 25, // Default: 25
  smtpHost: -1 // Default: -1 - extra smtp host after resolveMX
});

//***** FinalCallback */
exports.finalCallback = function (req, res, ErrorCode, Status, result, ErrorMessage, authKey) {
  if (authKey) {
    res.json({ "ErrorCode": ErrorCode, Status: Status, "user": result, "ErrorMessage": ErrorMessage, "auth-key": authKey });
  } else {
    res.json({ "ErrorCode": ErrorCode, Status: Status, "user": result, "ErrorMessage": ErrorMessage });
  }
}

// handle UserList Services.
exports.FindAllUsersList = function (params) {
  var userList = [];
  return User.find(params).populate('usertypeid').populate('organizationid').populate('hubid').sort({ firstname: 1 }).then(function (item) {
    if (item) {
		
      return bPromise.all(item).each(function (ItemData) {
        var userListObject = {
          "_id": ItemData._id,
          "profileImg": (ItemData.profileImg)?config.url + "iotnode/uploads/" +ItemData.profileImg:"",
          "firstname": ItemData.firstname,
          "lastname": ItemData.lastname,
          "isactive":ItemData.isactive,
          "middlename": (ItemData.middlename) ? ItemData.middlename : "",
          "type": (ItemData.usertypeid) ? ItemData.usertypeid : "",
          "dob": (ItemData.dob) ? ItemData.dob : "",
          "email": (ItemData.email) ? ItemData.email : "",
          "contactno": (ItemData.contactno) ? ItemData.contactno : "",
        };
        userListObject.hub = {
          "hubid": (ItemData.hubid) ? ItemData.hubid._id : "",
          "hubname": (ItemData.hubid) ? ItemData.hubid.hubname : "",
        }
        return LoginLog.findOne({
          "userid": ItemData._id,
          "vehicleid": { $exists: true },
          'logindatetime': {
            $gt: moment().utc().format("YYYY-MM-DD") + "T00:00:00.000Z",
            $lt: moment().utc().format(),
          },
          "isauthenticated": true
        }).sort({ logindatetime: -1 }).populate('vehicleid').then(function (VehicleAssignedData) {
          if (VehicleAssignedData) {
            userListObject.vehicleData = {
              "name": (VehicleAssignedData.vehicleid) ? VehicleAssignedData.vehicleid.name : "",
              "vehicleid": (VehicleAssignedData.vehicleid) ? VehicleAssignedData.vehicleid._id : "",
              "vehiclenumber": (VehicleAssignedData.vehicleid) ? VehicleAssignedData.vehicleid.vehiclenumber : "",
              "activatebysuperadmin": (VehicleAssignedData.vehicleid) ? VehicleAssignedData.vehicleid.activatebysuperadmin : "",
              "activatebyuser": (VehicleAssignedData.vehicleid) ? VehicleAssignedData.vehicleid.activatebyuser : "",
              "deviceid": VehicleAssignedData.deviceid,
            }
          } else {
            userListObject.vehicleData = {
              "name": "",
              "vehicleid":"",
              "vehiclenumber": "",
              "activatebysuperadmin":0,
              "activatebyuser":0,
              "deviceid": ""
            }
          }
          userListObject.islogout = (VehicleAssignedData) ? VehicleAssignedData.islogout : false;
          userList.push(userListObject);
        })
      }).then(function () {
        return userList;
      });
    } else {
      throw new ErrorHelper.BadRequest("Something went wrong.", "error");
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  });
}

/*************Service for UserType List */
exports.GetUsersTypesData = function(){
  return UserType.find().then(function(UserList){
    return UserList;
  }).catch(function(error){
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}
// handle CreateUsers Services.
exports.UpdatePassword = function (Id, updateparams, params) {
  return User.findOne({ "_id": Id }).then(function (Item) {
    if (!BCrypt.compareSync(params.currentpassowrd, Item.password)) {
    } else {
      return User.updateOne({ _id: Id }, { $set: updateparams }, { new: true }).then(function (Item) {
        return Item;
      }).catch(function (error) {
        res.json(error);
      })
    }
  }).catch(function (error) {
    console.log("error", error)
  })
}
/*************Service for Reset Password */
exports.ResetPassword = function (Id, updateparams) {
  return User.findOne({ "_id": Id }).then(function (Item) {
    return User.updateOne({ _id: Id }, { $set: updateparams }, { new: true }).then(function (Item) {
      return Item;
    }).catch(function (error) {
      res.json(error);
    })
  }).catch(function (error) {
    console.log("error", error)
  })
}

exports.CreateCourse = function(params){
  var courseparams = new Courses(params);
  return courseparams.save().then(function(CourseData){
    return CourseData;
  }).catch(function(error){
    if (error.name == "ValidationError") {
      var params = Object.keys(error.errors).map(function (key) {
        return {
          "message": error.errors[key].message,
          "path": error.errors[key].message,
          "type": error.errors[key].name
        }
      });
      throw new ErrorHelper.ValidationError("parameter error.", params);
    } else if (error.name == "EmailExist") {
      throw new ErrorHelper.BadRequest(error.message, error);
    } else {
      throw new ErrorHelper.BadRequest("Something went wrong.", error);
    }
  })
}

/*************service for update courses */
exports.UpdateCourse = function(Id, updateparams){
  return Courses.findOneAndUpdate({ _id: Id }, { $set: updateparams }, { new: true }).then(function (Item) {
    if (Item) {
      var whereparams = {
        "_id": Item._id
      }
      return Courses.findOne(whereparams).then(function (item) {
        return item;
      })
    } else {
      throw new ErrorHelper.BadRequest("Something went wrong.", "error");
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}


/***************************** Controller for Get Courses */
exports.getCourseList = function(){
  return Courses.find().then(function(CourseList){
    if(CourseList){
      return CourseList;
    }else{
      var CourseList = [];
      return CourseList;
    }
  }).catch(function(error){
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}

/***********service for get user list */
exports.getUserList = function(){
  return User.find().then(function(UserList){
    if(UserList){
      return UserList;
    }else{
      var UserList = [];
      return UserList;
    }
  }).catch(function(error){
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}