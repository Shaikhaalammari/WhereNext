const slugify = require("slugify");

//data
const { Trip } = require("../db/models");

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
  } catch (error) {
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
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};
