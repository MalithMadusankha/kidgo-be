const router = require("express").Router();
let MedicalController = require("../controllers/medicalController");
const Authenticate = require("../Authentication");

router.post("", Authenticate, MedicalController.create);
router.get("", MedicalController.getAll);
router.put("/:id", Authenticate, MedicalController.update);
router.delete("/:id", Authenticate, MedicalController.delete);
router.get("/:id", MedicalController.getById);

module.exports = router;
