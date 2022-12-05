const express = require("express");
const authController = require("../controllers/authController");
const redirects = require("../middlewares/redirects");

const router = express.Router();

router.get("/", redirects.isAuthenticated, authController.getLogIn);
router.get("/sign-up", authController.getSignUp);
router.get("/reset-password", authController.getResetPassword);
router.get("/activation/:id", authController.getActivation);

router.post("/", redirects.isAuthenticated, authController.postLogin);
router.post("/sign-up", authController.postSignUp);
router.post("/reset-password", authController.postResetPassword);

module.exports = router;
