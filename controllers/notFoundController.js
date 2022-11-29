const { logosObj } = require("../exports/util");

exports.getNotFound = (req, res, next) => {
  res.status(404).render("message", {
    message: "page not found",
    logo: logosObj.svg404,
  });
};
