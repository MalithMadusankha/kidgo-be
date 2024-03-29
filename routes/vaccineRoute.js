const router = require("express").Router();
let VaccineController = require("../controllers/vaccineController");
const Authenticate = require("../Authentication");

router.post("", Authenticate, VaccineController.create);
router.get("", VaccineController.getAll);
router.put("/:id", Authenticate, VaccineController.update);
router.delete("/:id", Authenticate, VaccineController.delete);
router.get("/:id", VaccineController.getById);

module.exports = router;
