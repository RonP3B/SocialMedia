"use strict";

// Packages
require("dotenv").config();
const express = require("express");
const { engine } = require("express-handlebars");
const multer = require("multer");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

// Server files
const { home, notFoundRouter } = require("./exports/routes");
const { locals } = require("./exports/middlewares");
const { imgStorage } = require("./exports/util");

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
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

// Main middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(multer({ storage: imgStorage }).single("image"));
app.use(session({ secret: "001", resave: true, saveUninitialized: false }));
app.use(locals);
app.use(flash());
app.use(home);
app.use(notFoundRouter);

app.listen(port, () => console.log(`Listening on ${port}`));
