/**
 * Types of Errors
 */

// Create a new object, that prototypally inherits from the Error constructor.
var UnauthorisedError = function(message) {
  this.Succeeded = false;
  this.Status = 401;
  this.Message = message || 'User is not authorised for action';
  this.Name = 'Unauthorised';
  this.Data = params;
}

UnauthorisedError.prototype = Object.create(Error.prototype);
UnauthorisedError.prototype.constructor = UnauthorisedError;
module.exports.UnauthorisedError = UnauthorisedError;

/// Create a new object, that prototypally inherits from the Error constructor.
var BadRequest = function(message, params) {
  this.Succeeded = false;
  this.Status = 400;
  this.Message = message || 'Bad request';
  this.Name = 'Bad request';
  this.Data = params;
};

BadRequest.prototype = Object.create(Error.prototype);
BadRequest.prototype.constructor = BadRequest;
module.exports.BadRequest = BadRequest;

var ValidationError = function(message, params) {
  this.Succeeded = false;
  this.Status = 400;
  this.Message = message || 'Parameters error';
  this.Name = 'Parameters errors';
  this.Data = params;
};

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;
module.exports.ValidationError = ValidationError;


var Recordnotfounderror = function(message, params) {
  this.Succeeded = false;
  this.Status = 400;
  this.Message = message || 'Record not found error';
  this.Name = 'Record not found error';
  this.Data = params;
};

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;
module.exports.ValidationError = Recordnotfounderror;
