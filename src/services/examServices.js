import { Exam } from '../models/exam';
var moment = require('moment');
var config = require('../../config');
var ErrorHelper = require('../helpers/errortypes-helper');
var bPromise = require('bluebird');
var fs = require('fs');
exports.CreateExamination = function (params) {
    var ExamData = new Exam(params)
    return ExamData.save().then(function (Items) {
        return Items
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
        } else {
            throw new ErrorHelper.BadRequest("Something went wrong.", error);
        }
    })
}

exports.GetallExamination = function(){
    return Exam.find().then(function(Items){
        if(Items){
            return Items;
        }else{
            var Items = "";
            return Items;
        }
    }).catch(function(error){
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
    })
}