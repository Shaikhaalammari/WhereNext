//DATA
const { Profile } = require("../db/models");

exports.profileUpdate = async (req, res, next) => {
  try {
    const profile = await Profile.findOne(req.user.profileId);
    await profile.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// i neeeeed a get
