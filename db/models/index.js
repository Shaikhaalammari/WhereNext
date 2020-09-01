const Profile = require("./Profile");
const Trip = require("./Trip");
const User = require("./User");

User.hasMany(Trip, {
  as: "trips",
  foreignKey: "UserId",
  allowNull: false,
});

Trip.belongsTo(User, { as: "profile" });

User.hasOne(Profile, { as: "profile", foreignKey: "userId" });

module.exports = {
  Trip,
  User,
  Profile,
};
