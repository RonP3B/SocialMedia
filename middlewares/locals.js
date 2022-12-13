const { logosObj } = require("../exports/util");

// Middleware that adds local values
const locals = (req, res, next) => {
  const errors = req.flash("errors");
  const success = req.flash("success");
  const notifications = req.notifications ? req.notifications.length : 0;

  res.locals.csrfToken = req.csrfToken();
  res.locals.errorMessages = errors;
  res.locals.successMessages = success;
  res.locals.hasMessages = errors.length > 0 || success.length > 0;
  res.locals.logosObj = logosObj;
  res.locals.notificationsLength = notifications;

  next();
};

module.exports = locals;
