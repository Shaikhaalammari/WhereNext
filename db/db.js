const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "my_db.db",
  // username: "postgres",
  // password: "shaikha19",
  // database: "wherenext",
  // dialect: "postgres",
  // host: "localhost",

  logging: false,
});

module.exports = db;
