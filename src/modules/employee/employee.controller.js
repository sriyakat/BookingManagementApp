const employeeService = require("./employee.service");


// CREATE EMPLOYEE ===================================================
const createEmployee = async (req, res, next) => {
    try {
        const data = req.body;
        const userId = req.user.UserId;

        const result = await employeeService.createEmployee(data,userId);
            
        return res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};


// GET ALL EMPLOYEES=============================================
const getAllEmployees = async (req, res, next) => {
    try {
        const result = await employeeService.getAllEmployees();
        return res.status(200).json({
            success: true,
            message: "Employees fetched successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};


// GET EMPLOYEE BY ID=============================================
const getEmployeeById = async (req, res, next) => {
    try {
        const employeeId = Number(req.params.id);
        const result = await employeeService.getEmployeeById(employeeId); 

        return res.status(200).json({
            success: true,
            message: "Employee fetched successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};


// UPDATE EMPLOYEE=================================================
const updateEmployee = async (req, res, next) => {
    try {
        const employeeId = Number(req.params.id);
        const data = req.body;
        const userId = req.user.UserId;

        const result = await employeeService.updateEmployee(employeeId,data, userId);
    
        return res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};


// DELETE EMPLOYEE ====================================
const deleteEmployee = async (req, res, next) => {
    try {
        const employeeId = Number(req.params.id);
        const userId = req.user.UserId;

        const result = await employeeService.deleteEmployee( employeeId, userId );
          
        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};



module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};

