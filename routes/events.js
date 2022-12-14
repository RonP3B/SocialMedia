const express = require("express");
const eventsController = require("../controllers/eventsController");

const router = express.Router();

router.get("/", eventsController.getEvents);
router.get("/add-event", eventsController.getAddEvent);
router.get("/send-invitation", eventsController.getSendInvitation);
router.get("/response", eventsController.getResponse);

router.post("/send-invitation", eventsController.postSendInvitation);
router.post("/add-event", eventsController.postAddEvent);
router.post("/delete-invitation", eventsController.postDeleteInvitation);
router.post("/delete-event", eventsController.postDeleteEvent);

module.exports = router;
