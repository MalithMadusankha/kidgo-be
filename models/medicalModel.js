const mongoose = require("mongoose");

const medicalSchema = new mongoose.Schema({
  date: { type: String, required: [true, "Date is required field!"] },
  medicalOfficerID: {
    type: String,
    required: [true, "Medical Officer ID is required field!"],
  },
  medicalOfficerName: {
    type: String,
    required: [true, "Medical Officer Name is required field!"],
  },
  registerNo: {
    type: String,
    required: [true, "Register No is required field!"],
  },
  details: { type: String },
});

const Medical = mongoose.model("Medical", medicalSchema);

module.exports = Medical;
