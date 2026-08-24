const express = require("express");
const customerController = require("./customers.controller")

const router = express.Router();

router.post("/", customerController.createCustomer);
router.get("/", customerController.getCustomer);
router.get("/:id", customerController.getCustomerById);
router.put("/:id", customerController.updateCustomer);



module.exports = router;