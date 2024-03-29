const router = require("express").Router();
let ClinicController = require("../controllers/clinicController");
const Authenticate = require("../Authentication");

router.post("", Authenticate, ClinicController.create);
router.get("", ClinicController.getAll);
router.put("/:id", Authenticate, ClinicController.update);
router.delete("/:id", Authenticate, ClinicController.delete);
router.get("/:id", ClinicController.getById);

module.exports = router;
