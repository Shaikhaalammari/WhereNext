const express = require("express");
const router = express.Router();

//Controllers
const {
  tripUpdate,
  tripCreate,
  fetchTrip,
  tripList,
  tripDelete,
} = require("../controllers/tripController");

// middleware
// const upload = require("../middleware/storage");

// Remove these two lines
// router.param("tripId", async (req, res, next, tripId) => {
//   const trip = await fetchTrip(tripId, next);

// move this route below router.param(...)
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

// Trip Update
// why are permissions and image middleware commented out?
router.put(
  "/:tripId",
  //   passport.authenticate("jwt", { session: false }),
  //   upload.single("image"),
  tripUpdate
);

// create trip
router.post("/", tripCreate);

// delete trip
router.delete("/:tripId", tripDelete);

module.exports = router;
