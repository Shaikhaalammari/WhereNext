const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path"); // for media and middle ware
//DB
const db = require("./db");
//passport
const passport = require("passport");
// Passport Strategies
const { localStrategy, jwtStrategy } = require("./middleware/passport");
// Routes
const tripRoutes = require("./routes/trips");
const userRoutes = require("./routes/users");
// Create Express App instance
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log("I'm a middleware method");
  next();
});
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routers
app.use("/trips", tripRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(userRoutes);

//Not Found Paths
app.use((req, res, next) => {
  console.log(404);
  res.status(404).json("Path not found"); // when the path called is not exist
});

app.use((err, req, res, next) => {
  console.log(500);
  res.status(err.status || 500); // 500 y3ne backend error (notfound)
  res.json({
    message: err.message || "Internal Server Error",
  });
});

const run = async () => {
  try {
    await db.sync({ alter: true });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();

app.listen(8000, () => {
  console.log("This cool app is running on localhost:8000");
});
