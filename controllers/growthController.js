const GrowthModel = require("../models/growthModel");
const UserModel = require("../models/userModel");
const AsyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");

// Insert Growth
exports.create = AsyncErrorHandler(async (req, res, next) => {
  console.log("<=== Add New Growth ====>");
  // Destructure req.body for cleaner code
  const { registerNo, gender, date, details, age, height, weight } = req.body;

  const child = await UserModel.findOne({ registerNo });
  const childId = child._id;

  const newGrowth = new GrowthModel({
    registerNo: childId,
    gender,
    date,
    details,
    age,
    height,
    weight,
  });

  const medical = await newGrowth.save();
  res
    .status(201)
    .json({ status: "success", message: "Insert Growth", result: medical });
});

// Get All Growths
exports.getAll = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Get All Growths ====>`);
  const growth = await GrowthModel.find().populate("registerNo").exec();

  if (growth && growth.length > 0) {
    res
      .status(200)
      .json({ status: "success", message: "Found Growths", result: growth });
  } else {
    res.status(200).json({
      status: "success",
      message: "Growths are not available",
      result: growth,
    });
  }
});

// Buy Growth
exports.update = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Update Growth ====>`);
  const id = req.params.id;
  const { registerNo, gender, date, details, age, height, weight } = req.body;

  const updateObj = {
    registerNo,
    gender,
    date,
    details,
    age,
    height,
    weight,
  };

  const medical = await GrowthModel.findByIdAndUpdate(id, updateObj);

  if (!medical) {
    const error = new CustomError("Growth with that ID is not found!", 404);
    return next(error);
  }

  res
    .status(200)
    .json({ status: "success", message: "Update Growth", result: medical });
});

// Delete Growth
exports.delete = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Delete Growth ====>`);
  const id = req.params.id;

  const medical = await GrowthModel.findByIdAndDelete(id);

  if (!medical) {
    const error = new CustomError("Growth with that ID is not found!", 404);
    return next(error);
  }

  res
    .status(200)
    .json({ status: "success", message: "Deleted Growth", result: medical });
});

// Get Growth
exports.getById = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Get Growth By Growth ID ====>`);
  const medicalId = req.params.id;
  const medical = await GrowthModel.findById(medicalId);

  if (!medical) {
    const error = new CustomError("Growth with that ID is not found!", 404);
    return next(error);
  }
  res
    .status(200)
    .json({ status: "success", message: "Found Growth", result: medical });
});
