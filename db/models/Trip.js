const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Trip extends Model {}

Trip.init(
  {
    title: {
      type: DataTypes.STRING,
    },
    // I think title and details are required.
    // The question I want you to ask yourselves is: Do you want to allow users to create a trip without a title/details?

    // should be `details`, not `detail`. It's not a single detail, it's many details of their trip and experience.
    detail: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    image: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Trip;
