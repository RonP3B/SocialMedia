// --------------------------imports--------------------------
const { User } = require("../../../exports/models");
const internalErrorRes = require("../internalErrorRes");
const bcrypt = require("bcryptjs");

// --------------------------function--------------------------
const isValidLogin = async (req, res) => {
  const { username, password } = req.body;

  // If the user breaks the frontend validation
  if (!username || !password) {
    req.flash("errors", "Form data missing.");
    return false;
  }

  let valid = true;

  try {
    const user = await User.findOne({ where: { username } });

    // If the user doesn't exist
    if (!user) {
      req.flash("errors", "Incorrect credentials.");
      valid = false;
      return;
    }

    const passValid = await bcrypt.compare(password, user.password);

    // If the password is incorrect
    if (!passValid) {
      req.flash("errors", "Incorrect credentials.");
      valid = false;
      return;
    }

    // If the user is not active
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
