
const assignmentRepository = require("./shipmentAssignment.repository");

// Common error helper
const createError = (message, statusCode = 400) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

// Positive integer ID validation
const validateId = (id, fieldName) => {
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
        throw createError(`${fieldName} must be a positive integer`);
    }

    return parsedId;
};

// 1. Create assignment
const createAssignment = async (data, userId) => {
    const bookingId = validateId(data.bookingId, "bookingId");
    const employeeId = validateId(data.employeeId, "employeeId");
    const hubId = validateId(data.hubId, "hubId");

    return assignmentRepository.createAssignment(
        { ...data, bookingId, employeeId, hubId },
        userId
    );
};

// 2. Get all assignments
const getAllAssignments = async () => {
    return assignmentRepository.getAllAssignments();
};

// 3. Get assignment by ID
const getAssignmentById = async (assignmentId) => {
    const id = validateId(assignmentId, "assignmentId");

    const assignment = await assignmentRepository.getAssignmentById(id);

    if (!assignment) {
        throw createError("Assignment not found", 404);
    }

    return assignment;
};

// 4. Get assignment history by booking
const getAssignmentsByBooking = async (bookingId) => {
    const id = validateId(bookingId, "bookingId");

    return assignmentRepository.getAssignmentsByBooking(id);
};

// 5. Get assignments by employee
const getAssignmentsByEmployee = async (employeeId) => {
    const id = validateId(employeeId, "employeeId");

    return assignmentRepository.getAssignmentsByEmployee(id);
};

// 6. Reassign shipment
const reassignShipment = async (assignmentId, data, userId) => {
    const id = validateId(assignmentId, "assignmentId");
    const employeeId = validateId(data.employeeId, "employeeId");
    const hubId = validateId(data.hubId, "hubId");

    // Confirm the existing assignment exists
    const existingAssignment =
        await assignmentRepository.getAssignmentById(id);

    if (!existingAssignment) {
        throw createError("Assignment not found", 404);
    }

    return assignmentRepository.reassignShipment(
        id,
        { ...data, employeeId, hubId },
        userId
    );
};

// 7. Cancel assignment
const cancelAssignment = async (assignmentId, userId, remarks) => {
    const id = validateId(assignmentId, "assignmentId");

    const existingAssignment =
        await assignmentRepository.getAssignmentById(id);

    if (!existingAssignment) {
        throw createError("Assignment not found", 404);
    }

    return assignmentRepository.cancelAssignment(id, userId, remarks);
};

// 8. Complete assignment
const completeAssignment = async (assignmentId, userId, remarks) => {
    const id = validateId(assignmentId, "assignmentId");

    const existingAssignment =
        await assignmentRepository.getAssignmentById(id);

    if (!existingAssignment) {
        throw createError("Assignment not found", 404);
    }

    return assignmentRepository.completeAssignment(id, userId, remarks);
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