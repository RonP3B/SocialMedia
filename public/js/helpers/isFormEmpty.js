import { showToast } from "./showToast.js";

const highlightFields = (form) => {
  $(`${form} .required`).each(function () {
    if ($(this).val().isEmpty()) $(this).addClass("is-invalid");
    else $(this).removeClass("is-invalid");
  });
};

const checkFields = (form) => {
  let res = true;

  $(`${form} .required`).each(function () {
    if ($(this).val().isEmpty()) {
      res = false;
      return false;
    }
  });

  return res;
};

export const isFormEmpty = (
  form,
  validateFunction = false,
  msg = "All the fields must be completed."
) => {
  highlightFields(form);

  if (checkFields(form)) {
    validateFunction ? validateFunction(form) : $(form).submit();
  } else {
    showToast(msg);
  }
};
