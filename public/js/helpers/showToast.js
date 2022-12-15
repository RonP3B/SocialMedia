export const showToast = (toastMsg) => {
  Toastify({
    text: toastMsg,
    duration: 4000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "#ffb703",
      color: "white",
      fontWeight: "bold",
    },
  }).showToast();
};
