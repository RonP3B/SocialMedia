const express = require("express");
const homeController = require("../controllers/homeController");
const redirects = require("../middlewares/redirects");

const router = express.Router();

router.get("/", redirects.isUnauthorized, homeController.getHome);

module.exports = router;
