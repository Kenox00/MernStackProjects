const express = require("express");
const router = express.Router();
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

router.get("/", getWorkouts);

router.get("/:id", getWorkout);

router.post("/", createWorkout);

router.patch("/:id", updateWorkout);

router.delete("/:id", deleteWorkout);

module.exports = router;
