const employeeRepository = require("./employee.repository");
const AppError = require("../../utils/App.Error");

// CREATE EMPLOYEE
const createEmployee = async (data, userId) => {
    const result = await employeeRepository.createEmployee(data,userId);
    return result;
};


// GET ALL EMPLOYEES=============
const getAllEmployees = async () => {
    const result = await employeeRepository.getAllEmployees();
    return result;
};


// GET EMPLOYEE BY ID =====================
const getEmployeeById = async (employeeId) => {
    const result = await employeeRepository.getEmployeeById( employeeId );
    return result;
};



// UPDATE EMPLOYEE
const updateEmployee = async (employeeId, data, userId) => {
    const [currentEmployee] = await employeeRepository.getEmployeeById(employeeId);
    if (!currentEmployee) {
        throw new AppError("Employee not found", 404);
    }

    const updatedData = { ...currentEmployee, ...data };
    const result = await employeeRepository.updateEmployee(employeeId, updatedData, userId);
    return result;
};


// DELETE EMPLOYEE ==================================
const deleteEmployee = async (employeeId, userId) => {
    const result = await employeeRepository.deleteEmployee( employeeId, userId);
    return result;
};


module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};