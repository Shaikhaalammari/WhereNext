
//Data

const slugify = require("slugify");

//data

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
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch {
    res.status(500).json({ message: error.message });
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

  } catch (error) {
    next(error);

  } catch (err) {
    res.status(500).json({ message: error.message });

  }
};
