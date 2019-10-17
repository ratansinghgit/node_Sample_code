import { User } from '../models/user';
import { LoginLog } from '../models/loginlog';
import { College } from '../models/college';
var ErrorHelper = require('../helpers/errortypes-helper');
var successhelper = require('../helpers/success.helper');
var bPromise = require('bluebird');
var moment = require('moment');
// handle CreateUser Services.
exports.CreateUsers = function (userparams) {
  var myData = new User(userparams);
  return myData.save().then(function (item) {
    return item
  }).catch(function (error) {
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
  });
}

/***********Service for Update Users */
exports.UpdateUser = function (Id, updateparams) {
  return User.findOneAndUpdate({ _id: Id }, { $set: updateparams }, { new: true }).then(function (Item) {
    if (Item) {
      var whereparams = {
        "_id": Item._id
      }
      return User.findOne(whereparams).then(function (item) {
        return item;
      })
    } else {
      throw new ErrorHelper.BadRequest("Something went wrong.", "error");
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}

exports.findUserbyOtp = function (params) {
  return User.findOne(params).then(function (item) {
    return item;

  })
}


/****************Update College */
exports.UpdateCollege = function (Id, updateparams) {
  return College.findOneAndUpdate({ _id: Id }, { $set: updateparams }, { new: true }).then(function (Item) {
    if (Item) {
      var whereparams = {
        "_id": Item._id
      }
      return College.findOne(whereparams).then(function (item) {
        return item;
      })
    } else {
      throw new ErrorHelper.BadRequest("Something went wrong.", "error");
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}

//*** Logout User Functionality */
exports.LogoutUser = function (updateparams) {
  return LoginLog.findOne({ "userid": updateparams.userid, "deviceid": updateparams.deviceid, "islogout": false }).sort({ logindatetime: -1 }).then(function (LoginUserData) {
    if (LoginUserData) {
      updateparams.islogout = true;
      return LoginLog.findOneAndUpdate({ _id: LoginUserData._id }, { $set: updateparams }, { new: true }).then(function (Item) {
        return Item;
      }).catch(function (error) {
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
      })
    } else {
      var Item = "";
      return Item;
    }
  })
}

/****************Service for Create Colleges */
exports.CreateColleges = function (paramsData) {
  var CollegeData = new College(paramsData);
  return CollegeData.save().then(function (Item) {
    return Item;
  }).catch(function (error) {
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
  });
}

/************service for update get college */
exports.GetDataCollege = function () {
  return College.find().then(function (Item) {
    if (Item) {
      return Item;
    } else {
      var Item = [];
      return Item;
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}

/*************Service for Search college */
exports.SearchCollege = function (searchparams) {
  return College.find({"name": { $regex: '.*' + searchparams + '.*' } }).then(function (items) {
    if(items.length >= 1){
      return items;
    }else{
      var items = [];
      return items;
    }
  }).catch(function(error){
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  });
}