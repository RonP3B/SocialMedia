"use strict";

// -------------------Packages-------------------------------
require("dotenv").config();
const express = require("express");
const { engine } = require("express-handlebars");
const multer = require("multer");
const session = require("express-session");
const flash = require("connect-flash");
const csrf = require("csurf");
const csrfProtection = csrf();
const path = require("path");

// -------------------Server files---------------------------
const { sendActivationMail } = require("./exports/helpers");
const redirects = require("./middlewares/redirects");
const { imgStorage, databaseObj } = require("./exports/util");

const {
  homeRouter,
  authRouter,
  notFoundRouter,
  friendsRouter,
  notificationsRouter,
  commentsRouter,
  eventsRouter,
} = require("./exports/routes");

const {
  locals,
  cacheConfig,
  addReqUser,
  addReqNotifications,
} = require("./exports/middlewares");

const {
  User,
  Post,
  FriendRequest,
  Comment,
  Reply,
  Event,
  EventRequest,
} = require("./exports/models");

// ---------------------------App----------------------
const app = express();
const port = process.env.PORT || 5000;

// ----------------View Engine congiguration-------------
app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {
      json: (obj) => JSON.stringify(obj),
      equal: (a, b) => a === b,
      isEventOver: (date) => new Date(date) <= new Date(),
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

// --------------------------------Middlewares-------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(multer({ storage: imgStorage }).single("image"));
app.use(session({ secret: "secret", resave: true, saveUninitialized: false }));
app.use(flash());
app.use(csrfProtection);
app.use(cacheConfig);
app.use(addReqUser);
app.use(addReqNotifications);
app.use(locals);
app.use(authRouter);
app.use("/home", redirects.isUnauthorized, homeRouter);
app.use("/friends", redirects.isUnauthorized, friendsRouter);
app.use("/notifications", redirects.isUnauthorized, notificationsRouter);
app.use("/events", redirects.isUnauthorized, eventsRouter);
app.use("/comments", redirects.isUnauthorized, commentsRouter);
app.use(notFoundRouter);

// ----------------------------Sequelize associations----------------------------

// A user has many posts, a post belongs to a user
User.hasMany(Post, { onDelete: "CASCADE" });
Post.belongsTo(User, { constraint: true });

// A user has many comments, a comment belongs to a user
User.hasMany(Comment, { onDelete: "CASCADE" });
Comment.belongsTo(User, { constraint: true });

// A user has many replies, a reply belongs to a user
User.hasMany(Reply, { onDelete: "CASCADE" });
Reply.belongsTo(User, { constraint: true });

// A user has many events, an event belongs to a user
User.hasMany(Event, { onDelete: "CASCADE" });
Event.belongsTo(User, { constraint: true });

User.hasMany(FriendRequest);
FriendRequest.belongsTo(User, { as: "toUser", foreignKey: "toUserId" });
FriendRequest.belongsTo(User, { as: "fromUser", foreignKey: "fromUserId" });

// A post has many comments, a comment belongs to a post
Post.hasMany(Comment, { onDelete: "CASCADE" });
Comment.belongsTo(Post, { constraint: true });

// A comment has many replies, a reply belongs to a comment
Comment.hasMany(Reply, { onDelete: "CASCADE" });
Reply.belongsTo(Comment, { constraint: true });

// An event has many EventsRequest, an EventRequest belongs to an event
Event.hasMany(EventRequest, { onDelete: "CASCADE" });
EventRequest.belongsTo(Event, { foreignKey: "eventId" });

/* 
  A user has many EventRequest, An EventRequest belongs to User through
  toUserId (as toUser) and fromUserId (as fromUser) 
 */
User.hasMany(EventRequest);
EventRequest.belongsTo(User, { foreignKey: "toUserId", as: "toUser" });
EventRequest.belongsTo(User, { foreignKey: "fromUserId", as: "fromUser" });

// ----------------------------Sequelize hooks----------------------------
User.afterCreate((user, options) => sendActivationMail(user));

// ----------------------------Sequelize sync----------------------------
databaseObj
  .sync()
  .then((res) => app.listen(port, () => console.log(`Listening on ${port}`)))
  .catch((err) => {
    console.log(err);
  });
