const { logosObj } = require("../exports/util");

const locals = (req, res, next) => {
  res.locals.logosObj = logosObj;
  next();
};

module.exports = locals;
