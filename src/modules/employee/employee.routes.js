const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth.middleware.js");
const authorizeRoles = require("../../middlewares/role.middleware.js");
const ROLES = require("../../constants/roles.js");
const employeeController = require("./employee.controller");
const validate = require("../../../src/middlewares/booking.middleware.js");

const {
    createEmployeeValidation,
    updateEmployeeValidation,
    employeeIdValidation
} = require("./employee.validation");


router.post(
    "/",
    authMiddleware,
    validate(createEmployeeValidation),
    employeeController.createEmployee
);


router.get(
    "/",
    authMiddleware,
    employeeController.getAllEmployees
);


router.get(
    "/:id",
    authMiddleware,
    validate(employeeIdValidation, "params"),
    employeeController.getEmployeeById
);
 

router.put(
    "/:id",
    authMiddleware,
    validate(employeeIdValidation, "params"),
    validate(updateEmployeeValidation, "body"),
    employeeController.updateEmployee
);


router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles(ROLES.ADMIN),
    validate(employeeIdValidation),
    employeeController.deleteEmployee
);


module.exports = router;