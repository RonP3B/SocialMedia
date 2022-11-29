const { logosObj } = require("../../exports/util");

const internalErrorRes = (res) => {
  return res.status(500).render("message", {
    errorMsg: "An internal server error has occurred",
    logo: logosObj.svgInternalError,
  });
};

module.exports = internalErrorRes;
