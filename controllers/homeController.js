exports.getHome = (req, res, next) => {
  res.render("home/home", { toastify: false, script: true });
};
