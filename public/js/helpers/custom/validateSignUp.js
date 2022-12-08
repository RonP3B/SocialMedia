import { showToast } from "../showToast.js";
import { emailRegex } from "../util/emailRegEx.js";

export const validateSignUp = (form) => {
  if ($("#phone").val().includes("_")) {
    return showToast("Invalid phone number.");
  }

  if (!emailRegex.test($("#email").val())) {
    return showToast("Invalid email.");
  }

  if ($("#password").val().length < 6) {
    return showToast("The password must have more than five characters.");
  }

  if ($("#password").val() !== $("#confirmPassword").val()) {
    return showToast("Passwords don't match.");
  }

  $(form).submit();
};
