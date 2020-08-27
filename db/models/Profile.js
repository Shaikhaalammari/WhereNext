const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Profile extends Model {}

Profile.init(
  {
    title: {
      // title of what? this is a profile
      type: DataTypes.STRING,
    },
    detail: {
      // what details? maybe call this `bio`
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
