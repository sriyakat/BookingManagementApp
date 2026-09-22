const express = require("express");
const customerController = require("./customers.controller");
const {customerValidation} = require("./customer.validation");
const authenticate = require("../../middlewares/auth.middleware");
const authorizeRoles = require("../../middlewares/role.middleware");
//Roles constants import kar rahe hain
const ROLES = require("../../constants/roles");

const router = express.Router();


// Pehle check hoga ki user logged in hai
 // Phir check hoga ki role 1 ya 2 hai
  // Request body validate hogi
  // Finally controller execute hoga

router.post("/", authenticate, authorizeRoles(ROLES.ADMIN, ROLES.MANAGER), customerValidation, customerController.createCustomer);
router.get("/", authenticate, authorizeRoles(ROLES.ADMIN, ROLES.MANAGER, ROLES.OPERATOR), customerController.getCustomer);
router.get("/:id", authenticate, authorizeRoles(ROLES.ADMIN, ROLES.MANAGER, ROLES.OPERATOR), customerController.getCustomerById);
router.put("/:id", authenticate, authorizeRoles(ROLES.ADMIN, ROLES.MANAGER), customerValidation, customerController.updateCustomer);
router.delete('/:id', authenticate, authorizeRoles(ROLES.ADMIN), customerController.deleteCustomer);



module.exports = router;