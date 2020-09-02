//DATA
const { Trip } = require("../db/models");

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
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.tripCreate = async (req, res, next) => {
  if (req.file) {
    req.body.image = `${req.protocol}://${req.get("host")}/media/${
      req.file.filename
    }`;
  }
  req.body.userId = req.user.id;
  const newTrip = await Trip.create(req.body);
  res.status(201).json(newTrip);
};

exports.tripUpdate = async (req, res, next) => {
  if (req.user || req.user.id === req.trip.userId) {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.trip.update(req.body);
    res.status(204).end();
  } else {
    const err = new Error("Unauthorized");
    err.status = 401;
    next(err);
  }
};

exports.tripDelete = async (req, res, next) => {
  if (req.user || req.user.id === req.trip.userId) {
    await req.trip.destroy();
    res.status(204).end();
  } else {
    const err = new Error("unauthorized");
    err.status = 401;
    next(err);
  }
};
