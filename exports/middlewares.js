const locals = require("../middlewares/locals");
const cacheConfig = require("../middlewares/cacheConfig");
const addReqUser = require("../middlewares/addReqUser");
const addReqNotifications = require("../middlewares/addReqNotifications");

module.exports = { locals, cacheConfig, addReqUser, addReqNotifications };
