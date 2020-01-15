var validator = require('validator');
var isEmpty = require('is-empty');
function signInInputValidation(data) {
  var errors = {};
  data.username = isEmpty(data.username) ? '' : data.username;
  data.password = isEmpty(data.password) ? '' : data.password;
  if (validator.isEmpty(data.username)) {
    errors.username = 'enter a valid userName'
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'enter your password What the hell'
  }
  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}
module.exports = signInInputValidation