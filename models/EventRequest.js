const Sequelize = require("sequelize");
const { databaseObj } = require("../exports/util");

const EventRequest = databaseObj.define("event_request", {
  status: {
    type: Sequelize.STRING,
    defaultValue: "no response",
    allowNull: false,
  },

  eventId: {
    type: Sequelize.STRING,
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

module.exports = EventRequest;
