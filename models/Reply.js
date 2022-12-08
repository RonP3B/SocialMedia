const Sequelize = require("sequelize");
const { databaseObj } = require("../exports/util");

const Reply = databaseObj.define("reply", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  text: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

module.exports = Reply;
