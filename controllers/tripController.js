//Data
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
exports.tripList = async (req, res, next) => {
  try {
    const trips = await Trip.findAll();
    res.json(trips);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

exports.tripUpdate = async (req, res, next) => {
  try {
    if (req.trip) {
      //i added id and still doesnt work and if req.trip it gives me 404 msg
      await req.trip.update(req.body);
      //   console.log(req.trip.update()); this gave me Promise { <pending> }
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    next(error);
  }
};
