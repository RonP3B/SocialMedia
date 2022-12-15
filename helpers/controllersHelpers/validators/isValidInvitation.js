// --------------------------imports--------------------------
const {
  FriendRequest,
  User,
  EventRequest,
} = require("../../../exports/models");
const { Op } = require("sequelize");
const internalErrorRes = require("../internalErrorRes");

// --------------------------function--------------------------
const isValidInvitation = async (req, res) => {
  const { username, eventId } = req.body;

  let userRes = null;

  try {
    // If the user breaks the frontend validation
    if (!username || !eventId) {
      req.flash("errors", "Form data missing.");
      return;
    }

    if (username === req.user.username) {
      req.flash("errors", "You can't invite yourself.");
      return;
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      req.flash("errors", "The given user doesn't exist.");
      return;
    }

    const friend = await FriendRequest.findOne({
      where: {
        [Op.or]: [
          { toUserId: user.id, fromUserId: req.user.id },
          { toUserId: req.user.id, fromUserId: user.id },
        ],
        status: "accepted",
      },
    });

    if (!friend) {
      req.flash("errors", "The given user is not in your friends list.");
      return;
    }

    const isAlreadyInvited = await EventRequest.findOne({
      where: { eventId, toUserId: user.id, fromUserId: req.user.id },
    });

    if (isAlreadyInvited) {
      req.flash(
        "errors",
        `You've already invited ${user.username} to this event.`
      );
      return;
    }

    userRes = user;
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }

  return userRes;
};

module.exports = isValidInvitation;
