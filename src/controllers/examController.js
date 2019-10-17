// Import contact model';
var ExamServices = require('../services/examServices');
var moment = require('moment');var fs = require('fs');
var bPromise = require('bluebird');
var errorsControllerHelper = require('../helpers/errors.controller.helper');

exports.CreateExam = function(req, res){
    var Examparams = req.body;
    return ExamServices.CreateExamination(Examparams).then(function (Data) {
        if(Data){
            res.json({ "Status": 200, "result": Data, "Message": "Exam created successfully." });
        }else{
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "Exam created successfully." });
        }
        
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

exports.GetAllExam = function(req, res){
    return ExamServices.GetallExamination().then(function (Data) {
        if(Data){
            res.json({ "Status": 200, "result": Data, "Message": "Exam List." });
        }else{
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "No exam foound." });
        }
        
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}