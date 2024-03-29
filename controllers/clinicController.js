const ClinicModel = require("../models/clinicModel");
const UserModel = require("../models/userModel");
const AsyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");

// Firebase Admin SDK
const admin = require("firebase-admin");

// Insert Clinic
exports.create = AsyncErrorHandler(async (req, res, next) => {
  console.log("<=== Add New Clinic ====>");
  // Destructure req.body for cleaner code
  const { date, registerNo, time } = req.body;

  const child = await UserModel.findOne({ registerNo: registerNo });
  console.log(child);
  const childId = child._id;

  console.log(`<=== Generate Reg Numbre ====>`);
  const lastClinic = await ClinicModel.findOne(
    {},
    {},
    { sort: { appoinmentID: -1 } }
  );

  console.log("lastClinic", lastClinic);

  let newAppoinmentID = "CLK0001";

  if (lastClinic) {
    // Extract the numeric part of the last registration number and increment it
    const lastAppoinmentID = lastClinic.appoinmentID;
    console.log("lastAppoinmentID", lastAppoinmentID);
    const numericPart = parseInt(lastAppoinmentID.slice(3)); // Extract numeric part (0001)
    const incrementedNumericPart = numericPart + 1;
    newAppoinmentID = "CLK" + String(incrementedNumericPart).padStart(4, "0"); // Format new registration number
  }
  console.log("newAppoinmentID", newAppoinmentID);

  const newClinic = new ClinicModel({
    date,
    appoinmentID: newAppoinmentID,
    registerNo: childId,
    time,
  });

  const clinic = await newClinic.save();

  // sendPushNotification();

  res
    .status(201)
    .json({ status: "success", message: "Insert Clinic", result: clinic });
});

// Get All Clinics
exports.getAll = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Get All Clinics ====>`);
  const clinics = await ClinicModel.find().populate("registerNo").exec();

  if (clinics && clinics.length > 0) {
    res
      .status(200)
      .json({ status: "success", message: "Found Clinics", result: clinics });
  } else {
    res.status(200).json({
      status: "success",
      message: "Clinics are not available",
      result: clinics,
    });
  }
});

// Buy Clinic
exports.update = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Update Clinic ====>`);
  const id = req.params.id;
  const { date, appoinmentID, registerNo, time } = req.body;

  const child = await UserModel.findOne({ registerNo });
  const childId = child._id;

  const updateObj = {
    date,
    appoinmentID,
    registerNo: childId,
    time,
  };

  const clinic = await ClinicModel.findByIdAndUpdate(id, updateObj);

  if (!clinic) {
    const error = new CustomError("Clinic with that ID is not found!", 404);
    return next(error);
  }

  sendPushNotification();

  res
    .status(200)
    .json({ status: "success", message: "Update Clinic", result: clinic });
});

// Delete Clinic
exports.delete = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Delete Clinic ====>`);
  const id = req.params.id;

  const clinic = await ClinicModel.findByIdAndDelete(id);

  if (!clinic) {
    const error = new CustomError("Clinic with that ID is not found!", 404);
    return next(error);
  }

  res
    .status(200)
    .json({ status: "success", message: "Deleted Clinic", result: clinic });
});

// Get Clinic
exports.getById = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Get Clinic By Clinic ID ====>`);
  const clinicId = req.params.id;
  const clinic = await ClinicModel.findById(clinicId).populate("registerNo");

  if (!clinic) {
    const error = new CustomError("Clinic with that ID is not found!", 404);
    return next(error);
  }
  res
    .status(200)
    .json({ status: "success", message: "Found Clinic", result: clinic });
});

// Function to send push notification
function sendPushNotification() {
  const message = {
    notification: {
      title: "New Clinic Created",
      body: "A new clinic has been created.",
    },
    topic: "clinics", // Send to a topic if desired
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
// Generate ID Clinic
generateAppoinmentID = async () => {
  console.log(`<=== Generate Reg Numbre ====>`);
  const lastClinic = await ClinicModel.findOne(
    {},
    {},
    { sort: { appoinmentID: -1 } }
  );

  console.log("lastClinic", lastClinic);

  let newAppoinmentID = "CLK0001";

  if (lastClinic) {
    // Extract the numeric part of the last registration number and increment it
    const lastAppoinmentID = lastClinic.appoinmentID;
    console.log("lastAppoinmentID", lastAppoinmentID);
    const numericPart = parseInt(lastAppoinmentID.slice(3)); // Extract numeric part (0001)
    const incrementedNumericPart = numericPart + 1;
    newAppoinmentID = "CLK" + String(incrementedNumericPart).padStart(4, "0"); // Format new registration number
  }
  console.log("newAppoinmentID", newAppoinmentID);
  return newAppoinmentID;
};
