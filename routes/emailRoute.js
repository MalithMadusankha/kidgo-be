const router = require("express").Router();
let EmailController = require("../controllers/emailController");
const Authenticate = require("../Authentication");

router.post("", Authenticate, EmailController.send);

module.exports = router;
