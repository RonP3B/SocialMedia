const express = require("express");
const commentsController = require("../controllers/commentsController");

const router = express.Router();

router.post("/add-comment/:id", commentsController.addComment);
router.post("/add-reply/:id", commentsController.addReply);

module.exports = router;
