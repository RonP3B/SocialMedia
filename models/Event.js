const Sequelize = require("sequelize");
const { databaseObj } = require("../exports/util");

const Event = databaseObj.define("event", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  place: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Event;
