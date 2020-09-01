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
  if (req.user.id === req.profile.userId) {
    await req.profile.update(req.body);
    res.status(204).end();
  } else {
    next(error);
  }
};
