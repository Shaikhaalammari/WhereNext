const Profile = require("./Profile");
const Trip = require("./Trip");
const User = require("./User");

User.hasMany(Trip, {
  as: "trips",
  foreignKey: "userId",
  allowNull: false,
});

Trip.belongsTo(User, { as: "user" });

module.exports = {
  Trip,
  User,
  Profile,
};
