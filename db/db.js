const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "pinksummer",
  database: "wherenext",
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db;
