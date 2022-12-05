const showBackendToast = (toastMsg, isError) => {
  Toastify({
    text: toastMsg,
    duration: 5000,
    style: {
      background: isError ? "#ba181b" : "#74c69d",
      color: "white",
      fontWeight: "bold",
    },
  }).showToast();
};
