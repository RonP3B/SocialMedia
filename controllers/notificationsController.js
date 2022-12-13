// ----------------------------Imports----------------------------
const { FriendRequest } = require("../exports/models");
const { Op } = require("sequelize");
const { internalErrorRes } = require("../exports/helpers");

// ----------------------------Controllers----------------------------
exports.getNotifications = (req, res, next) => {
  res.render("notifications/notifications", {
    header: true,
    modal: true,
    section: "Notifications",
    notifications: req.notifications,
  });
};

exports.acceptFriend = async (req, res, next) => {
  const id = req.params.id;

  try {
    await FriendRequest.update(
      { status: "accepted" },
      {
        where: {
          [Op.and]: [
            { toUserId: req.user.id },
            { fromUserId: id },
            { status: "pending" },
          ],
        },
      }
    );

    req.flash("success", "The friendship request has been accepted");
    res.redirect("/notifications");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};

exports.declineFriend = async (req, res, next) => {
  const id = req.params.id;

  try {
    await FriendRequest.destroy({
      where: {
        [Op.and]: [
          { toUserId: req.user.id },
          { fromUserId: id },
          { status: "pending" },
        ],
      },
    });

    req.flash("success", "The friendship request has been declined");
    res.redirect("/notifications");
  } catch (error) {
    console.log(`\n*****Error*****\n${error}\n`);
    internalErrorRes(res);
  }
};
