const express = require("express");
const router = express.Router();

//Controllers
const {
  tripUpdate,
  tripList,
  fetchTrip,
} = require("../controllers/tripController");

router.param("tripId", async (req, res, next, tripId) => {
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

//Trip List
router.get("/", tripList);

// Trip Update
router.put(
  "/:tripId",
  //   passport.authenticate("jwt", { session: false }),
  //   upload.single("image"),
  tripUpdate
);

module.exports = router;
