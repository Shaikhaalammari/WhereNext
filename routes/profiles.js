const express = require("express");
const router = express.Router();

//Controllers
const {
  profileUpdate,
  profileCreate,
  fetchProfile,
  profileList,
  profileDelete,
  tripCreate,
} = require("../controllers/profileController");

// middleware
// const upload = require("../middleware/storage");

router.get("/", profileList);

router.param("profileId", async (req, res, next, profileId) => {
  const profile = await fetchProfile(profileId, next);

  if (profile) {
    req.profile = profile;
    next();
  } else {
    const err = new Error("Profile not found");
    err.status = 404;
    next(err);
  }
});

// Profile Update
router.put(
  "/:profileId",
  //   passport.authenticate("jwt", { session: false }),
  //   upload.single("image"),
  profileUpdate
);

// delete this
// create profile
router.post("/", profileCreate);

// delete this
// delete profile
router.delete("/:profileId", profileDelete);

// move this to trips.js
// also, no need to pass profile ID
// you get the profile ID by finding the profile object
// associated with the logged in user
// you can only do this if authentication is built
// create trip
router.post("/:profileId/trips", tripCreate);

module.exports = router;
