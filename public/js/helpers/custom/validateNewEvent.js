import { showToast } from "../showToast.js";

export const validateNewEvent = (form) => {
  const currentDate = new Date().setHours(0, 0, 0, 0);
  const inputDate = new Date($("#date").val()).setHours(0, 0, 0, 0);

  if (inputDate <= currentDate) {
    return showToast("The selected date must be over the current day.");
  }

  $(form).submit();
};
