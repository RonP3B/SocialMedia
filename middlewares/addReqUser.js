// ---------------------------------imports--------------------------------------
const User = require("../models/User");
const internalErrorRes = require("../helpers/controllersHelpers/internalErrorRes");

// -----------------------------Middleware-------------------------------
const addReqUser = async (req, res, next) => {
  // If there is a session
  if (req.session) {
    try {
      const username = req.session.user;

      const userObj = username
        ? await User.findOne({ where: { username } })
        : null;

      req.user = userObj ? userObj.dataValues : null;
    } catch (error) {
      console.log(`\n*****Error*****\n${error}\n`);
      internalErrorRes(res);
    }
  }

  next();
};

module.exports = addReqUser;
