var validator = require('validator');
var isEmpty = require('is-empty');
function signInInputValidation(data) {
  var errors = {};
  data.newuser = isEmpty(data.newuser) ? '' : data.newuser;
  data.newPassword = isEmpty(data.newPassword) ? '' : data.newPassword;
  if (validator.isEmpty(data.username)) {
    errors.newuser = 'enter a valid userName'
  }
  if (validator.isEmpty(data.newPassword)) {
    errors.newPassword = 'enter your password What the hell'
  }
  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}
module.exports = signInInputValidation