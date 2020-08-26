const express = require("express");
const router = express.Router();

//Controllers
const {
  tripCreate,
  fetchTrip,
  tripList,
  tripDelete,
} = require("../controllers/tripController");

// middleware
// const upload = require("../middleware/storage");

router.get("/", tripList);

router.param("tripId", async (req, res, next, tripId) => {
  console.log(`The value of trip's ID is ${tripId}`);
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const err = new Error("Trip not found");
    err.status = 404;
    next(err);
  }
});

// create trip
router.post("/", tripCreate);

// delete trip
router.delete("/:tripId", tripDelete);

module.exports = router;
