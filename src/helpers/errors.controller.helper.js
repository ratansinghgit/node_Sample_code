/**
 * Handler for errors
 */
var returnError = function(err,res,code) {
  if(!code) {
    code = err.status ? err.status : 500;
  }
	return res.status(code).json(err);
};

module.exports.returnError = returnError;
