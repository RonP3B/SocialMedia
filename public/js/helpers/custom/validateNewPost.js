import { showToast } from "../showToast.js";

export const validatePost = (form) => {
  if ($(".post-image").val().isEmpty() && $("#post-text").val().isEmpty()) {
    return showToast("You must add an image or write text.");
  }

  $(form).submit();
};
