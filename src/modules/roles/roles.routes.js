const express = require("express");
const rolesController = require("./roles.controller");

const router = express.Router();

//Role module Routes=======================================
router.get("/", rolesController.getRoles);
router.get("/:id", rolesController.getRolesById);
router.post("/", rolesController.createRoles);
router.put("/:id", rolesController.updateRoles);
router.delete("/:id", rolesController.deleteRoles);




module.exports = router