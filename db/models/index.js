const Profile = require("./Profile");
const Trip = require("./Trip");
const User = require("./User");

User.hasMany(Trip, {
  as: "trips",
  foreignKey: "userId",
  allowNull: false,
});

Trip.belongsTo(User, { as: "user" });

User.hasOne(Profile, { as: "profile", foreignKey: "userId" }); // foreign key the column in DB

Profile.belongsTo(User, { as: "user" });


module.exports = {
  Trip,
  User,
  Profile,
};
