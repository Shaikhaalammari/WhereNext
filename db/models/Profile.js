const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Profile extends Model {}

Profile.init(
  {
    title: {
      type: DataTypes.STRING,
    },

    detail: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Profile;
