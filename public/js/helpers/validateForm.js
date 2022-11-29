import { showToast } from "./showToast.js";

const highlightFields = (container) => {
  $(`.${container} .required-field`).each(function () {
    if ($(this).val().isEmpty()) $(this).addClass("border-danger");
    else $(this).removeClass("border-danger");
  });
};

const checkRequiredFields = (container) => {
  let res = true;

  $(`.${container} .required-field`).each(function () {
    if ($(this).val().isEmpty()) {
      res = false;
      return false;
    }
  });

  return res;
};

export const validateForm = (form, toastMsg) => {
  if (checkRequiredFields(form)) {
    $(`.${form}`).submit();
  } else {
    highlightFields(form);
    showToast(toastMsg);
  }
};
