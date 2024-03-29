const router = require("express").Router();
let growthController = require("../controllers/growthController");
const Authenticate = require("../Authentication");

router.post("", Authenticate, growthController.create);
router.get("", growthController.getAll);
router.put("/:id", Authenticate, growthController.update);
router.delete("/:id", Authenticate, growthController.delete);
router.get("/:id", growthController.getById);

module.exports = router;
