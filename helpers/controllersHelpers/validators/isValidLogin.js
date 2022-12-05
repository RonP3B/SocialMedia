const { User } = require("../../../exports/models");
const internalErrorRes = require("../internalErrorRes");
const bcrypt = require("bcryptjs");

const isValidLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    req.flash("errors", "Form data missing.");
    return false;
  }

  let valid = true;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      req.flash("errors", "Incorrect username.");
      valid = false;
      return;
    }

    const passValid = await bcrypt.compare(password, user.password);

    if (!passValid) {
      req.flash("errors", "Incorrect password.");
      valid = false;
      return;
    }

    if (!user.isActive) {
      req.flash("errors", "Your account isn't active, check your email.");
      valid = false;
    }
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }

  return valid;
};

module.exports = isValidLogin;
