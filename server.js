const express = require("express");
const admin = require("firebase-admin");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require("http");
const rateLimit = require("express-rate-limit");

const app = express();
require("dotenv").config();

const GlobalErrorHandler = require("./controllers/errorController");
const CustomError = require("./utils/CustomError");

const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());

// Initialize Firebase Admin SDK
const serviceAccount = require("./config/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//DB URL
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("        <=== Database connected ! ====>");
  console.log(`<=== Running on URL: http://localhost:${PORT} ====>`);
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`<=== Server is up and running on port ${PORT} ====>`);
});

// rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// User Routes
const UserRoute = require("./routes/userRoute");
app.use("/user", UserRoute);

// Clinic Routes
const ClinicRoute = require("./routes/clinicRoute");
app.use("/clinic", ClinicRoute);

// Vaccine Routes
const VaccineRoute = require("./routes/vaccineRoute");
app.use("/vaccine", VaccineRoute);

// Email Routes
const EmailRoute = require("./routes/emailRoute");
app.use("/email", EmailRoute);

// Medical Routes
const MedicalRoute = require("./routes/medicalRoute");
app.use("/medical", MedicalRoute);

// Growth Routes
const GrowthRoute = require("./routes/growthRoute");
app.use("/growth", GrowthRoute);

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the Server!`,
    404
  );
  next(err);
});

app.use(GlobalErrorHandler);
