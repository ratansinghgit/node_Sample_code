var thingShadowsList = [];
var thingShadowNameList = [];
var awsIot = require('aws-iot-device-sdk');
/**
 * Handler for errors
 */
var returnSuccess = function (status, res, code, message, data) {
    if (!code) {
        code = status ? err.status : 200;
    }
    return res.status(code).json({
        Succeeded: status,
        Status: code,
        Message: message ? message : '',
        Data: data
    });
};
module.exports.returnSuccess = returnSuccess;