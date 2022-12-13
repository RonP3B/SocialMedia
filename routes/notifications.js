const express = require("express");
const notificationsController = require("../controllers/notificationsController");

const router = express.Router();

router.get("/", notificationsController.getNotifications);
router.get("/accept-friend/:id", notificationsController.acceptFriend);
router.get("/decline-friend/:id", notificationsController.declineFriend);

module.exports = router;
