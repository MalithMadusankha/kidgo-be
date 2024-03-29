const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  date: { type: String, required: [true, "Date is required field!"] },
  appoinmentID: {
    type: String,
    required: [true, "Appoinment ID is required field!"],
  },
  registerNo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  time: { type: String, required: [true, "Time is required field!"] },
  isSeen: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Clinic = mongoose.model("Clinic", clinicSchema);

module.exports = Clinic;
