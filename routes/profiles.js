const express = require("express");
const router = express.Router();
const passport = require("passport");

//Controllers
const {
  profileUpdate,
  fetchProfile,
} = require("../controllers/profileController");

// Profile Update
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  //   upload.single("image"),
  profileUpdate
);

module.exports = router;
