// ---------------------------------imports--------------------------------------
const User = require("../models/User");
const FriendRequest = require("../models/FriendRequest");
const internalErrorRes = require("../helpers/controllersHelpers/internalErrorRes");

// -----------------------------Middleware--------------------------------
const addReqNotifications = async (req, res, next) => {
  // If there is a logged-in user
  if (req.user) {
    try {
      // Gets all the currently logged-in user's pending friend requests
      const pendingFriendRequests = await FriendRequest.findAll({
        where: { toUserId: req.user.id, status: "pending" },
        include: { model: User, as: "fromUser" },
      });

      const userNotifications = pendingFriendRequests.map(
        (friendReq) => friendReq.dataValues.fromUser.dataValues
      );

      // Adds the notifications in the request
      req.notifications = userNotifications;
    } catch (error) {
      console.log(`\n*****Error*****\n${error}\n`);
      internalErrorRes(res);
    }
  }

  next();
};

module.exports = addReqNotifications;
