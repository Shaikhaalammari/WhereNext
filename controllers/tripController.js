//DATA
const { Trip, Profile } = require("../db/models");

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findByPk(tripId);
    return trip;
  } catch (error) {
    next(error);
  }
};

exports.tripList = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      attributes: { exclude: ["profileId", "createdAt", "updatedAt"] },
      // don't include the profiles here
      // this is the trip list, you dont need every trip's profile
      inlcude: {
        model: Profile,
        as: "profile",
        attributes: ["name"],
      },
    });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.tripUpdate = async (req, res, next) => {
  try {
    if (req.trip) {
      await req.trip.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.tripDelete = async (req, res) => {
  const { tripId } = req.params;
  try {
    const foundTrip = await Trip.findByPk(tripId);
    if (foundTrip) {
      await foundTrip.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};
