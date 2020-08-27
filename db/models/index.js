const Profile = require("./Profile");
const Trip = require("./Trip");
const User = require("./User");

Profile.hasMany(Trip, {
  as: "trips",
  foreignKey: "profileId",
  allowNull: false,
});
Trip.belongsTo(Profile, { as: "profile" });

module.exports = {
  Trip,
  User,
=======
  Profile,
};
