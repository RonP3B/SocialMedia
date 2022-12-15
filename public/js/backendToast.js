const showBackendToast = (toastMsg, isError) => {
  Toastify({
    text: toastMsg,
    duration: 5000,
    gravity: "bottom",
    position: "right",
    style: {
      background: isError ? "#ba181b" : "#74c69d",
      color: "white",
      fontWeight: "bold",
    },
  }).showToast();
};
