const isValidUser = (req, user) => {
  const username = req.body.username ? req.body.username : null;

  // If the user breaks the frontend validation
  if (!username) {
    req.flash("errors", "Form data missing.");
    return false;
  }

  // If the user (sequelize obj) doesn't exist
  if (!user) {
    req.flash("errors", "An account with that username doesn't exist.");
    return false;
  }

  return true;
};

module.exports = isValidUser;
