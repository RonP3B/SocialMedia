// ----------------------------Imports----------------------------
const { User } = require("../exports/models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const {
  isValidSignUp,
  isValidLogin,
  internalErrorRes,
  isValidUser,
  sendConfirmCode,
  sendActivationMail
} = require("../exports/helpers");

// ----------------------------Controllers----------------------------
exports.getLogIn = (req, res, next) => res.render("auth/log-in");

exports.getSignUp = (req, res, next) => res.render("auth/sign-up");

exports.getFindUser = (req, res, next) => {
  res.render("auth/reset-password", { findUser: true });
}

exports.getConfirmCode = (req, res, next) => {
  if (!req.session.userRecovery) return res.redirect("back");
  res.render("auth/reset-password", { confirmCode: true });
}

exports.getResetPassword = (req, res, next) => {
  if (!req.session.userRecovery) return res.redirect("back");
  res.render("auth/reset-password", { resetPass: true });
}

// Activates user whith given id
exports.getActivation = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (id) {
      await User.update({ isActive: "1" }, { where: { id } });
      req.flash("success", `Your account is active now.`);
    }

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
  const id = crypto.randomUUID();

  try {
    await User.create({
      id,
      name,
      lastName,
      phone,
      email,
      username,
      password: securedPassword,
      profilePicture,
    });

    sendActivationMail(id, name, email, req);
    req.flash("success", "The account has been successfully created.");
    res.redirect("/");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

exports.postFindUser = async (req, res, next) => {
  try {
    const username = req.body.username;

    const user = await User.findOne({ where: { username } });

    if (!isValidUser(req, user)) return res.redirect("back");

    const confirmCode = crypto.randomBytes(7).toString('hex');

    req.session.confirmCode = confirmCode;
    req.session.userRecovery = user;

    sendConfirmCode(user, confirmCode);

    req.flash("success", "The code was sent to the user's email.");
    res.redirect("/forgot-password/confirm-code");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
}

exports.postConfirmCode = (req, res, next) => {
  if (!req.body.code) return res.redirect("back")

  if (req.session.confirmCode !== req.body.code) return res.redirect("back");

  delete req.session.confirmCode;

  res.redirect("/forgot-password/reset-password")
}

exports.postResetPassword = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      req.flash("errors", "Passwords do not match.");
      return res.redirect("back");
    }

    const user = await User.findByPk(req.session.userRecovery.id);
    const securedPassword = await bcrypt.hash(password, 12);

    await user.update({ password: securedPassword });

    req.flash("success", "Your password has been changed successfully.");

    delete req.session.userRecovery;

    res.redirect("/");
  } catch (error) {
    console.log(`\nError: ${error}\n`);
    internalErrorRes(res);
  }
}

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log(`Session destroy error: ${err}`);
    else res.redirect("/");
  });
};
