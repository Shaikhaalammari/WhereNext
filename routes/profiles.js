const express = require("express");
const router = express.Router();
const passport = require("passport");

//Controllers
const {
  profileUpdate,
  profileList,
} = require("../controllers/profileController");

//profile list
router.get("/", profileList);

// Profile Update
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  //   upload.single("image"),
  profileUpdate
);

module.exports = router;
