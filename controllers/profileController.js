//DATA
const { Profile } = require("../db/models");

exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findByPk(profileId);
    return profile;
  } catch (error) {
    next(error);
  }
};

exports.profileUpdate = async (req, res, next) => {
  try {
    // REVIEW: You don't need to check if `req.profile` exists or not. If it doesn't exist router.param won't allow it to come to this controller. So you can remove the if condition and the else
    if (req.profile) {
      await req.profile.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    next(error);
  }
};
