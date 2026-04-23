const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/grievanceController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, ctrl.create);
router.get("/", auth, ctrl.getAll);
router.get("/search", auth, ctrl.search);
router.get("/:id", auth, ctrl.getOne);
router.put("/:id", auth, ctrl.update);
router.delete("/:id", auth, ctrl.delete);

module.exports = router;