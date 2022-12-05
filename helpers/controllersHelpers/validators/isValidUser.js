const isValidUser = (req, user) => {
  const username = req.body.username;

  if (!username) {
    req.flash("errors", "Form data missing.");
    return false;
  }

  if (!user) {
    req.flash("errors", "An account with that username doesn't exist.");
    return false;
  }

  return true;
};

module.exports = isValidUser;
