import { showToast } from "./showToast.js";

const highlightFields = (form) => {
  $(`#${form} input`).each(function () {
    if ($(this).val().isEmpty()) $(this).addClass("border-danger");
    else $(this).removeClass("border-danger");
  });
};

const checkFields = (form) => {
  let res = true;

  $(`#${form} input`).each(function () {
    if ($(this).val().isEmpty()) {
      res = false;
      return false;
    }
  });

  return res;
};

export const isFormEmpty = (form, validateFunction = false) => {
  highlightFields(form);

  if (checkFields(form)) {
    validateFunction ? validateFunction(form) : $(`#${form}`).submit();
  } else {
    showToast("All the fields must be completed.");
  }
};
