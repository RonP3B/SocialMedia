const homeRouter = require("../routes/home");
const friendsRouter = require("../routes/friends");
const notificationsRouter = require("../routes/notifications");
const authRouter = require("../routes/auth");
const eventsRouter = require("../routes/events");
const commentsRouter = require("../routes/comments");
const notFoundRouter = require("../routes/notFound");

module.exports = {
  homeRouter,
  authRouter,
  notFoundRouter,
  friendsRouter,
  commentsRouter,
  notificationsRouter,
  eventsRouter,
};
