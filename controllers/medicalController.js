const MedicalModel = require("../models/medicalModel");
const AsyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");

// Insert Medical
exports.create = AsyncErrorHandler(async (req, res, next) => {
  console.log("<=== Add New Medical ====>");
  // Destructure req.body for cleaner code
  const { date, medicalOfficerID, medicalOfficerName, registerNo, details } =
    req.body;

  const newMedical = new MedicalModel({
    date,
    medicalOfficerID,
    medicalOfficerName,
    registerNo,
    details,
  });

  const medical = await newMedical.save();
  res
    .status(201)
    .json({ status: "success", message: "Insert Medical", result: medical });
});

// Get All Medicals
exports.getAll = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Get All Medicals ====>`);
  const medicals = await MedicalModel.find().exec();

  if (medicals && medicals.length > 0) {
    res
      .status(200)
      .json({ status: "success", message: "Found Medicals", result: medicals });
  } else {
    res.status(200).json({
      status: "success",
      message: "Medicals are not available",
      result: medicals,
    });
  }
});

// Buy Medical
exports.update = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Update Medical ====>`);
  const id = req.params.id;
  const { date, medicalOfficerID, medicalOfficerName, registerNo, details } =
    req.body;

  const updateObj = {
    date,
    medicalOfficerID,
    medicalOfficerName,
    registerNo,
    details,
  };

  const medical = await MedicalModel.findByIdAndUpdate(id, updateObj);

  if (!medical) {
    const error = new CustomError("Medical with that ID is not found!", 404);
    return next(error);
  }

  res
    .status(200)
    .json({ status: "success", message: "Update Medical", result: medical });
});

// Delete Medical
exports.delete = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Delete Medical ====>`);
  const id = req.params.id;

  const medical = await MedicalModel.findByIdAndDelete(id);

  if (!medical) {
    const error = new CustomError("Medical with that ID is not found!", 404);
    return next(error);
  }

  res
    .status(200)
    .json({ status: "success", message: "Deleted Medical", result: medical });
});

// Get Medical
exports.getById = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Get Medical By Medical ID ====>`);
  const medicalId = req.params.id;
  const medical = await MedicalModel.findById(medicalId);

  if (!medical) {
    const error = new CustomError("Medical with that ID is not found!", 404);
    return next(error);
  }
  res
    .status(200)
    .json({ status: "success", message: "Found Medical", result: medical });
});
