const Sequelize = require("sequelize");
const { databaseObj } = require("../exports/util");

const Comment = databaseObj.define("comment", {
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

module.exports = Comment;
