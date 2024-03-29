const VaccineModel = require("../models/vaccineModel");
const UserModel = require("../models/userModel");
const AsyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");

// Insert Vaccine
exports.create = AsyncErrorHandler(async (req, res, next) => {
  console.log("<=== Add New Vaccine ====>");
  // Destructure req.body for cleaner code
  const { date, name, details, batchNo, age, registerNo } = req.body;

  const child = await UserModel.findOne({ registerNo });
  const childId = child._id;

  const newVaccine = new VaccineModel({
    date,
    name,
    details,
    batchNo,
    age,
    registerNo: childId,
  });

  const vaccine = await newVaccine.save();

  // sendPushNotification();

  res
    .status(201)
    .json({ status: "success", message: "Insert Vaccine", result: vaccine });
});

// Get All Vaccines
exports.getAll = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Get All Vaccines ====>`);
  const vaccines = await VaccineModel.find().populate("registerNo").exec();

  if (vaccines && vaccines.length > 0) {
    res
      .status(200)
      .json({ status: "success", message: "Found Vaccines", result: vaccines });
  } else {
    res.status(200).json({
      status: "success",
      message: "Vaccines are not available",
      result: vaccines,
    });
  }
});

// Buy Vaccine
exports.update = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Update Vaccine ====>`);
  const id = req.params.id;
  const { date, name, details, batchNo, age, registerNo } = req.body;

  const child = await UserModel.findOne({ registerNo });
  const childId = child._id;

  const updateObj = {
    date,
    name,
    details,
    batchNo,
    age,
    registerNo: childId,
  };

  const vaccine = await VaccineModel.findByIdAndUpdate(id, updateObj);

  if (!vaccine) {
    const error = new CustomError("Vaccine with that ID is not found!", 404);
    return next(error);
  }

  // sendPushNotification();

  res
    .status(200)
    .json({ status: "success", message: "Update Vaccine", result: vaccine });
});

// Delete Vaccine
exports.delete = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Delete Vaccine ====>`);
  const id = req.params.id;

  const vaccine = await VaccineModel.findByIdAndDelete(id);

  if (!vaccine) {
    const error = new CustomError("Vaccine with that ID is not found!", 404);
    return next(error);
  }

  res
    .status(200)
    .json({ status: "success", message: "Deleted Vaccine", result: vaccine });
});

// Get Vaccine
exports.getById = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Get Vaccine By Vaccine ID ====>`);
  const vaccineId = req.params.id;
  const vaccine = await VaccineModel.findById(vaccineId);

  if (!vaccine) {
    const error = new CustomError("Vaccine with that ID is not found!", 404);
    return next(error);
  }
  res
    .status(200)
    .json({ status: "success", message: "Found Vaccine", result: vaccine });
});

// Generate ID Vaccine
generateAppoinmentID = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Generate Reg Numbre ====>`);
  const lastVaccine = await Vaccine.findOne(
    {},
    {},
    { sort: { appoinmentID: -1 } }
  );

  let newRegistrationNumber = "CLK0001";

  if (lastVaccine) {
    // Extract the numeric part of the last registration number and increment it
    const lastRegistrationNumber = lastVaccine.registrationNumber;
    const numericPart = parseInt(lastRegistrationNumber.slice(2)); // Extract numeric part (0001)
    const incrementedNumericPart = numericPart + 1;
    newRegistrationNumber =
      "CLK" + String(incrementedNumericPart).padStart(4, "0"); // Format new registration number
  }

  return newRegistrationNumber;
});

// Function to send push notification
function sendPushNotification() {
  const message = {
    notification: {
      title: "New Vaccine Created",
      body: "A new vaccine has been created.",
    },
    topic: "vaccines", // Send to a topic if desired
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
}
