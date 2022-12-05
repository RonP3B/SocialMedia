const { phoneNumberRegex, emailAdressRegex } = require("../../../util/regex");
const { User } = require("../../../exports/models");
const internalErrorRes = require("../internalErrorRes");

const isValidSignUp = async (req, res) => {
  const imgFile = req.file;
  const { name, lastName, phone, email, username, password, confirmPassword } =
    req.body;

  if (
    !name ||
    !lastName ||
    !phone ||
    !email ||
    !username ||
    !password ||
    !confirmPassword ||
    !imgFile
  ) {
    req.flash("errors", "Form data missing.");
    return false;
  }

  if (!emailAdressRegex.test(email)) {
    req.flash("errors", "Invalid email.");
    return false;
  }

  if (!phoneNumberRegex.test(phone)) {
    req.flash("errors", "Invalid phone number.");
    return false;
  }

  if (password.length < 6) {
    req.flash("errors", "Invalid password length.");
    return false;
  }

  let isValid = true;

  try {
    const objUser = await User.findOne({ where: { username } });

    if (objUser) {
      req.flash("errors", "Given username already exists.");
      isValid = false;
    }
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }

  return isValid;
};

module.exports = isValidSignUp;
