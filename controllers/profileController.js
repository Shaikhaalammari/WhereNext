//DATA
const { Profile, Trip } = require("../db/models");

exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findByPk(profileId);
    return profile;
  } catch (error) {
    next(error);
  }
};

// Profile List
exports.profileList = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Trip,
        as: "trips",
        attributes: ["id"],
      },
    });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.profileCreate = async (req, res) => {
  try {
    const newProfile = await Profile.create(req.body);
    res.status(201).json(newProfile);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

exports.profileUpdate = async (req, res, next) => {
  try {
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

exports.profileDelete = async (req, res) => {
  const { profileId } = req.params;
  try {
    const foundProfile = await Profile.findByPk(profileId);
    if (foundProfile) {
      await foundProfile.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

exports.tripCreate = async (req, res) => {
  try {
    req.body.profileId = req.profile.id;
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch {
    res.status(500).json({ message: error.message });
  }
};
