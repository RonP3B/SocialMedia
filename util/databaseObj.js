const Sequelize = require("sequelize");

const sequelizeObj = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: true,
    }
  }
);

module.exports = sequelizeObj;
