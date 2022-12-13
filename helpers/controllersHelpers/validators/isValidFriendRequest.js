// --------------------------imports--------------------------
const { FriendRequest } = require("../../../exports/models");
const { Op } = require("sequelize");
const internalErrorRes = require("../internalErrorRes");
const isValidUser = require("./isValidUser");

// --------------------------function--------------------------
const isValidFriendRequest = async (user, req, res) => {
  // If it's not a valid user the function ends
  if (!isValidUser(req, user)) return false;

  // If the user tries to send a friend request to himself
  if (req.user.username === user.username) {
    req.flash("errors", "You can't add yourself as friend, that's sad");
    return false;
  }

  let isValid = true;

  try {
    const friendRequest = await FriendRequest.findOne({
      where: {
        [Op.or]: [
          { toUserId: user.id, fromUserId: req.user.id },
          { toUserId: req.user.id, fromUserId: user.id },
        ],
      },
    });

    // The friend request already exists
    if (friendRequest) {
      const msg =
        friendRequest.status === "accepted"
          ? `You and '${user.username}' are already friends.`
          : `You and '${user.username}' already have a pending friendship request.`;

      req.flash("errors", msg);

      isValid = false;
    }
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }

  return isValid;
};

module.exports = isValidFriendRequest;
