const UserModel = require("../models/userModel");
const AsyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");

// Insert User
exports.create = AsyncErrorHandler(async (req, res, next) => {
  console.log("<=== Add New User ====>");
  // Destructure req.body for cleaner code
  const { name, birth, address, email, gender, mother, fHDOfficer } = req.body;

  const registerNo = await generateRegNumbre();
  const newUser = new UserModel({
    name,
    birth,
    address,
    email,
    gender,
    mother,
    fHDOfficer,
    registerNo,
  });

  const user = await newUser.save();
  res
    .status(201)
    .json({ status: "success", message: "Insert User", result: user });
});

// Get All Users
exports.getAll = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Get All Users ====>`);
  const users = await UserModel.find().exec();

  if (users && users.length > 0) {
    res
      .status(200)
      .json({ status: "success", message: "Found Users", result: users });
  } else {
    res.status(200).json({
      status: "success",
      message: "Users are not available",
      result: users,
    });
  }
});

// Buy User
exports.update = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Update User ====>`);
  const id = req.params.id;
  const { name, birth, address, email, gender, mother, fHDOfficer } = req.body;

  const updateObj = {
    name,
    birth,
    address,
    email,
    gender,
    mother,
    fHDOfficer,
  };

  const user = await UserModel.findByIdAndUpdate(id, updateObj);

  if (!user) {
    const error = new CustomError("User with that ID is not found!", 404);
    return next(error);
  }

  res
    .status(200)
    .json({ status: "success", message: "Update User", result: user });
});

// Delete User
exports.delete = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Delete User ====>`);
  const id = req.params.id;

  const user = await UserModel.findByIdAndDelete(id);

  if (!user) {
    const error = new CustomError("User with that ID is not found!", 404);
    return next(error);
  }

  res
    .status(200)
    .json({ status: "success", message: "Deleted User", result: user });
});

// Get User
exports.getById = AsyncErrorHandler(async (req, res, next) => {
  console.log(`<=== Get User By User ID ====>`);
  const userId = req.params.id;
  const user = await UserModel.findById(userId);

  if (!user) {
    const error = new CustomError("User with that ID is not found!", 404);
    return next(error);
  }
  res
    .status(200)
    .json({ status: "success", message: "Found User", result: user });
});

// Generate Reg No User
generateRegNumbre = async () => {
  console.log(`<=== Generate Reg Numbre ====>`);

  const lastUser = await UserModel.findOne(
    {},
    {},
    { sort: { registerNo: -1 } }
  );

  let newRegistrationNumber = "CH0001";

  if (lastUser) {
    // Extract the numeric part of the last registration number and increment it
    const lastRegistrationNumber = lastUser.registerNo;
    const numericPart = parseInt(lastRegistrationNumber.slice(2)); // Extract numeric part (0001)
    const incrementedNumericPart = numericPart + 1;
    newRegistrationNumber =
      "CH" + String(incrementedNumericPart).padStart(4, "0"); // Format new registration number
  }

  return newRegistrationNumber;
};
