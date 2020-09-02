const express = require("express");
const router = express.Router();
//middleware multer
const upload = require("../middleware/multer");

//Controllers
const {
  tripUpdate,
  tripCreate,
  fetchTrip,
  tripList,
  tripDelete,
} = require("../controllers/tripController");
const passport = require("passport");

// router.param("tripId", async (req, res, next, tripId) => {
//   const trip = await fetchTrip(tripId, next);

router.get("/", tripList);

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

// trip create
router.post("/", passport.authenticate("jwt", { session: false }), tripCreate);

// Trip Update
router.put("/:tripId", upload.single("image"), tripUpdate);

// create trip
router.post(
  "/",
  passport.authenticate("jwt", { seesion: false }),
  upload.single("image"),
  tripCreate
);

// delete trip
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  tripDelete
);

module.exports = router;
