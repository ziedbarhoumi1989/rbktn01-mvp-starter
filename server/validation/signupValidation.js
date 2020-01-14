var validator = require('validator');
var isEmpty = require('is-empty');
function RegistryInputValidation(data) {
  var errors = {};
  data.newUser = isEmpty(data.newUser) ? '' : data.newUser;
  data.newPassword = isEmpty(data.newPassword) ? '' : data.newPassword;
  data.newPassword2 = !isEmpty(data.newPassword2) ? data.newPassword2 : "";
  data.newEmail = isEmpty(data.newEmail) ? '' : data.newEmail;

  // Name checks
  if (validator.isEmpty(data.newUser)) {
    errors.newUser = "Name field is required";
  }
  // Email checks
  if (validator.isEmpty(data.newEmail)) {
    errors.newEmail = "Email field is required";
  } else if (!validator.isEmail(data.newEmail)) {
    errors.newEmail = "Email is invalid";
  }
  // Password checks
  if (validator.isEmpty(data.newPassword)) {
    errors.newPassword = "Password field is required";
  }
  if (validator.isEmpty(data.newPassword2)) {
    errors.newPassword2 = "Confirm password field is required";
  }
  if (!validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors.newPassword = "Password must be at least 6 characters";
  }
  if (!validator.equals(data.newPassword, data.newPassword2)) {
    errors.newPassword2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = RegistryInputValidation