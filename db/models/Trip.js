const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Trip extends Model {}

Trip.init(
  {
    title: {
      type: DataTypes.STRING,
    },

    detail: {
      type: DataTypes.STRING,
    },
    // date: {
    //   type: DataTypes.DATE,
    // },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Trip;
