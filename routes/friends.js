const express = require("express");
const friendsController = require("../controllers/friendsController");

const router = express.Router();

router.get("/", friendsController.getFriends);
router.get("/add-friend", friendsController.getAddFriend);

router.post("/add-friend", friendsController.postAddFriend);
router.post("/delete-friend", friendsController.postDeleteFriend);

module.exports = router;
