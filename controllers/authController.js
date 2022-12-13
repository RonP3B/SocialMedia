// ----------------------------Imports----------------------------
const { User } = require("../exports/models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const {
  isValidSignUp,
  isValidLogin,
  internalErrorRes,
  sendResetPassMail,
  isValidUser,
} = require("../exports/helpers");

// ----------------------------Controllers----------------------------
exports.getLogIn = (req, res, next) => res.render("auth/log-in");

exports.getSignUp = (req, res, next) => res.render("auth/sign-up");

exports.getResetPassword = (req, res, next) => {
  res.render("auth/reset-password");
};

// Activates user whith given id
exports.getActivation = async (req, res, next) => {
  const { id } = req.params;

  try {
    await User.update({ isActive: 1 }, { where: { id } });
    req.flash("success", `Your account is active now.`);
    res.redirect("/");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

exports.postLogin = async (req, res, next) => {
  // Ends function if it's not a valid login
  if (!(await isValidLogin(req, res))) return res.redirect("/");

  try {
    const username = req.body.username ? req.body.username : null;

    req.session.isAuthenticated = true;
    req.session.user = username;

    req.session.save((err) => {
      if (err) console.log(`session save error: ${err}`);
      return res.redirect("/home");
    });
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

exports.postSignUp = async (req, res, next) => {
  // Ends the function if it's not a valid signup
  if (!(await isValidSignUp(req, res))) return res.redirect("/sign-up");

  const { name, lastName, phone, email, username, password } = req.body;
  const profilePicture = req.file.filename;
  const securedPassword = await bcrypt.hash(password, 12);

  try {
    await User.create({
      id: crypto.randomUUID(),
      name,
      lastName,
      phone,
      email,
      username,
      password: securedPassword,
      profilePicture,
    });

    req.flash("success", "The account has been successfully created.");
    res.redirect("/");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

// Resets the password of the given username
exports.postResetPassword = async (req, res, next) => {
  const username = req.body.username ? req.body.username : null;

  try {
    const user = await User.findOne({ where: { username } });

    // Ends the try-catch if it's not a valid user
    if (!isValidUser(req, user)) return res.redirect("/reset-password");

    // Create the user's id + a random id as new password
    const newPassword = `${user.id}${crypto.randomUUID()}`;
    const newPasswordSecured = await bcrypt.hash(newPassword, 12);

    await User.update(
      { password: newPasswordSecured },
      { where: { username } }
    );

    // Send an email to the user with his new password
    sendResetPassMail(user, newPassword);

    req.flash(
      "success",
      "Your password was reset, and we've sent you an email with your new password."
    );

    res.redirect("/");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log(`Session destroy error: ${err}`);
    else res.redirect("/");
  });
};
