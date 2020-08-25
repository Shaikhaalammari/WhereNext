const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;

//DB
const db = require("./db");
const { Trip } = require("./db/models");

//Routes
const tripRoutes = require("./routes/trips");

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Routers
app.use("/trips", tripRoutes);

//Not Found Paths
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

const run = async () => {
  try {
    await db.sync();
    console.log("Connection to the database successful!");
    // const newTrip = await Trip.create({ title: "trips here" });
    // console.log(newTrip.toJSON());
    const trips = await Trip.findAll();
    trips.forEach((trip) => console.log(trip.toJSON()));
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();

app.listen(8000, () => {
  console.log("This cool app is running on localhost:8000");
});
