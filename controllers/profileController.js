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

exports.profileList = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
