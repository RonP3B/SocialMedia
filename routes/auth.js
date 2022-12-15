const express = require("express");
const authController = require("../controllers/authController");
const redirects = require("../middlewares/redirects");

const router = express.Router();

router.get("/", redirects.isAuthenticated, authController.getLogIn);
router.get("/sign-up", redirects.isAuthenticated, authController.getSignUp);
router.get("/activation/:id", authController.getActivation);
router.get("/log-out", authController.getLogout);
router.get(
  "/reset-password",
  redirects.isAuthenticated,
  authController.getResetPassword
);

router.post("/", authController.postLogin);
router.post("/sign-up", authController.postSignUp);
router.post("/reset-password", authController.postResetPassword);

module.exports = router;
