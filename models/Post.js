const Sequelize = require("sequelize");
const { databaseObj } = require("../exports/util");

const Post = databaseObj.define("post", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  postText: {
    type: Sequelize.TEXT,
    allowNull: true,
  },

  postImage: {
    type: Sequelize.TEXT("long"),
    allowNull: true,
  },

  dataTime: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Post;
