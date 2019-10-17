'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var passport = require('passport');
var ErrorHelper = require('../helpers/errortypes-helper');
import { User } from '../models/user';
var errorsControllerHelper = require('../helpers/errors.controller.helper');
var userServices = require('../services/userServices');

exports.authByEmail = function (req, res, next) {
  return User.findOne({ email: req.body.email }).then(function (Data) {
    //console.log(Data)
    req.profile = Data;
    return next();
  }).catch(function (err) {
    return next(err);
  })
}

exports.getTokenDetails = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (user) {
      req.AuthData = user;
      next();
    } else {
        return errorsControllerHelper.returnError({
        Succeeded: false,
        Status: 500,
        Message: 'Not authprize.',
        Name: 'Not authprize.'
      }, res, 500);
      //res.json(newError);
    }
  })(req, res, next);
}

exports.getSubAdminTokenDetails = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (user) {
      return userServices.getAllUserTypeList(user.usertypeid).then(function(Item){
        if(Item.typename=="SuperAdministrator"){
          req.AuthData = user;
          next();
        }else{
          return errorsControllerHelper.returnError({
            Succeeded: false,
            Status: 500,
            Message: 'Not authprize.',
            Name: 'Not authprize.'
          }, res, 500);
        }
      })
    } else {
        return errorsControllerHelper.returnError({
        Succeeded: false,
        Status: 500,
        Message: 'Not authprize.',
        Name: 'Not authprize.'
      }, res, 500);
      //res.json(newError);
    }
  })(req, res, next);
}

/**
 * Require login routing middleware
 */
exports.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'User is not logged in'
    });
  }
  next();
};

/**
 * Requires api key for authorization header 
 */
exports.requireAccessKey = function (req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (user) {
      next();
    } else {
      return errorsControllerHelper.returnError({
        Succeeded: false,
        Status: 500,
        Message: 'Not authorize.',
        Name: 'Not authorize.'
      }, res, 500);
    }
  })(req, res, next);
}


