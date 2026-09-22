const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware");
const hubController = require("./hub.controller");

// CREATE HUB ======================
router.post("/", authMiddleware, hubController.createHub);
router.get("/",  hubController.getAllHubs);
router.get("/:id",  hubController.getByHubId);
router.put("/:id", authMiddleware, hubController.updateHub);
router.delete("/:id", authMiddleware, hubController.deleteHub);

module.exports = router;