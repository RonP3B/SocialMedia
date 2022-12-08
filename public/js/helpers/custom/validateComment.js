import { showToast } from "../showToast.js";

export const validateComment = (button, parent) => {
  const form = button.closest(parent);

  if (form.find("textarea").val().isEmpty()) {
    return showToast("You must write something first.");
  }

  form.submit();
};
