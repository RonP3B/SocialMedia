"use strict";

// Packages
require("dotenv").config();
const express = require("express");
const { engine } = require("express-handlebars");
const multer = require("multer");
const session = require("express-session");
const flash = require("connect-flash");
const csrf = require("csurf");
const csrfProtection = csrf();
const path = require("path");

// Server files
const { homeRouter, authRouter, notFoundRouter } = require("./exports/routes");
const { locals, cacheConfig, addReqUser } = require("./exports/middlewares");
const { imgStorage, databaseObj } = require("./exports/util");
const { User, Post, Comment, Reply } = require("./exports/models");
const { sendActivationMail } = require("./exports/helpers");
const redirects = require("./middlewares/redirects");

// App
const app = express();
const port = process.env.PORT || 5000;

// View Engine congiguration
app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {
      json: (obj) => JSON.stringify(obj),
      equal: (a, b) => a === b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(multer({ storage: imgStorage }).single("image"));
app.use(session({ secret: "secret", resave: true, saveUninitialized: false }));
app.use(flash());
app.use(csrfProtection);
app.use(cacheConfig);
app.use(addReqUser);
app.use(locals);
app.use(authRouter);
app.use("/home", redirects.isUnauthorized, homeRouter);
app.use(notFoundRouter);

// Sequelize associations
User.hasMany(Post, { onDelete: "CASCADE" });
Post.belongsTo(User, { constraint: true });

User.hasMany(Comment, { onDelete: "CASCADE" });
Comment.belongsTo(User, { constraint: true });

User.hasMany(Reply, { onDelete: "CASCADE" });
Reply.belongsTo(User, { constraint: true });

Post.hasMany(Comment, { onDelete: "CASCADE" });
Comment.belongsTo(Post, { constraint: true });

Comment.hasMany(Reply, { onDelete: "CASCADE" });
Reply.belongsTo(Comment, { constraint: true });

// Sequelize hooks
User.afterCreate((user, options) => sendActivationMail(user));

// Sequelize sync
databaseObj
  .sync()
  .then((res) => app.listen(port, () => console.log(`Listening on ${port}`)))
  .catch((err) => {
    console.log(err);
  });
