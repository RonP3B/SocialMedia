const Sequelize = require("sequelize");
const { databaseObj } = require("../exports/util");

const FriendRequest = databaseObj.define("friend_request", {
  status: {
    type: Sequelize.STRING,
    defaultValue: "pending",
    allowNull: false,
  },

  toUserId: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  fromUserId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = FriendRequest;
