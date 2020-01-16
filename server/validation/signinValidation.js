var validator = require('validator');
var isEmpty = require('is-empty');
function signInInputValidation(data) {
  var errors = {};
  data.email = isEmpty(data.email) ? '' : data.email;
  data.password = isEmpty(data.password) ? '' : data.password;
  if (validator.isEmpty(data.email)) {
    errors.email = 'enter a valid email'
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