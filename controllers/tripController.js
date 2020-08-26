//DATA <-- ??
const { Trip } = require("../db/models");

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findByPk(tripId);
    return trip;
  } catch (error) {
    next(error);
  }
};

// Trip List
exports.tripList = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.tripCreate = async (req, res) => {
  try {
    // you have to assign the logged in user as the creator of this new trip
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

exports.tripUpdate = async (req, res, next) => {
  try {
    // you don't need this if-statement, it's already being handled by router.param(...) in the routes file
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
  // you dont need to find the the Trip object based on ID this way, the router.param(...) handles it for you.
  // the same way you access the trip object in the tripUpdate controller
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
