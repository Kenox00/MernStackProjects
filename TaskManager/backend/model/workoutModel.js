const mongoose = require("mongoose");
const userModel = require("./userModel");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
