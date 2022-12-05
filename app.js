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
const { locals, cacheConfig } = require("./exports/middlewares");
const { imgStorage, databaseObj } = require("./exports/util");
const { User } = require("./exports/models");
const { sendActivationMail } = require("./exports/helpers");

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
    helpers: { json: (obj) => JSON.stringify(obj) },
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
app.use(locals);
app.use("/authentication", authRouter);
app.use("/home", homeRouter);
app.use(notFoundRouter);

User.afterCreate((user, options) => sendActivationMail(user));

databaseObj
  .sync()
  .then((res) => app.listen(port, () => console.log(`Listening on ${port}`)))
  .catch((err) => {
    console.log(err);
  });
