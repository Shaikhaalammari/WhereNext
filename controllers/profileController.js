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

/**
 * Why is there a profile list? No no no nonooo......
 * You don't need to view a list of all profiles
 * There's no feature for this in the trello board
 * so remove this profile list controller
 * and remove the route using it
 */
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

// why is there profile create?
// again, nono nonono ono nono...........
// theres no feature for this
// no one CREATES a profile
// they only edit their profile
// so delete this controller and the route using it
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

// why is there a profile delete? no one deletes their profile
// remove this
// no feature for this in trello
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

// this trip create should be in tripController
exports.tripCreate = async (req, res) => {
  try {
    req.body.profileId = req.profile.id;
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch {
    res.status(500).json({ message: error.message });
  }
};
