
const express = require("express");
const router = express.Router();

const assignmentController = require("./shipmentAssignment.controller");

const authMiddleware = require("../../middlewares/auth.middleware");

// Common validation helpers
const isPositiveInteger = (value) => {
    return Number.isInteger(Number(value)) && Number(value) > 0;
};

const validateIdParam = (paramName) => {
    return (req, res, next) => {
        if (!isPositiveInteger(req.params[paramName])) {
            return res.status(400).json({
                success: false,
                message: `${paramName} must be a positive integer`
            });
        }

        next();
    };
};

const validateCreateBody = (req, res, next) => {
    const { bookingId, employeeId, hubId, remarks } = req.body;

    const errors = [];

    if (!isPositiveInteger(bookingId)) {
        errors.push("bookingId must be a positive integer");
    }

    if (!isPositiveInteger(employeeId)) {
        errors.push("employeeId must be a positive integer");
    }

    if (!isPositiveInteger(hubId)) {
        errors.push("hubId must be a positive integer");
    }

    if (
        remarks !== undefined &&
        remarks !== null &&
        (typeof remarks !== "string" || remarks.length > 500)
    ) {
        errors.push("remarks must be a string with maximum 500 characters");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        });
    }

    next();
};

const validateReassignBody = (req, res, next) => {
    const { employeeId, hubId, remarks } = req.body;

    const errors = [];

    if (!isPositiveInteger(employeeId)) {
        errors.push("employeeId must be a positive integer");
    }

    if (!isPositiveInteger(hubId)) {
        errors.push("hubId must be a positive integer");
    }

    if (
        remarks !== undefined &&
        remarks !== null &&
        (typeof remarks !== "string" || remarks.length > 500)
    ) {
        errors.push("remarks must be a string with maximum 500 characters");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        });
    }

    next();
};

const validateRemarksBody = (req, res, next) => {
    const { remarks } = req.body;

    if (
        remarks !== undefined &&
        remarks !== null &&
        (typeof remarks !== "string" || remarks.length > 500)
    ) {
        return res.status(400).json({
            success: false,
            message: "remarks must be a string with maximum 500 characters"
        });
    }

    next();
};


// CREATE: shipment assign karna
router.post(
    "/",
    authMiddleware,
    validateCreateBody,
    assignmentController.createAssignment
);

// GET: saari assignments
router.get(
    "/",
    authMiddleware,
    assignmentController.getAllAssignments
);

// GET: booking ki assignment history
router.get(
    "/booking/:bookingId",
    authMiddleware,
    validateIdParam("bookingId"),
    assignmentController.getAssignmentsByBooking
);


// GET: employee ki assignments
router.get(
    "/employee/:employeeId",
    authMiddleware,
    validateIdParam("employeeId"),
    assignmentController.getAssignmentsByEmployee
);

// GET: assignment by ID
router.get(
    "/:id",
    authMiddleware,
    validateIdParam("id"),
    assignmentController.getAssignmentById
);

// REASSIGN: doosre employee ko assign karna
router.patch(
    "/:id/reassign",
    authMiddleware,
    validateIdParam("id"),
    validateReassignBody,
    assignmentController.reassignShipment
);

// CANCEL: assignment cancel karna
router.patch(
    "/:id/cancel",
    authMiddleware,
    validateIdParam("id"),
    validateRemarksBody,
    assignmentController.cancelAssignment
);


// COMPLETE: assignment complete karna
router.patch(
    "/:id/complete",
    authMiddleware,
    validateIdParam("id"),
    validateRemarksBody,
    assignmentController.completeAssignment
);

module.exports = router;