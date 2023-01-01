import { showToast } from "../showToast.js";

export const validateResetPassword = (form) => {
  if ($("#password").val().length < 6) {
    return showToast("The password must have more than five characters.");
  }

  if ($("#password").val() !== $("#confirmPassword").val()) {
    return showToast("Passwords don't match.");
  }

  $(form).submit();
};
