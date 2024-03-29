const mongoose = require("mongoose");

const growthSchema = new mongoose.Schema({
  registerNo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gender: {
    type: Number,
    required: [true, "Gender is a required field!"],
  },
  date: { type: String, required: [true, "Date is required field!"] },

  details: {
    type: String,
  },
  age: { type: Number, required: [true, "Age is required field!"] },
  height: { type: Number, required: [true, "Height is required field!"] },
  weight: { type: Number, required: [true, "Weight is required field!"] },
});

const Growth = mongoose.model("Growth", growthSchema);

module.exports = Growth;
