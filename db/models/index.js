const Profile = require("./Profile");
const Trip = require("./Trip");

Profile.hasMany(Trip, {
  as: "trips",
  foreignKey: "profileId",
  allowNull: false,
});
Trip.belongsTo(Profile, { as: "profile" });

module.exports = {
  Trip,
  Profile,
};
