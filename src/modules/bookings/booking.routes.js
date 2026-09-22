const express = require("express");

const router = express.Router();

const bookingController = require("./booking.controller");
const validate = require("../../middlewares/booking.middleware");


// Booking Validation Schemas
const {createBookingSchema, updateBookingBodySchema, bookingParamsSchema } = require("./booking.validation");

// Authentication Middleware
const authenticate = require("../../middlewares/auth.middleware");


// CREATE BOOKING,  POST /api/bookings
router.post("/", authenticate, validate(createBookingSchema , "body"), bookingController.createBooking);
router.get("/", authenticate, bookingController.getBookings);
router.get("/:id", authenticate, validate(bookingParamsSchema, "params"), bookingController.getBookingById);
router.put("/:id", authenticate, validate(updateBookingBodySchema, "body"), validate(bookingParamsSchema, "params"), bookingController.updateBooking);
router.delete("/:id", authenticate, validate(bookingParamsSchema, "params"), bookingController.deleteBooking);



module.exports = router;