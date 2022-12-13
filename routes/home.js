const express = require("express");
const homeController = require("../controllers/homeController");

const router = express.Router();

router.get("/", homeController.getHome);
router.get("/edit-post/:id", homeController.getEditPost);

router.post("/add-post", homeController.AddPost);
router.post("/edit-post", homeController.editPost);
router.post("/delete-post", homeController.deletePost);

module.exports = router;
