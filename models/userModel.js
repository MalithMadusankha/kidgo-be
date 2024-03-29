const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required field!"],
    maxlength: [50, "Name must not have more than 50 characters"],
    trim: true,
  },
  registerNo: {
    type: String,
    required: [true, "Register No is required field!"],
  },

  birth: { type: String },
  address: { type: String, required: [true, "Address is required field!"] },

  email: {
    type: String,
    required: [true, "Email is a required field!"],
    maxlength: [255, "Email must not have more than 255 characters"],
    trim: true,
    unique: true,
    validate: {
      validator: function (value) {
        //  validating email
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: "Invalid email address!",
    },
  },
  gender: {
    type: Number,
    required: [true, "Gender is a required field!"],
  },
  mother: {
    name: {
      type: String,
      required: [true, "Mother name is required field!"],
      maxlength: [50, "Mother name must not have more than 50 characters"],
      trim: true,
    },
    birth: {
      type: String,
      required: [true, "Mother birth is required field!"],
      trim: true,
    },
    nic: {
      type: String,
      required: [true, "NIC name is required field!"],
      maxlength: [12, "NIC name must not have more than 12 characters"],
      trim: true,
    },
    contact: {
      type: String,
      required: [true, "Contact No name is required field!"],
      maxlength: [10, "Contact No name must not have more than 10 characters"],
      trim: true,
    },
  },
  fHDOfficer: {
    registerNo: {
      type: String,
      required: [true, "FHD Officer register no is required field!"],
      trim: true,
    },
    division: {
      type: String,
      required: [true, "FHD Officer Division is required field!"],
      trim: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
