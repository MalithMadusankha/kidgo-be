const mongoose = require("mongoose");

const vaccineSchema = new mongoose.Schema({
  registerNo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: String, required: [true, "Date is required field!"] },
  name: {
    type: String,
    required: [true, "Vaccine name is required field!"],
  },
  details: {
    type: String,
  },
  batchNo: {
    type: String,
    required: [true, "Batch No is required field!"],
  },
  age: { type: Number, required: [true, "Age is required field!"] },
});

const Vaccine = mongoose.model("Vaccine", vaccineSchema);

module.exports = Vaccine;
