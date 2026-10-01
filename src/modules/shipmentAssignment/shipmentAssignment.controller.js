
const assignmentService = require("./shipmentAssignment.service");

//Create assignment ======================================
const createAssignment = async (req, res, next) => {
    try {
        const userId = req.user.userId ?? req.user.UserId;
        const result = await assignmentService.createAssignment(
            req.body,
            userId
        );

        return res.status(201).json({
            success: true,
            message: "Shipment assigned successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

// 2. Get all assignments
const getAllAssignments = async (req, res, next) => {
    try {
        const assignments = await assignmentService.getAllAssignments();

        return res.status(200).json({
            success: true,
            message: "Assignments fetched successfully",
            data: assignments
        });
    } catch (error) {
        next(error);
    }
};

// 3. Get assignment by ID
const getAssignmentById = async (req, res, next) => {
    try {
        const assignment = await assignmentService.getAssignmentById(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Assignment fetched successfully",
            data: assignment
        });
    } catch (error) {
        next(error);
    }
};

// 4. Get assignment history by booking ID
const getAssignmentsByBooking = async (req, res, next) => {
    try {
        const assignments =
            await assignmentService.getAssignmentsByBooking(
                req.params.bookingId
            );

        return res.status(200).json({
            success: true,
            message: "Booking assignment history fetched successfully",
            data: assignments
        });
    } catch (error) {
        next(error);
    }
};

// 5. Get assignments by employee ID
const getAssignmentsByEmployee = async (req, res, next) => {
    try {
        const assignments =
            await assignmentService.getAssignmentsByEmployee(
                req.params.employeeId
            );

        return res.status(200).json({
            success: true,
            message: "Employee assignments fetched successfully",
            data: assignments
        });
    } catch (error) {
        next(error);
    }
};

// 6. Reassign shipment
const reassignShipment = async (req, res, next) => {
    try {
        const userId = req.user.userId ?? req.user.UserId;

        const result = await assignmentService.reassignShipment(
            req.params.id,
            req.body,
            userId
        );

        return res.status(200).json({
            success: true,
            message: "Shipment reassigned successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

// 7. Cancel assignment
const cancelAssignment = async (req, res, next) => {
    try {
        const userId = req.user.userId ?? req.user.UserId;

        const result = await assignmentService.cancelAssignment(
            req.params.id,
            userId,
            req.body.remarks
        );

        return res.status(200).json({
            success: true,
            message: "Assignment cancelled successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

// 8. Complete assignment
const completeAssignment = async (req, res, next) => {
    try {
        const userId = req.user.userId ?? req.user.UserId;

        const result = await assignmentService.completeAssignment(
            req.params.id,
            userId,
            req.body.remarks
        );

        return res.status(200).json({
            success: true,
            message: "Assignment completed successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createAssignment,
    getAllAssignments,
    getAssignmentById,
    getAssignmentsByBooking,
    getAssignmentsByEmployee,
    reassignShipment,
    cancelAssignment,
    completeAssignment
};