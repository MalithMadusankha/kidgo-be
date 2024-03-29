const router = require("express").Router();
let UserController = require("../controllers/userController");
const Authenticate = require("../Authentication");

router.post("", Authenticate, UserController.create);
router.get("", Authenticate, UserController.getAll);
router.put("/:id", Authenticate, UserController.update);
router.delete("/:id", Authenticate, UserController.delete);
router.get("/:id", UserController.getById);

module.exports = router;
