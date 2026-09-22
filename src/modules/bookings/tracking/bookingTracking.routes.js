const express = require("express");

const router = express.Router();

const trackingController = require("./bookingTracking.controller");
const validate = require("../../../middlewares/booking.middleware");
const { createTrackingValidation } = require("./bookingTracking.validation");
const authMiddleware = require("../../../middlewares/auth.middleware");


router.post("/:id/tracking", authMiddleware, validate(createTrackingValidation), trackingController.createTracking );
router.get("/tracking", authMiddleware, trackingController.getTracking );
router.get("/tracking/:id", authMiddleware, trackingController.getTrackingById );
router.delete("/tracking/:id", authMiddleware, trackingController.deleteTracking );
router.get("/:id/tracking", authMiddleware, trackingController.getTrackingByBookingId );
router.get("/:awbNo", trackingController.getTrackingByAWB);


module.exports = router;