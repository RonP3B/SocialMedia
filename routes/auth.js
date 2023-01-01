const express = require("express");
const authController = require("../controllers/authController");
const redirects = require("../middlewares/redirects");

const router = express.Router();

router.get("/", redirects.isAuthenticated, authController.getLogIn);
router.get("/sign-up", redirects.isAuthenticated, authController.getSignUp);
router.get("/activation/:id", authController.getActivation);
router.get("/log-out", authController.getLogout);
router.get("/forgot-password/find-user", authController.getFindUser);
router.get("/forgot-password/confirm-code", authController.getConfirmCode);
router.get("/forgot-password/reset-password", authController.getResetPassword);

router.post("/forgot-password/find-user", authController.postFindUser);
router.post("/forgot-password/confirm-code", authController.postConfirmCode);
router.post("/forgot-password/reset-password", authController.postResetPassword);
router.post("/", authController.postLogin);
router.post("/sign-up", authController.postSignUp);

module.exports = router;
