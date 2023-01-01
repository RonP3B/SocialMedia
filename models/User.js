const Sequelize = require("sequelize");
const { databaseObj } = require("../exports/util");

const User = databaseObj.define("user", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  profilePicture: {
    type: Sequelize.TEXT("long"),
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  username: {
    type: Sequelize.STRING,
    allowNull: false,
    indexes: [{ unique: true }],
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: "0",
  },
});

module.exports = User;
