require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  // Add this line
const workoutRoutes = require("./Routes/workout");
const userRoutes = require("./Routes/user");

// express app
const app = express();

// middleware
app.use(cors());  // Enable CORS for all routes
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & server is listening on port 5000...");
    });
  })
  .catch((error) => {
    console.log(error);
  });
