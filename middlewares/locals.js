const { logosObj } = require("../exports/util");

const locals = (req, res, next) => {
  const errors = req.flash("errors");
  const success = req.flash("success");

  res.locals.csrfToken = req.csrfToken();
  res.locals.errorMessages = errors;
  res.locals.successMessages = success;
  res.locals.hasMessages = errors.length > 0 || success.length > 0;
  res.locals.logosObj = logosObj;

  next();
};

module.exports = locals;
