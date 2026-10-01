
const { sql, poolPromish } = require("../../config/db");

// Common function: stored procedure execute karne ke liye
const executeAssignmentSP = async ({
    action,
    assignmentId = null,
    bookingId = null,
    employeeId = null,
    hubId = null,
    assignedBy = null,
    updatedBy = null,
    remarks = null
}) => {
    const pool = await poolPromish;

    const result = await pool.request()
        .input("Action", sql.VarChar(30), action)
        .input("AssignmentId", sql.Int, assignmentId)
        .input("BookingId", sql.Int, bookingId)
        .input("EmployeeId", sql.Int, employeeId)
        .input("HubId", sql.Int, hubId)
        .input("AssignedBy", sql.Int, assignedBy)
        .input("UpdatedBy", sql.Int, updatedBy)
        .input("Remarks", sql.VarChar(500), remarks)
        .execute("sp_ShipmentAssignment");

    return result;
};

// 1. Create assignment
const createAssignment = async (data, userId) => {
    const result = await executeAssignmentSP({
        action: "CREATE",
        bookingId: data.bookingId,
        employeeId: data.employeeId,
        hubId: data.hubId,
        assignedBy: userId,
        remarks: data.remarks || null
    });

    return result.recordset[0];
};

// 2. Get all assignments
const getAllAssignments = async () => {
    const result = await executeAssignmentSP({
        action: "GET"
    });

    return result.recordset;
};

// 3. Get assignment by ID
const getAssignmentById = async (assignmentId) => {
    const result = await executeAssignmentSP({
        action: "GETBYID",
        assignmentId
    });

    return result.recordset[0] || null;
};

// 4. Get assignment history by booking
const getAssignmentsByBooking = async (bookingId) => {
    const result = await executeAssignmentSP({
        action: "GETBYBOOKING",
        bookingId
    });

    return result.recordset;
};

// 5. Get assignments by employee
const getAssignmentsByEmployee = async (employeeId) => {
    const result = await executeAssignmentSP({
        action: "GETBYEMPLOYEE",
        employeeId
    });

    return result.recordset;
};

// 6. Reassign shipment
const reassignShipment = async (assignmentId, data, userId) => {
    const result = await executeAssignmentSP({
        action: "REASSIGN",
        assignmentId,
        employeeId: data.employeeId,
        hubId: data.hubId,
        updatedBy: userId,
        remarks: data.remarks || null
    });

    return result.recordset[0];
};

// 7. Cancel assignment
const cancelAssignment = async (assignmentId, userId, remarks) => {
    const result = await executeAssignmentSP({
        action: "CANCEL",
        assignmentId,
        updatedBy: userId,
        remarks: remarks || null
    });

    return result.recordset[0];
};

// 8. Complete assignment
const completeAssignment = async (assignmentId, userId, remarks) => {
    const result = await executeAssignmentSP({
        action: "COMPLETE",
        assignmentId,
        updatedBy: userId,
        remarks: remarks || null
    });

    return result.recordset[0];
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