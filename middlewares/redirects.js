exports.isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    req.flash("errors", "You're already authenticated.");
    return res.redirect("/home");
  }

  next();
};

exports.isUnauthorized = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    req.flash("errors", "You need to authenticate first.");
    return res.redirect("/authentication");
  }

  next();
};
