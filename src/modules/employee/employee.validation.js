const Joi = require("joi");

// ======================================================
// CREATE EMPLOYEE VALIDATION
// ======================================================
const createEmployeeValidation = Joi.object({
    EmployeeCode: Joi.string()
        .trim()
        .min(2)
        .max(30)
        .required()
        .messages({
            "string.empty": "EmployeeCode is required",
            "string.min": "EmployeeCode must be at least 2 characters",
            "string.max": "EmployeeCode must not exceed 30 characters",
            "any.required": "EmployeeCode is required"
        }),

    EmployeeName: Joi.string()
        .trim()
        .min(2)
        .max(150)
        .required()
        .messages({
            "string.empty": "EmployeeName is required",
            "string.min": "EmployeeName must be at least 2 characters",
            "string.max": "EmployeeName must not exceed 150 characters",
            "any.required": "EmployeeName is required"
        }),

    MobileNo: Joi.string()
        .trim()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.empty": "MobileNo is required",
            "string.pattern.base": "MobileNo must be a valid 10 digit Indian mobile number",
            "any.required": "MobileNo is required"
        }),

    Email: Joi.string()
        .trim()
        .email()
        .max(150)
        .allow("", null)
        .messages({
            "string.email": "Email must be a valid email address",
            "string.max": "Email must not exceed 150 characters"
        }),

    Designation: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "Designation is required",
            "string.min": "Designation must be at least 2 characters",
            "string.max": "Designation must not exceed 100 characters",
            "any.required": "Designation is required"
        }),

    HubId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "HubId must be a number",
            "number.integer": "HubId must be an integer",
            "number.positive": "HubId must be greater than 0",
            "any.required": "HubId is required"
        })
}).options({
    abortEarly: false,
    allowUnknown: true // Unknown params allow kiye taaki token/user details reject na hon
});


// ======================================================
// UPDATE EMPLOYEE VALIDATION
// ======================================================
const updateEmployeeValidation = Joi.object({
    EmployeeId: Joi.number()
        .integer()
        .positive()
        .optional(),

    EmployeeCode: Joi.string()
        .trim()
        .min(2)
        .max(30)
        .optional(),

    EmployeeName: Joi.string()
        .trim()
        .min(2)
        .max(150)
        .optional(),

    MobileNo: Joi.string()
        .trim()
        .pattern(/^[6-9]\d{9}$/)
        .optional()
        .messages({
            "string.pattern.base": "MobileNo must be a valid 10 digit Indian mobile number"
        }),

    Email: Joi.string()
        .trim()
        .email()
        .max(150)
        .allow("", null)
        .optional(),

    Designation: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    HubId: Joi.number()
        .integer()
        .positive()
        .optional()
}).options({
    abortEarly: false,
    allowUnknown: true
});


// ======================================================
// PARAMETER VALIDATION
// ======================================================
const employeeIdValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "EmployeeId must be a number",
            "number.integer": "EmployeeId must be an integer",
            "number.positive": "EmployeeId must be greater than 0",
            "any.required": "EmployeeId is required"
        })
});

module.exports = {
    createEmployeeValidation,
    updateEmployeeValidation,
    employeeIdValidation
};
